 "use client";

import React, { useState } from "react";
import { MapPin, Image as ImageIcon, Plus, Pencil, Trash2 } from "lucide-react";
import { ContentSection } from "@/src/components/ui/ContentSection";
import { FormField } from "@/src/components/ui/FormField";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Switch } from "@/src/components/ui/switch";
import AddLocationDrawer from "./AddLocationDrawer";

export default function Location({ data, updateLocationData }) {
    const section = data.location || { enabled: true, title: "", items: [] };
    const items = section.items || [];
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const handleTitleChange = (e) => {
        updateLocationData({ title: e.target.value });
    };

    const handleAddLocationClick = () => {
        setEditingItem(null);
        setIsDrawerOpen(true);
    };

    const handleSaveLocation = (item) => {
        const existingIndex = items.findIndex((loc) => loc.id === item.id);
        if (existingIndex >= 0) {
            const next = [...items];
            next[existingIndex] = { ...next[existingIndex], ...item };
            updateLocationData({ items: next });
        } else {
            updateLocationData({
                items: [...items, item],
            });
        }
        setIsDrawerOpen(false);
        setEditingItem(null);
    };

    const updateItem = (index, updates) => {
        const next = [...items];
        next[index] = { ...next[index], ...updates };
        updateLocationData({ items: next });
    };

    const handleDelete = (index) => {
        const next = items.filter((_, i) => i !== index);
        updateLocationData({ items: next });
    };

    return (
        <ContentSection
            id="location"
            title="Location"
            description="Manage featured locations displayed on the homepage."
            icon={<MapPin className="w-5 h-5 text-[#10B981]" />}
            isEnabled={section.enabled}
            onToggle={(enabled) => updateLocationData({ enabled })}
        >
            <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <FormField label="Title *" name="location-title" className="flex-1">
                        <Input
                            id="location-title"
                            value={section.title || ""}
                            onChange={handleTitleChange}
                            placeholder="e.g., Hostel Life, Sports & Recreation"
                            className="h-[48px] bg-[#fdfdfd] border-[#DEE7E4] focus-visible:ring-[#10B981]"
                        />
                    </FormField>

                    <Button
                        type="button"
                        onClick={handleAddLocationClick}
                        className="md:self-auto self-stretch md:w-auto h-[48px]"
                    >
                        <Plus className="w-4 h-4" />
                        Add Location
                    </Button>
                </div>

                <div className="space-y-3">
                    {items.length === 0 && (
                        <div className="border border-dashed border-[#C7E6D5] rounded-xl bg-[#F4FBF7] py-5 px-4 text-center text-sm text-[#6B7280]">
                            No locations added yet. Click <span className="font-medium">Add Location</span> to create one.
                        </div>
                    )}

                    {items.map((item, index) => (
                        <div
                            key={item.id || index}
                            className="flex items-center justify-between gap-4 border border-[#E5E7EB] rounded-xl bg-white px-4 py-3 shadow-sm"
                        >
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                <div className="h-[60px] w-[80px] rounded-xl bg-[#F3F4F6] flex items-center justify-center overflow-hidden flex-shrink-0">
                                    {item.image ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={item.image}
                                            alt={item.name || "Location"}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <ImagePlaceholder />
                                    )}
                                </div>

                                <div className="flex flex-col gap-1 min-w-0">
                                    <p className="text-sm font-semibold text-[#111827] truncate">
                                        {item.name || "Untitled location"}
                                    </p>
                                    <p className="text-xs text-[#6B7280] truncate">
                                        {item.slug || "/your-location-slug"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-5 flex-shrink-0">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-[#4B5563]">Active</span>
                                    <Switch
                                        checked={item.isActive}
                                        onCheckedChange={(val) => updateItem(index, { isActive: val })}
                                        className=""
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        className="p-2 rounded-lg border border-[#E5E7EB] text-[#6B7280] hover:bg-gray-50"
                                        aria-label="Edit location"
                                        onClick={() => {
                                            setEditingItem(item);
                                            setIsDrawerOpen(true);
                                        }}
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button
                                        type="button"
                                        className="p-2 rounded-lg border border-[#FECACA] text-[#DC2626] hover:bg-red-50"
                                        aria-label="Delete location"
                                        onClick={() => handleDelete(index)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <AddLocationDrawer
                open={isDrawerOpen}
                onOpenChange={(open) => {
                    setIsDrawerOpen(open);
                    if (!open) setEditingItem(null);
                }}
                onSave={handleSaveLocation}
                editItem={editingItem}
            />
        </ContentSection>
    );
}

function ImagePlaceholder() {
    return (
        <div className="flex items-center justify-center h-full w-full">
            <ImageIcon className="w-8 h-8 text-[#9CA3AF]" />
        </div>
    );
}
