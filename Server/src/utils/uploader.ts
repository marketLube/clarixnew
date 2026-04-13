import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import { ApiError } from "./ApiError.js";

// Initialize S3 Client for Digital Ocean Spaces
export const s3Client = new S3Client({
    region: process.env.DO_SPACES_REGION || "sgp1",
    endpoint: process.env.DO_SPACES_ENDPOINT || "https://sgp1.digitaloceanspaces.com",
    credentials: {
        accessKeyId: process.env.DO_SPACES_ACCESS_KEY ?? "",
        secretAccessKey: process.env.DO_SPACES_SECRET_KEY ?? "",
    },
    forcePathStyle: false,
});


const sanitizeFilename = (filename: string): string => {
    return filename
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9.-]/g, "");
};


const createUploader = (
    module: string,
    allowedTypes: string[] = ["application/pdf", "image/jpeg", "image/jpg", "image/png", "image/webp"],
    maxSize: number = 10 * 1024 * 1024
) => {
    return multer({
        storage: multerS3({
            s3: s3Client,
            bucket: process.env.DO_SPACES_BUCKET ?? "",
            contentType: multerS3.AUTO_CONTENT_TYPE,
            acl: "public-read",

            key: function (req: any, file: any, cb: any) {
                const category = req.body.category || "documents";
                const entityId = req.body.entityId || "general";

                const timestamp = Date.now();
                const sanitizedName = sanitizeFilename(file.originalname);
                const filename = `${timestamp}-${sanitizedName}`;

                // Structure: {module}/{entityId}/{category}/{filename}
                const fullPath = `${module}/${entityId}/${category}/${filename}`;

                cb(null, fullPath);
            },

            metadata: function (req: any, file: any, cb: any) {
                cb(null, {
                    fieldName: file.fieldname,
                    originalName: file.originalname,
                    module: module,
                });
            },
        }),

        limits: { fileSize: maxSize },

        fileFilter: (req: any, file: any, cb: any) => {
            if (!file || !file.mimetype) {
                cb(new ApiError(400, "No file provided or invalid file"), false);
                return;
            }

            if (allowedTypes.includes(file.mimetype)) {
                cb(null, true);
            } else {
                const allowedExtensions = allowedTypes
                    .map(type => {
                        const parts = type.split('/');
                        return parts[1]?.toUpperCase() || '';
                    })
                    .filter(ext => ext)
                    .join(', ');
                cb(
                    new ApiError(
                        400,
                        `Invalid file type. Only ${allowedExtensions} files are allowed.`
                    ),
                    false
                );
            }
        },
    });
};

// ==================== COLLEGE UPLOADERS ====================

export const collegeLogoUploader = createUploader(
    "colleges",
    ["image/jpeg", "image/jpg", "image/png", "image/webp"],
    5 * 1024 * 1024 // 5MB
);


export const collegeBrochureUploader = createUploader(
    "colleges",
    ["application/pdf"],
    10 * 1024 * 1024 // 10MB
);


export const collegeImagesUploader = createUploader(
    "colleges",
    ["image/jpeg", "image/jpg", "image/png", "image/webp"],
    5 * 1024 * 1024 // 5MB per image
);


export const collegeDocumentsUploader = createUploader(
    "colleges",
    ["application/pdf"],
    10 * 1024 * 1024 // 10MB
);


export const collegeFilesUploader = createUploader(
    "colleges",
    ["image/jpeg", "image/jpg", "image/png", "image/webp", "application/pdf"],
    10 * 1024 * 1024 // 10MB max
);


export const courseDocumentsUploader = createUploader(
    "courses",
    ["application/pdf"],
    10 * 1024 * 1024
);


export const courseImagesUploader = createUploader(
    "courses",
    ["image/jpeg", "image/jpg", "image/png", "image/webp"],
    5 * 1024 * 1024
);


export const examDocumentsUploader = createUploader(
    "exams",
    ["application/pdf"],
    10 * 1024 * 1024
);


