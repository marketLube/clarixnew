"use client";

import { Loader2 } from "lucide-react";

interface LoaderProps {
    className?: string; // For the loader icon
    size?: number | string; // Size of the icon
    color?: string; // Color of the icon
    fullPage?: boolean; // If true, takes full height/width and centers
    containerClassName?: string; // Additional classes for the container
    label?: string; // Optional text label below the spinner
    labelClassName?: string; // Additional classes for the label
}

const Loader = ({
    className = "",
    size,
    color,
    fullPage = false,
    containerClassName = "",
    label,
    labelClassName = ""
}: LoaderProps) => {
    const isRow = containerClassName.includes("flex-row");

    // Branded colors for fullPage mode
    const defaultColor = fullPage ? "#ffffff" : "#513392";
    const activeColor = color || defaultColor;
    const activeSize = size || (fullPage ? 40 : 32);

    const containerStyles = fullPage
        ? "fixed inset-0 flex flex-col items-center justify-center bg-[#513392] z-50 text-center text-white"
        : `flex ${isRow ? "" : "flex-col"} justify-center items-center py-10 ${containerClassName}`;

    return (
        <div className={containerStyles} role="status" aria-label={label || "Loading"}>
            {fullPage && (
                <div className="mb-8 animate-pulse">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/images/log.png"
                        alt="Clarix Education logo"
                        className="h-12 md:h-16 w-auto brightness-0 invert"
                    />
                </div>
            )}

            <Loader2
                className={`animate-spin ${className}`}
                size={activeSize}
                color={activeColor}
            />
            {label && (
                <p className={`${isRow ? "ml-2" : "mt-3"} text-inherit text-sm animate-pulse font-poppins tracking-wide ${labelClassName}`}>
                    {label}
                </p>
            )}

            {/* Decorative bottom background for fullPage mode */}
            {fullPage && (
                <div
                    className="absolute bottom-0 left-0 w-full h-[250px] md:h-[400px] bg-contain bg-bottom bg-no-repeat pointer-events-none opacity-20 transition-opacity duration-1000"
                    style={{ backgroundImage: "url('/images/footer-bg.png')" }}
                />
            )}
        </div>
    );
};

export default Loader;
