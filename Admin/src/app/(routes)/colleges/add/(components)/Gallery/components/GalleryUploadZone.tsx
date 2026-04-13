import { Image as ImageIcon } from "lucide-react";

type GalleryUploadZoneProps = {
    id: string;
    title: string;
    description: string;
    onUpload: (files: FileList | null) => void;
    multiple?: boolean;
    variant?: "emerald" | "gray";
};

export default function GalleryUploadZone({
    id,
    title,
    description,
    onUpload,
    multiple = false,
    variant = "gray",
}: GalleryUploadZoneProps) {
    const isEmerald = variant === "emerald";

    return (
        <div
            onClick={() => document.getElementById(id)?.click()}
            className={`border border-dashed rounded-2xl p-12 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all group ${isEmerald
                ? "border-emerald-500/20 bg-emerald-50/10 hover:bg-emerald-50/30"
                : "border-black/10 bg-gray-50/30 hover:bg-gray-50/50"
                }`}
        >
            <input
                type="file"
                id={id}
                className="hidden"
                multiple={multiple}
                onChange={(e) => onUpload(e.target.files)}
            />
            <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform ${isEmerald ? "bg-emerald-100/50" : "bg-gray-100"
                    }`}
            >
                <ImageIcon
                    className={`w-7 h-7 transition-colors ${isEmerald ? "text-emerald-500" : "text-gray-400 group-hover:text-emerald-500"
                        }`}
                />
            </div>
            <div className="text-center">
                <p className="text-sm font-semibold text-gray-700">{title}</p>
                <p className="text-xs text-gray-400 mt-1">{description}</p>
            </div>
        </div>
    );
}
