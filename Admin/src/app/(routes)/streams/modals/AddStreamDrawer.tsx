"use client"

import {
    Sheet,
    SheetContent,
    SheetClose,
} from "@/src/components/ui/sheet";
import { Button } from "@/src/components/ui/button";
import { FormField } from "@/src/components/ui/FormField";
import { Input } from "@/src/components/ui/input";
import { X, Image as ImageIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Switch } from "@/src/components/ui/switch";
import { useAddStream } from "@/src/servicesHooks/streamHooks/useAddStream";

interface AddStreamDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

interface StreamFormData {
    name: string;
    collegesCount: string;
    enabled: boolean;
    image: File | null;
}

const INITIAL_FORM_STATE: StreamFormData = {
    name: '',
    collegesCount: '',
    enabled: true,
    image: null,
};

export default function AddStreamDrawer({ isOpen, onClose }: AddStreamDrawerProps) {
    const { addStream, isPending, isError, error } = useAddStream();
    const [formData, setFormData] = useState<StreamFormData>(INITIAL_FORM_STATE);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const updateField = (field: keyof StreamFormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const resetForm = () => {
        setFormData(INITIAL_FORM_STATE);
        setImagePreview(null);
    };

    useEffect(() => {
        if (!isOpen) {
            resetForm();
        }
    }, [isOpen]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            updateField('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        const data = new FormData();

        // Basic fields
        data.append('name', formData.name);
        data.append('collegesCount', formData.collegesCount);
        data.append('enabled', String(formData.enabled));

        // Image
        if (formData.image) {
            data.append('image', formData.image);
        }

        addStream(data, {
            onSuccess: () => {
                resetForm();
                onClose();
            },
        });
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent
                hideClose={true}
                side="right"
                className="sm:max-w-[700px] p-0 border-none bg-white overflow-hidden flex flex-col"
            >
                {/* Header */}
                <div className="flex items-center justify-between py-2 px-4 border-b border-gray-100/80">
                    <span className="text-[18px] font-bold text-gray-800">Add New Stream</span>
                    <SheetClose className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </SheetClose>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-2">
                    <div className="grid grid-cols-1 gap-y-7">

                        {/* Stream Name */}
                        <FormField label="Stream Name" name="name" className="space-y-2.5">
                            <Input
                                type="text"
                                placeholder="e.g., Engineering & Technology"
                                value={formData.name}
                                onChange={(e) => updateField('name', e.target.value)}
                            />
                        </FormField>

                        {/* Number of Colleges */}
                        <FormField label="Number of Colleges" name="collegesCount" className="space-y-2.5">
                            <Input
                                type="number"
                                min={0}
                                placeholder="e.g., 3500"
                                value={formData.collegesCount}
                                onChange={(e) => updateField('collegesCount', e.target.value)}
                            />
                        </FormField>

                        {/* Enabled Toggle */}
                        <FormField label="Status" name="enabled" className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                                <label className="text-base font-medium">Enabled</label>
                                <p className="text-sm text-muted-foreground">
                                    Activate or deactivate this stream.
                                </p>
                            </div>
                            <Switch
                                checked={formData.enabled}
                                onCheckedChange={(checked) => updateField('enabled', checked)}
                            />
                        </FormField>

                    </div>

                    {/* Image Upload Area */}
                    <div className="mt-10">
                        <div className="w-full h-40 border-2 border-dashed border-gray-100 rounded-[24px] bg-gray-50/30 flex flex-col items-center justify-center gap-3 group hover:border-emerald-500/30 hover:bg-emerald-50/10 transition-all cursor-pointer relative overflow-hidden">
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-full object-contain absolute inset-0"
                                />
                            ) : (
                                <>
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                                        <ImageIcon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[14px] font-bold text-gray-800">
                                            {formData.image ? formData.image.name : "Drag & drop Stream Image here"}
                                        </p>
                                        <p className="text-[12px] text-gray-400 font-medium">Max size: 5 MB</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>


                <div className="p-3 border-t border-gray-100/80 flex justify-end gap-3">
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        disabled={isPending}
                        className="text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isPending}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[120px]"
                    >
                        {isPending ? "Saving..." : "Save Stream"}
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
