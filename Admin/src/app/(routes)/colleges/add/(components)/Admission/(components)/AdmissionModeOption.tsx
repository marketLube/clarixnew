type AdmissionModeOptionProps = {
    value: string;
    modeLabel: string;
    description: string;
    labelValue: string;
    descriptionValue: string;
    name: string;
    checked?: boolean;
    onChange?: () => void;
    onUpdateDetails: (label: string, description: string) => void;
    disabled?: boolean;
};

export default function AdmissionModeOption({
    value,
    modeLabel,
    description,
    labelValue,
    descriptionValue,
    name,
    checked,
    onChange,
    onUpdateDetails,
    disabled = false
}: AdmissionModeOptionProps) {
    return (
        <div className={`p-4 rounded-lg border border-black/10 bg-white/70 transition-all ${disabled ? 'opacity-60' : ''}`}>
            <label className={`flex items-center gap-3 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                <input
                    type="checkbox"
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    className="w-5 h-5 text-emerald-500 rounded border-2 border-gray-300 focus:ring-emerald-500 focus:ring-offset-0 accent-emerald-500 shrink-0"
                />
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-800">{modeLabel}</span>
                    <span className="text-xs text-gray-500">{description}</span>
                </div>
            </label>

            {checked && (
                <div className="mt-4 ml-8 space-y-3 animate-in slide-in-from-top-2 duration-200">
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Label <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={labelValue}
                            onChange={(e) => onUpdateDetails(e.target.value, descriptionValue)}
                            placeholder="e.g. Primary Route"
                            className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                            disabled={disabled}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={descriptionValue}
                            onChange={(e) => onUpdateDetails(labelValue, e.target.value)}
                            placeholder="e.g. 10+2 with minimum 60% in PCM"
                            rows={2}
                            className="w-full px-3 py-2 text-sm rounded-md border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all resize-none"
                            disabled={disabled}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}