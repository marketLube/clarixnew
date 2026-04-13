"use client";

import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetClose,
} from "@/src/components/ui/sheet";
import { Button } from "@/src/components/ui/button";
import { FormField } from "@/src/components/ui/FormField";
import { Input } from "@/src/components/ui/input";
import { Switch } from "@/src/components/ui/switch";
import { UploadZone } from "@/src/components/ui/FileUpload";
import { X, Image as ImageIcon } from "lucide-react";

interface LocationItem {
  id: string;
  name: string;
  slug: string;
  /**
   * Display image URL (existing from API or local preview).
   */
  image?: string;
  /**
   * New image file selected in the drawer; used when publishing.
   */
  imageFile?: File | null;
  isActive: boolean;
}

interface AddLocationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (item: LocationItem) => void;
  editItem?: LocationItem | null;
}

const INITIAL_FORM_STATE: LocationItem = {
  id: "",
  name: "",
  slug: "",
  image: "",
  imageFile: null,
  isActive: true,
};

export default function AddLocationDrawer({
  open,
  onOpenChange,
  onSave,
  editItem,
}: AddLocationDrawerProps) {
  const [formData, setFormData] = useState<LocationItem>(INITIAL_FORM_STATE);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  useEffect(() => {
    if (open) {
      if (editItem) {
        setFormData({
          ...INITIAL_FORM_STATE,
          ...editItem,
          imageFile: null,
        });
        setUploadedFile(null);
      } else {
        setFormData({
          ...INITIAL_FORM_STATE,
          id: Date.now().toString(),
        });
        setUploadedFile(null);
      }
    }
  }, [open, editItem]);

  const handleFileSelect = (file: File) => {
    setUploadedFile(file);
    // Create a preview URL for the image field while keeping the File
    const objectUrl = URL.createObjectURL(file);
    setFormData({ ...formData, image: objectUrl, imageFile: file });
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.slug.trim()) return;
    onSave(formData);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        hideClose={true}
        side="right"
        className="sm:max-w-[520px] p-0 border-none bg-white overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between py-3 px-5 border-b border-gray-100">
          <div className="flex flex-col">
            <span className="text-[18px] font-bold text-gray-900">
              {editItem ? "Edit Location" : "Add Location"}
            </span>
            <span className="text-[13px] text-gray-500">
              Configure location details for the homepage section.
            </span>
          </div>
          <SheetClose asChild>
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </SheetClose>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
          <div className="space-y-2">
            <label htmlFor="location-name" className="text-sm font-medium text-gray-700 mb-1 block">
              Title <span className="text-red-500">*</span>
            </label>
            <Input
              id="location-name"
              placeholder="e.g., Hostel Life, Sports & Recreation"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border-[#DEE7E4] bg-white"
            />
          </div>

          <FormField label="Image" name="location-image-upload" className="space-y-2">
            <UploadZone
              id="location-image-upload"
              accept="image/png"
              title="click to upload"
              description="PNG up to 5MB each"
              onFileSelect={handleFileSelect}
              file={uploadedFile || formData.image || null}
              onClear={() => {
                setUploadedFile(null);
                setFormData({ ...formData, image: "", imageFile: null });
              }}
              icon={
                <div className="w-12 h-12 rounded-xl bg-white border border-[#F3F4F6] flex items-center justify-center shadow-sm">
                  <ImageIcon className="w-6 h-6 text-[#10B981]" />
                </div>
              }
              className="border-dashed"
            />
          </FormField>

          <FormField label="URL Slug" name="location-slug" className="space-y-2">
            <Input
              placeholder="/bengaluru-colleges"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            />
          </FormField>

          <FormField label="" name="location-status" className="w-full">
            <div className="flex w-full flex-row items-start justify-between rounded-2xl bg-gray-50 px-4 py-3">
              <div className="space-y-0.5">
                <p className="text-sm font-semibold text-gray-900">Active Status</p>
                <p className="text-xs text-gray-500">
                  This section will be visible on the frontend.
                </p>
              </div>
              <Switch
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isActive: checked })
                }
              />
            </div>
          </FormField>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-gray-100 flex justify-end gap-3">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[120px]"
          >
            Save
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
