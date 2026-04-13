import type { Request, Response } from 'express';
import { asyncHandler, ApiResponse, ApiError } from '../../../../utils/index.js';
import { HomePage } from '../model/homePageCmsModel.js';
import { deleteMultipleFilesFromS3 } from '../../../../utils/uploader.js';

// Helper function to parse flat FormData fields with bracket notation into nested objects
const parseNestedFormData = (flatData: any): any => {
    // Handle null, undefined, or non-object inputs
    if (!flatData || typeof flatData !== 'object') {
        return flatData || {};
    }

    const result: Record<string, any> = {};
    const keys = Object.keys(flatData);

    for (const key of keys) {

        const value = flatData[key];
        // Match bracket notation like "hero[enabled]" or "streams[items][0][name]"
        const match = key.match(/^([^\[]+)(.*)$/);

        if (!match || !match[1]) {
            result[key] = value;
            continue;
        }

        const rootKey = match[1];
        const bracketPart = match[2] || '';

        if (!bracketPart) {
            // Simple key without brackets
            result[rootKey] = value;
            continue;
        }

        // Parse bracket notation
        const bracketMatches = bracketPart.match(/\[([^\]]+)\]/g);
        if (!bracketMatches || bracketMatches.length === 0) {
            result[rootKey] = value;
            continue;
        }

        const path = bracketMatches.map((b: string) => b.slice(1, -1)).filter((s): s is string => s !== undefined);

        // Initialize root key if needed
        if (!result[rootKey]) {
            result[rootKey] = {};
        }

        let current: any = result[rootKey];

        // Navigate through the path
        for (let i = 0; i < path.length - 1; i++) {
            const segment = path[i];
            if (segment === undefined || segment === '') continue;

            const isArrayIndex = /^\d+$/.test(segment);

            if (isArrayIndex) {
                const index = parseInt(segment, 10);
                if (!Array.isArray(current)) {
                    current = [];
                }
                while (current.length <= index) {
                    current.push({});
                }
                if (current[index] === undefined || current[index] === null) {
                    current[index] = {};
                }
                current = current[index];
            } else {
                if (current[segment] === undefined || current[segment] === null) {
                    current[segment] = {};
                }
                current = current[segment];
            }
        }

        // Set the final value
        const lastSegment = path[path.length - 1];
        if (lastSegment === undefined || lastSegment === '') {
            // Empty bracket means array append
            if (!Array.isArray(current)) {
                const temp = typeof current === 'object' && current !== null ? { ...current } : {};
                current = [];
                if (typeof temp === 'object' && temp !== null) {
                    Object.keys(temp).forEach((k) => {
                        const idx = parseInt(k, 10);
                        if (!isNaN(idx)) {
                            current[idx] = temp[k as keyof typeof temp];
                        }
                    });
                }
            }
            current.push(value);
        } else {
            const isArrayIndex = /^\d+$/.test(lastSegment);
            if (isArrayIndex) {
                const index = parseInt(lastSegment, 10);
                if (!Array.isArray(current)) {
                    const temp = typeof current === 'object' && current !== null ? { ...current } : {};
                    current = [];
                    if (typeof temp === 'object' && temp !== null) {
                        Object.keys(temp).forEach((k) => {
                            const idx = parseInt(k, 10);
                            if (!isNaN(idx)) {
                                current[idx] = temp[k as keyof typeof temp];
                            }
                        });
                    }
                }
                while (current.length <= index) {
                    current.push('');
                }
                current[index] = value;
            } else {
                current[lastSegment] = value;
            }
        }
    }

    return result;
};

