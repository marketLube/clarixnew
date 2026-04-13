"use client"

import { useState, useEffect } from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from "@/src/components/ui/sheet";
import { Button } from "@/src/components/ui/button";
import { FormField } from "@/src/components/ui/FormField";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Switch } from "@/src/components/ui/switch";
import { X, Image as ImageIcon, Plus } from "lucide-react";

interface CampusLifeItem {
    id?: string;
    title: string;
    description: string;
    verified: boolean;
    tags: string[];
    image: string;
    imageFile?: File | null;
    source: string;
    isActive: boolean;
}

interface AddCampusLifeDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onAdd: (item: CampusLifeItem) => void;
    editItem: CampusLifeItem | null;
}

export function AddCampusLifeDrawer({ open, onOpenChange, onAdd, editItem }: AddCampusLifeDrawerProps) {
    const [formData, setFormData] = useState<CampusLifeItem>({
        title: "",
        description: "",
        verified: false,
        tags: [],
        image: "",
        source: "College Provided",
        isActive: true,
    });
    const [newTag, setNewTag] = useState("");

    useEffect(() => {
        if (editItem) {
            setFormData(editItem);
        } else {
            setFormData({
                title: "",
                description: "",
                verified: false,
                tags: [],
                image: "",
                imageFile: null,
                source: "College Provided",
                isActive: true,
            });
        }
    }, [editItem, open]);

    const handleAddTag = () => {
        if (newTag.trim() && !formData.tags.includes(newTag.trim()) && formData.tags.length < 6) {
            setFormData({
                ...formData,
                tags: [...formData.tags, newTag.trim()]
            });
            setNewTag("");
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter(tag => tag !== tagToRemove)
        });
    };

    const handleSave = () => {
        if (!formData.title || !formData.description) return;
        onAdd(formData);
    };

    const maxLength = 300;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-[650px] border-l-0 p-0 flex flex-col bg-white overflow-hidden rounded-l-[20px]" hideClose={true}>
                <SheetHeader className="px-6 py-4 bg-white border-b border-gray-100 flex flex-row items-center justify-between space-y-0 relative">
                    <div className="space-y-0.5">
                        <SheetTitle className="text-[20px] font-bold text-gray-900 tracking-tight">
                            {editItem ? "Edit Section" : "Create New Section"}
                        </SheetTitle>
                        <p className="text-[14px] text-gray-500 font-normal">
                            {editItem ? "Update section details for campus life" : "Add a new section to showcase campus life"}
                        </p>
                    </div>
                    <button
                        onClick={() => onOpenChange(false)}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 transition-all outline-none"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                    {/* Title Field */}
                    <div className="space-y-1.5">
                        <label className="text-[14px] font-semibold text-gray-700">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <Input
                            placeholder="e.g., Hostel Life, Sports & Recreation"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="h-[44px] rounded-lg border-gray-200 bg-white px-4 text-[14px] focus:ring-0 focus:border-emerald-500 shadow-sm"
                        />
                    </div>

                    {/* Description Field */}
                    <div className="space-y-1.5">
                        <label className="text-[14px] font-semibold text-gray-700">
                            Short Description <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Textarea
                                placeholder="Describe this aspect of campus life..."
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value.slice(0, maxLength) })}
                                className="min-h-[120px] rounded-lg border-gray-200 bg-white px-4 py-3 text-[14px] focus:ring-0 focus:border-emerald-500 resize-none shadow-sm"
                            />
                            <div className="absolute -bottom-5 right-0 text-[11px] text-gray-400">
                                {maxLength - formData.description.length} characters remaining
                            </div>
                        </div>
                    </div>

                    {/* Feature Tags Management */}
                    <div className="space-y-3 pt-1">
                        <div className="flex items-center justify-between">
                            <label className="text-[14px] font-semibold text-gray-700">
                                Feature Tags (Max 6)
                            </label>
                            <div className="flex items-center gap-2">
                                <span className="text-[12px] text-gray-400 font-medium">
                                    {formData.tags.length} / 6
                                </span>
                                <button
                                    onClick={handleAddTag}
                                    className="px-3 py-1 bg-gray-900 hover:bg-black text-[12px] font-bold text-white rounded-lg transition-all"
                                >
                                    Add Tag
                                </button>
                            </div>
                        </div>

                        <Input
                            placeholder="Add a tag..."
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                            className="h-[44px] rounded-lg border-gray-200 bg-white px-4 text-[14px] shadow-sm"
                        />

                        {formData.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {formData.tags.map((tag) => (
                                    <div key={tag} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm">
                                        <span className="text-[12px] font-semibold text-gray-700">{tag}</span>
                                        <button onClick={() => handleRemoveTag(tag)} className="text-gray-400 hover:text-red-500 transition-colors">
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Media Upload Area */}
                    <div className="space-y-1.5">
                        <label className="text-[14px] font-semibold text-gray-700">
                            Media Upload
                        </label>
                        <input
                            type="file"
                            id="campus-life-image"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setFormData({
                                        ...formData,
                                        image: URL.createObjectURL(file),
                                        imageFile: file
                                    });
                                }
                            }}
                        />
                        <div
                            onClick={() => document.getElementById("campus-life-image")?.click()}
                            className="relative group cursor-pointer border-2 border-dashed border-gray-200 rounded-xl bg-white transition-all hover:bg-gray-50 h-[120px] flex flex-col items-center justify-center p-4 overflow-hidden shadow-sm"
                        >
                            {formData.image ? (
                                <div className="absolute inset-0 group">
                                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setFormData({ ...formData, image: "", imageFile: null });
                                            }}
                                            className="p-2 bg-white text-red-500 rounded-full shadow-lg hover:scale-110 transition-all"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-2">
                                    <div className="text-emerald-500">
                                        <ImageIcon className="w-6 h-6" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[14px] font-bold text-gray-900">Click to upload</p>
                                        <p className="text-[11px] text-gray-400">PNG or JPG up to 5MB</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Active Status Toggle Card */}
                    <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between shadow-sm">
                        <div className="space-y-0.5">
                            <h4 className="text-[14px] font-bold text-gray-900">Active Status</h4>
                            <p className="text-[12px] text-gray-500">Visible on the frontend website</p>
                        </div>
                        <Switch
                            checked={formData.isActive}
                            onCheckedChange={(val) => setFormData({ ...formData, isActive: val })}
                        />
                    </div>
                </div>

                <div className="px-6 py-4 bg-white border-t border-gray-100 flex items-center justify-end gap-3">
                    <Button
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                        className="text-[14px] font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-50 px-6"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        className="h-[40px] px-8 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[14px] font-bold transition-all transform active:scale-[0.98] shadow-sm"
                    >
                        {editItem ? "Update Section" : "Save Section"}
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
