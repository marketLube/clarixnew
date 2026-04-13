"use client";

interface SwitchProps {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    className?: string;
    disabled?: boolean;
}

export function Switch({ checked, onCheckedChange, className = "", disabled = false }: SwitchProps) {
    return (
        <button
            type="button"
            role="switch"
            disabled={disabled}
            aria-checked={checked}
            onClick={() => !disabled && onCheckedChange(!checked)}
            className={className}
            style={{
                width: "42px",
                height: "22px",
                borderRadius: "999px",
                backgroundColor: checked ? "#22C55E" : "#CBD5E1",
                border: "1px solid #94A3B8",
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                padding: "2px",
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.6 : 1,
            }}
        >
            <span
                style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    background: "white",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                    transform: checked ? "translateX(20px)" : "translateX(0)",
                    transition: "transform 0.2s ease",
                }}
            />
        </button>
    );
}