const getHomePage = asyncHandler(async (req: Request, res: Response) => {
    let homePage = await HomePage.findOne().lean();

    const defaultPopularSearches = [
       "Computer Science Engineering",
       "MBA in Marketing",
       "Medical Colleges in Delhi",
       "B.Tech in Artificial Intelligence",
    ];

    if (!homePage) {
        // Create with defaults if not exists
        homePage = await HomePage.create({
            hero: { 
                enabled: true, 
                headline: 'Default Headline',
                popularSearches: defaultPopularSearches 
            },
            streams: { enabled: true, items: [] },
            contentBlocks: { enabled: true, blocks: [] },
            careerHub: { enabled: true, images: [], logo: [] },
            faq: { enabled: true, items: [] },
            location: { enabled: true, title: '', items: [] }
        });
        // Convert to plain object to match type if we were using lean() above, 
        // but create returns a document.
        // To be consistent with the logic below, we might want to cast or just use it.
        // However, since we are doing logic below, let's keep it simple.
    }

    // Ensure popularSearches is populated in the response headers/data if empty
    // We use 'lean()' above (added in this edit) so we can modify the object easily, 
    // or we convert to object if we didn't use lean. 
    // Wait, the original code didn't use lean().
    // I will use toObject() or just modify it if I didn't use lean();
    // But modifying a Mongoose document directly without save() only affects the in-memory instance which is fine for response.
    
    // Effectively, we want to return defaults if empty.
    if (homePage && homePage.hero) {
        if (!homePage.hero.popularSearches || homePage.hero.popularSearches.length === 0) {
            homePage.hero.popularSearches = defaultPopularSearches;
        }
    }

    return ApiResponse.success(
        res,
        200,
        homePage,
        'Homepage content fetched successfully'
    );
});


const updateHomePage = asyncHandler(async (req: Request, res: Response) => {
    // Parse flat FormData structure into nested object
    // Ensure req.body exists and is an object
    const bodyData = req.body && typeof req.body === 'object' ? req.body : {};
    const updateData = parseNestedFormData(bodyData);
    const files = req.files as { [fieldname: string]: Express.MulterS3.File[] };

    // Extract uploaded background media file URLs (multiple supported)
    const backgroundFiles = (files?.['hero[backgroundMedia][backgroundFile]'] ?? [])
        .map((f) => f?.location)
        .filter(Boolean) as string[];

    // Extract uploaded location image URLs (multiple supported)
    const locationFiles = (files?.['location[images][]'] ?? [])
        .map((f) => f?.location)
        .filter(Boolean) as string[];

    // Extract uploaded career hub images & logos (multiple supported)
    const careerHubImageFiles = (files?.['careerHub[images][]'] ?? [])
        .map((f) => f?.location)
        .filter(Boolean) as string[];

    const careerHubLogoFiles = (files?.['careerHub[logo][]'] ?? [])
        .map((f) => f?.location)
        .filter(Boolean) as string[];

    // If new files were uploaded, add them to hero.images array
    if (backgroundFiles.length) {
        if (!updateData.hero) {
            updateData.hero = {};
        }
        if (!updateData.hero.images) {
            updateData.hero.images = [];
        }
        const current = Array.isArray(updateData.hero.images) ? updateData.hero.images : [updateData.hero.images];
        updateData.hero.images = [...current, ...backgroundFiles];
    }

    // If new location images were uploaded, map them onto location.items,
    // replacing any temporary blob URLs or empty image fields.
    if (locationFiles.length && updateData.location?.items && Array.isArray(updateData.location.items)) {
        let fileIndex = 0;
        updateData.location.items = updateData.location.items.map((item: any) => {
            if (fileIndex >= locationFiles.length) return item;

            const img: string | undefined = item?.image;
            const needsReplace = !img || (typeof img === 'string' && img.startsWith('blob:'));

            if (needsReplace) {
                const url = locationFiles[fileIndex++];
                return { ...item, image: url };
            }

            return item;
        });
    }

    // If new career hub images/logos were uploaded, append them to the arrays
    if (careerHubImageFiles.length || careerHubLogoFiles.length) {
        if (!updateData.careerHub) {
            updateData.careerHub = {};
        }

        if (careerHubImageFiles.length) {
            const currentImages = updateData.careerHub.images
                ? (Array.isArray(updateData.careerHub.images)
                    ? updateData.careerHub.images
                    : [updateData.careerHub.images])
                : [];
            updateData.careerHub.images = [...currentImages, ...careerHubImageFiles];
        }

        if (careerHubLogoFiles.length) {
            const currentLogos = updateData.careerHub.logo
                ? (Array.isArray(updateData.careerHub.logo)
                    ? updateData.careerHub.logo
                    : [updateData.careerHub.logo])
                : [];
            updateData.careerHub.logo = [...currentLogos, ...careerHubLogoFiles];
        }
    }

    console.log(updateData, "update Data");

    // Load current homepage to detect which location images should be deleted
    let homePage = await HomePage.findOne();
    const imagesToDelete: string[] = [];

    if (homePage && updateData.location?.items && Array.isArray(updateData.location.items)) {
        const existingItems = (homePage.location?.items ?? []) as any[];
        const existingById = new Map<string, any>();

        existingItems.forEach((loc: any) => {
            const key = String(loc?._id ?? '');
            if (key) existingById.set(key, loc);
        });

        updateData.location.items.forEach((item: any) => {
            const id = item?.id;
            if (!id) return;
            const existing = existingById.get(String(id));
            if (!existing) return;

            const oldImage: string | undefined = existing.image;
            const newImage: string | undefined = item.image;

            // If image URL changed, schedule old one for deletion
            if (oldImage && newImage && oldImage !== newImage) {
                imagesToDelete.push(oldImage);
            }
        });
    }

    if (!homePage) {
        homePage = await HomePage.create(updateData);
    } else {
        homePage = await HomePage.findOneAndUpdate(
            {},
            { $set: updateData },
            { new: true, runValidators: true }
        );
    }

    // Best-effort delete of replaced location images from S3
    if (imagesToDelete.length) {
        deleteMultipleFilesFromS3(imagesToDelete).catch((err) => {
            console.error('Failed to delete old location images from S3:', err);
        });
    }

    return ApiResponse.success(
        res,
        200,
        homePage,
        'Homepage content updated successfully'
    );
});

