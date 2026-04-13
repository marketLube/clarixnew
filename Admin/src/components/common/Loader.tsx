import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const spinnerVariants = cva(
    "relative inline-block",
    {
        variants: {
            size: {
                sm: "w-5 h-5",
                md: "w-8 h-8",
                lg: "w-12 h-12",
                xl: "w-16 h-16",
            },
        },
        defaultVariants: {
            size: "lg",
        },
    }
);

interface LoaderProps extends VariantProps<typeof spinnerVariants> {
    className?: string;
    light?: boolean;
}

export default function Loader({ size, className, light = false }: LoaderProps) {
    const bars = Array.from({ length: 12 });

    return (
        <div className={cn("flex justify-center items-center w-full", className)}>
            <div className={cn(spinnerVariants({ size }))} aria-label="Loading">
                {bars.map((_, i) => (
                    <div
                        key={i}
                        className={cn(
                            "absolute left-[46.5%] top-[2.5%] w-[7%] h-[28%] rounded-full animate-spinner-fade",
                            light ? "bg-white" : "bg-gray-500"
                        )}
                        style={{
                            transform: `rotate(${i * 30}deg) translate(0, 10%)`,
                            transformOrigin: "center 135%", // Critical for the apple-like circle layout
                            animationDelay: `${-1.1 + (i * 0.1)}s`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
