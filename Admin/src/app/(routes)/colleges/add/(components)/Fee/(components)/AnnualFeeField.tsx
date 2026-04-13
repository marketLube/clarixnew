import { Input } from "@/src/components/ui/input";

type AnnualFeeFieldProps = {
    id: string;
    name: string;
    placeholder: string;
    value?: any;
    onChange?: (e: any) => void;
    disabled?: boolean;
};

export default function AnnualFeeField({ id, name, placeholder, value, onChange, disabled = false }: AnnualFeeFieldProps) {
    return (
        <div className="w-1/2">
            <Input
                id={id}
                name={name}
                type="number"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className="h-10 rounded-lg border border-black/10 bg-white/70 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
        </div>
    );
}