export const examLogoUploader = createUploader(
    "exams",
    ["image/jpeg", "image/jpg", "image/png", "image/webp"],
    5 * 1024 * 1024 // 5MB
);


export const examFilesUploader = createUploader(
    "exams",
    ["image/jpeg", "image/jpg", "image/png", "image/webp", "application/pdf"],
    10 * 1024 * 1024 // 10MB max
);


export const scholarshipDocumentsUploader = createUploader(
    "scholarships",
    ["application/pdf"],
    10 * 1024 * 1024
);


export const galleryImagesUploader = createUploader(
    "gallery",
    ["image/jpeg", "image/jpg", "image/png", "image/webp"],
    5 * 1024 * 1024
);


export const generalUploader = createUploader(
    "general",
    ["application/pdf", "image/jpeg", "image/jpg", "image/png", "image/webp"],
    10 * 1024 * 1024
);

export const reviewUploader = createUploader(
    "reviews",
    ["image/jpeg", "image/jpg", "image/png", "image/webp"],
    5 * 1024 * 1024
);


// ==================== CMS UPLOADERS ====================

export const cmsHomePageUploader = createUploader(
    "cms/homepage",
    ["image/jpeg", "image/jpg", "image/png", "image/webp", "video/mp4", "video/webm"],
    10 * 1024 * 1024 // 10MB max
);

export const cmsBlogPageUploader = createUploader(
    "cms/blogpage",
    ["image/jpeg", "image/jpg", "image/png", "image/webp"],
    5 * 1024 * 1024 // 5MB max
);

export const cmsCareerPageUploader = createUploader(
    "cms/careerpage",
    ["image/jpeg", "image/jpg", "image/png", "image/webp"],
    5 * 1024 * 1024 // 5MB max
);


export const getFileUrl = (key: string): string => {
    const bucket = process.env.DO_SPACES_BUCKET ?? "";
    const endpoint = process.env.DO_SPACES_ENDPOINT || "https://sgp1.digitaloceanspaces.com";
    const cleanEndpoint = endpoint.replace("https://", "");
    return `https://${bucket}.${cleanEndpoint}/${key}`;
};


export const extractS3KeyFromUrl = (url: string): string | null => {
    if (!url || typeof url !== 'string') return null;

    try {
        const urlObj = new URL(url);
        const key = urlObj.pathname.substring(1);
        return key || null;
    } catch (error) {
        console.error('Error extracting S3 key from URL:', error);
        return null;
    }
};


export const deleteFileFromS3 = async (fileUrl: string): Promise<boolean> => {
    if (!fileUrl || typeof fileUrl !== 'string') {
        console.warn('Invalid file URL provided for deletion');
        return false;
    }

    try {
        let key = fileUrl;
        if (fileUrl.startsWith('http://') || fileUrl.startsWith('https://')) {
            const extractedKey = extractS3KeyFromUrl(fileUrl);
            if (!extractedKey) {
                console.error('Could not extract S3 key from URL:', fileUrl);
                return false;
            }
            key = extractedKey;
        }

        const bucket = process.env.DO_SPACES_BUCKET ?? "";

        const deleteCommand = new DeleteObjectCommand({
            Bucket: bucket,
            Key: key,
        });

        await s3Client.send(deleteCommand);
        console.log(`Successfully deleted file from S3: ${key}`);
        return true;
    } catch (error) {
        console.error('Error deleting file from S3:', error);
        return false;
    }
};


export const deleteMultipleFilesFromS3 = async (
    fileUrls: string[]
): Promise<{ success: number; failed: number; results: boolean[] }> => {
    if (!Array.isArray(fileUrls) || fileUrls.length === 0) {
        return { success: 0, failed: 0, results: [] };
    }

    const results = await Promise.all(
        fileUrls.map(url => deleteFileFromS3(url))
    );

    const success = results.filter(result => result === true).length;
    const failed = results.filter(result => result === false).length;

    return { success, failed, results };
};
