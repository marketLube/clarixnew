import { FormField } from "@/src/components/ui/FormField";
import { Input } from "@/src/components/ui/input";
import { Select } from "@/src/components/ui/Selector";
import { MultiSelector } from "@/src/components/ui/MultiSelector";
import {
  ImageIcon,
  UploadCloud,
  FileText,
  X,
} from "lucide-react";
import { UploadProgress } from "@/src/components/ui/FileUpload";
import { useRef } from "react";
import { useStreams } from "@/src/servicesHooks/streamHooks/useStream";

interface BasicInfoProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  readOnly?: boolean;
}

export default function BasicInfo({ formData, onUpdate, readOnly = false }: BasicInfoProps) {
  const { data: streamsResponse, isLoading: isLoadingStreams } = useStreams({ limit: 100 });

  const streamOptions = streamsResponse?.data?.streams?.map(stream => ({
    label: stream.name,
    value: stream.name
  })) || [];

  const logoInputRef = useRef<HTMLInputElement | null>(null);

  function handleLogoClick() {
    logoInputRef.current?.click();
  }

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    onUpdate("logo", file);
  }

  function handleRemoveLogo() {
    onUpdate("logo", null);
    if (logoInputRef.current) {
      logoInputRef.current.value = "";
    }
  }

  const brochureInputRef = useRef<HTMLInputElement | null>(null);

  function handleBrochureClick() {
    brochureInputRef.current?.click();
  }

  function handleBrochureChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    onUpdate("brochure", file);
  }

  function handleRemoveBrochure() {
    onUpdate("brochure", null);
    if (brochureInputRef.current) {
      brochureInputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-4 w-full overflow-y-auto">
      <div className="flex w-full gap-4">
        <div className="w-1/2">
          <FormField label="College Name" name="College Name">
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              placeholder="Eg: Indian Institute of Technology, Bombay"
              onChange={(e) => onUpdate("name", e.target.value)}
              required={true}
              disabled={readOnly}
            />
          </FormField>
        </div>

        <div className="w-1/2">
          <FormField label="College Type" name="collegeType">
            <Select
              value={formData.type}
              onValueChange={(value) => onUpdate("type", value)}
              placeholder="Select College Type"
              options={[
                { label: "Public", value: "Public" },
                { label: "Private", value: "Private" },
              ]}
              disabled={readOnly}
            />
          </FormField>
        </div>


      </div>

      <div className="flex w-full gap-4">


        <div className="w-1/2">
          <FormField label="State" name="state">
            <Select
              value={formData.state}
              onValueChange={(value) => onUpdate("state", value)}
              placeholder="Select State"
              options={[
                { label: "Kerala", value: "kerala" },
                { label: "Karnataka", value: "karnataka" },
                { label: "Tamil Nadu", value: "tamil-nadu" },
                { label: "Telangana", value: "telangana" },
              ]}
              disabled={readOnly}
            />
          </FormField>
        </div>

        <div className="w-1/2">
          <FormField label="City" name="city">
            <Select
              value={formData.city}
              onValueChange={(value) => onUpdate("city", value)}
              placeholder="Select City"
              options={[
                { label: "Kerala", value: "kerala" },
                { label: "Karnataka", value: "karnataka" },
                { label: "Tamil Nadu", value: "tamil-nadu" },
                { label: "Telangana", value: "telangana" },
              ]}
              disabled={readOnly}
            />
          </FormField>
        </div>
      </div>

      <div className="flex w-full gap-4">
        <div className="w-1/2">
          <FormField label="Category (Stream)" name="category">
            <Select
              value={formData.category}
              onValueChange={(value) => onUpdate("category", value)}
              placeholder={isLoadingStreams ? "Loading Categories..." : "Select Category"}
              options={streamOptions}
              disabled={readOnly || isLoadingStreams}
            />
          </FormField>
        </div>
        <div className="w-1/2">
          <FormField label="Established Year" name="establishedYear">
            <Input
              id="establishedYear"
              name="establishedYear"
              type="number"
              value={formData.establishedYear}
              placeholder="Eg: 2000"
              onChange={(e) => onUpdate("establishedYear", e.target.value)}
              required={true}
              disabled={readOnly}
            />
          </FormField>
        </div>
      </div>

      <div className="flex w-full gap-4">

        <div className="w-1/2">
          <FormField label="Rating" name="Rating">
            <Input
              id="rating"
              name="rating"
              type="number"
              value={formData.rating}
              placeholder="Eg: 4.8"
              onChange={(e) => onUpdate("rating", e.target.value)}
              required={true}
              disabled={readOnly}
            />
          </FormField>
        </div>
        <div className="w-1/2">
          <FormField label="Accreditations & Rankings" name="accreditations">
            <MultiSelector
              value={formData.accreditation || []}
              onChange={(value) => onUpdate("accreditation", value)}
              placeholder="Select Accreditation"
              options={[
                { label: "NIRF", value: "NIRF" },
                { label: "AACSB", value: "AACSB" },
                { label: "EQUIS", value: "EQUIS" },
                { label: "AMBA", value: "AMBA" },
                { label: "Other", value: "Other" },
              ]}
              disabled={readOnly}
            />
          </FormField>
        </div>
      </div>
      <div className="flex w-full gap-4">


        <FormField label="Add Logo" name="logo" className="w-full">
          {formData.logo ? (
            typeof formData.logo === 'string' ? (
              // Display logo URL with edit/view options
              <div className="h-10 rounded-lg border border-emerald-300/60 bg-emerald-50/40 px-3 flex items-center justify-between w-full">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded bg-white flex items-center justify-center flex-shrink-0">
                    <img
                      src={formData.logo}
                      alt="College Logo"
                      className="w-full h-full object-contain rounded"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = '<svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>';
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-700 font-medium truncate">
                    {readOnly ? "Logo uploaded" : "Current logo"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {readOnly ? (
                    <a
                      href={formData.logo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-emerald-600 hover:underline"
                    >
                      View Logo
                    </a>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLogoClick();
                        }}
                        className="px-2 py-1 text-xs text-emerald-600 hover:bg-emerald-100 rounded transition-colors"
                      >
                        Change
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveLogo();
                        }}
                        className="p-1 hover:bg-red-100 rounded transition-colors"
                      >
                        <X className="w-3 h-3 text-red-600" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              // Display file info in add/edit mode
              <div className="h-10 rounded-lg border border-emerald-300/60 bg-emerald-50/40 px-3 flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-emerald-100 flex items-center justify-center">
                    <ImageIcon className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-700 font-medium truncate max-w-[200px]">
                      {formData.logo?.name || "Logo uploaded"}
                    </span>
                    {formData.logo?.size && (
                      <span className="text-[10px] text-gray-500">
                        {(formData.logo.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    )}
                  </div>
                </div>
                {!readOnly && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveLogo();
                    }}
                    className="p-1 hover:bg-red-100 rounded transition-colors"
                  >
                    <X className="w-3 h-3 text-red-600" />
                  </button>
                )}
              </div>
            )
          ) : (
            <div
              onClick={readOnly ? undefined : handleLogoClick}
              className={`h-10 rounded-lg border border-dashed border-emerald-300/60 bg-emerald-50/40 px-3 flex items-center justify-between w-full ${!readOnly ? 'cursor-pointer hover:bg-emerald-50' : 'cursor-not-allowed opacity-60'}`}
            >
              <div className="flex items-center gap-2 text-sm text-emerald-700">
                <ImageIcon className="w-4 h-4" />
                <span className="font-medium">
                  {readOnly ? "No logo uploaded" : "Drag & drop your Company Logo here"}
                </span>
              </div>
              {!readOnly && <span className="text-xs text-gray-500">Max size: 3 MB</span>}
            </div>
          )}

          <input
            ref={logoInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleLogoChange}
            disabled={readOnly}
          />
        </FormField>
      </div>


      {formData.brochure ? (
        <div className="rounded-lg border border-emerald-300/60 bg-emerald-50/30 py-6 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700 font-medium">
                {typeof formData.brochure === 'string'
                  ? (readOnly ? "Brochure uploaded" : "Current brochure")
                  : (formData.brochure?.name || "Brochure uploaded")
                }
              </p>
              <p className="text-xs text-gray-500">
                {typeof formData.brochure === 'string' ? (
                  <a
                    href={formData.brochure}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:text-emerald-700 underline"
                  >
                    View Brochure
                  </a>
                ) : (
                  formData.brochure?.size
                    ? `${(formData.brochure.size / 1024 / 1024).toFixed(2)} MB`
                    : ""
                )}
              </p>
            </div>
          </div>
          {!readOnly && (
            <div className="flex items-center gap-2">
              {typeof formData.brochure === 'string' && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBrochureClick();
                  }}
                  className="px-3 py-1.5 text-xs text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"
                >
                  Change
                </button>
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveBrochure();
                }}
                className="p-2 hover:bg-emerald-100 rounded-lg transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={readOnly ? undefined : handleBrochureClick}
          className={`rounded-lg border border-dashed border-emerald-300/60 bg-emerald-50/30 py-6 flex flex-col items-center justify-center ${!readOnly ? 'cursor-pointer hover:bg-emerald-50' : 'cursor-not-allowed opacity-60'}`}
        >
          <UploadCloud className="w-8 h-8 text-emerald-600 mb-2" />
          <p className="text-sm text-gray-700 font-medium">
            {readOnly ? "No brochure uploaded" : "Drag & drop your brochure here"}
          </p>
          {!readOnly && <p className="text-xs text-gray-500">Max size: 10 MB</p>}
        </div>
      )}

      <input
        ref={brochureInputRef}
        type="file"
        accept=".pdf,.doc,.docx,image/*"
        className="hidden"
        onChange={handleBrochureChange}
        disabled={readOnly}
      />


    </div>
  );
}
