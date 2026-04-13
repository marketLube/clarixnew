import { X } from "lucide-react";
import { useState } from "react";
import GalleryUploadZone from "./components/GalleryUploadZone";

type GalleryCategory = "Campus" | "Hostel" | "Labs" | "Events";

const categories: GalleryCategory[] = ["Campus", "Hostel", "Labs", "Events"];

interface GalleryProps {
    formData: any;
    onUpdate: (field: string, value: any) => void;
}

export default function Gallery({ formData, onUpdate }: GalleryProps) {
    const [activeCategory, setActiveCategory] = useState<GalleryCategory>("Campus");

    const fieldMap: Record<GalleryCategory, string> = {
        Campus: "campusImages",
        Hostel: "hostelImages",
        Labs: "labsImages",
        Events: "eventsImages",
    };

    const activeField = fieldMap[activeCategory];
    const images = formData[activeField] || [];

    const handleUpload = (files: FileList | null) => {
        if (!files) return;
        onUpdate(activeField, [...images, ...Array.from(files)]);
    };

    const handleRemoveImage = (index: number) => {
        const newImages = images.filter((_: any, i: number) => i !== index);
        onUpdate(activeField, newImages);
    };

    return (
        <div className="space-y-8 w-full pb-6">
            {/* Category Tabs */}
            <div className="flex p-1 bg-white border border-black/5 rounded-xl w-fit">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeCategory === cat
                            ? "bg-emerald-500 text-white shadow-sm"
                            : "text-gray-400 hover:text-gray-600"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Category Images Section */}
            <div className="space-y-6">
                <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-gray-800">{activeCategory} Images</h3>
                    <p className="text-xs text-gray-400">Showcase the {activeCategory.toLowerCase()} facilities through high-quality photos.</p>
                </div>

                <GalleryUploadZone
                    id="gallery-upload"
                    title={`Upload multiple ${activeCategory.toLowerCase()} images`}
                    description="Up to 10 images • JPG, PNG up to 5MB each"
                    multiple={true}
                    variant="emerald"
                    onUpload={handleUpload}
                />

                {/* Inline Image Grid */}
                {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-4">
                        {images.map((image: any, index: number) => {
                            const imageUrl = typeof image === 'string' ? image : URL.createObjectURL(image);
                            return (
                                <div key={index} className="relative group aspect-square rounded-xl overflow-hidden border border-gray-100 bg-gray-50 shadow-sm">
                                    <img
                                        src={imageUrl}
                                        alt={`${activeCategory} ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="p-2 bg-white text-red-500 rounded-full shadow-lg hover:scale-110 transition-all hover:bg-red-50"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