const createHomePage = asyncHandler(async (req: Request, res: Response) => {
    // Parse flat FormData structure into nested object
    // Ensure req.body exists and is an object
    const bodyData = req.body && typeof req.body === 'object' ? req.body : {};
    const data = parseNestedFormData(bodyData);
    const files = req.files as { [fieldname: string]: Express.MulterS3.File[] };

    // Extract uploaded background media file URLs (multiple supported)
    const backgroundFiles = (files?.['hero[backgroundMedia][backgroundFile]'] ?? [])
        .map((f) => f?.location)
        .filter(Boolean) as string[];

    // Extract uploaded location image URLs (multiple supported)
    const locationFiles = (files?.['location[images][]'] ?? [])
        .map((f) => f?.location)
        .filter(Boolean) as string[];

    // Extract uploaded career hub images & logos (multiple supported)
    const careerHubImageFiles = (files?.['careerHub[images][]'] ?? [])
        .map((f) => f?.location)
        .filter(Boolean) as string[];

    const careerHubLogoFiles = (files?.['careerHub[logo][]'] ?? [])
        .map((f) => f?.location)
        .filter(Boolean) as string[];

    // If new files were uploaded, add them to hero.images array
    if (backgroundFiles.length) {
        if (!data.hero) {
            data.hero = {};
        }
        if (!data.hero.images) {
            data.hero.images = [];
        }
        const current = Array.isArray(data.hero.images) ? data.hero.images : [data.hero.images];
        data.hero.images = [...current, ...backgroundFiles];
    }

    // If new location images were uploaded, map them onto location.items,
    // replacing any temporary blob URLs or empty image fields.
    if (locationFiles.length && data.location?.items && Array.isArray(data.location.items)) {
        let fileIndex = 0;
        data.location.items = data.location.items.map((item: any) => {
            if (fileIndex >= locationFiles.length) return item;

            const img: string | undefined = item?.image;
            const needsReplace = !img || (typeof img === 'string' && img.startsWith('blob:'));

            if (needsReplace) {
                const url = locationFiles[fileIndex++];
                return { ...item, image: url };
            }

            return item;
        });
    }

    // If new career hub images/logos were uploaded, initialize arrays with those URLs
    if (careerHubImageFiles.length || careerHubLogoFiles.length) {
        if (!data.careerHub) {
            data.careerHub = {} as any;
        }

        if (careerHubImageFiles.length) {
            const currentImages = data.careerHub.images
                ? (Array.isArray(data.careerHub.images)
                    ? data.careerHub.images
                    : [data.careerHub.images])
                : [];
            data.careerHub.images = [...currentImages, ...careerHubImageFiles];
        }

        if (careerHubLogoFiles.length) {
            const currentLogos = data.careerHub.logo
                ? (Array.isArray(data.careerHub.logo)
                    ? data.careerHub.logo
                    : [data.careerHub.logo])
                : [];
            data.careerHub.logo = [...currentLogos, ...careerHubLogoFiles];
        }
    }

    let homePage = await HomePage.findOne();

    if (homePage) {
        throw new ApiError(400, 'Homepage content already exists. Use PUT/PATCH to update.');
    }

    homePage = await HomePage.create(data);

    return ApiResponse.created(
        res,
        homePage,
        'Homepage content created successfully'
    );
});

export const homePageCMSController = {
    getHomePage,
    updateHomePage,
    createHomePage
};
