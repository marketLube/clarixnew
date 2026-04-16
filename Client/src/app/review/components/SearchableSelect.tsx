"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

export interface SearchableSelectOption {
    id: string;
    label: string;
    subtitle?: string;
}

interface SearchableSelectProps {
    value: string;
    onChange: (value: string, option?: SearchableSelectOption) => void;
    placeholder?: string;
    fetchOptions: (query: string) => Promise<SearchableSelectOption[]>;
    loadingLabel?: string;
    emptyLabel?: string;
    className?: string;
    id?: string;
    debounceMs?: number;
}

/**
 * Combobox-style searchable select.
 * - Typing filters results via the provided fetchOptions (debounced).
 * - Keyboard: Arrow up/down to navigate, Enter to select, Escape to close.
 * - Mobile: touch-friendly 44px height, list scrolls within a capped panel.
 * - Free-text fallback: if no option matches, the typed text is retained
 *   so the form still captures a value when the college/course is absent
 *   from the database.
 */
export default function SearchableSelect({
    value,
    onChange,
    placeholder = "Select...",
    fetchOptions,
    loadingLabel = "Loading...",
    emptyLabel = "No results",
    className = "",
    id,
    debounceMs = 250,
}: SearchableSelectProps) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [options, setOptions] = useState<SearchableSelectOption[]>([]);
    const [loading, setLoading] = useState(false);
    const [highlight, setHighlight] = useState(-1);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const debouncedQuery = useDebounce(query, debounceMs);

    // Close when clicking outside the widget.
    useEffect(() => {
        const handle = (e: MouseEvent) => {
            if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handle);
        return () => document.removeEventListener("mousedown", handle);
    }, []);

    // Fetch options whenever the panel is open and the query changes.
    useEffect(() => {
        if (!open) return;
        let cancelled = false;
        const run = async () => {
            setLoading(true);
            try {
                const opts = await fetchOptions(debouncedQuery);
                if (cancelled) return;
                setOptions(opts);
                setHighlight(opts.length > 0 ? 0 : -1);
            } catch {
                if (!cancelled) setOptions([]);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        run();
        return () => {
            cancelled = true;
        };
    }, [debouncedQuery, open, fetchOptions]);

    // Keep the highlighted item scrolled into view.
    useEffect(() => {
        if (!listRef.current || highlight < 0) return;
        const el = listRef.current.children[highlight] as HTMLElement | undefined;
        el?.scrollIntoView({ block: "nearest" });
    }, [highlight]);

    const selectOption = (opt: SearchableSelectOption) => {
        onChange(opt.label, opt);
        setQuery(opt.label);
        setOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            if (!open) setOpen(true);
            setHighlight((p) => Math.min(p + 1, Math.max(options.length - 1, 0)));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlight((p) => Math.max(p - 1, 0));
        } else if (e.key === "Enter") {
            if (open && highlight >= 0 && options[highlight]) {
                e.preventDefault();
                selectOption(options[highlight]);
            } else {
                setOpen(false);
            }
        } else if (e.key === "Escape") {
            setOpen(false);
        }
    };

    const displayValue = open ? query : value;

    return (
        <div ref={wrapperRef} className={`relative w-full ${className}`}>
            <div className="relative">
                <input
                    ref={inputRef}
                    id={id}
                    type="text"
                    value={displayValue}
                    placeholder={placeholder}
                    autoComplete="off"
                    onFocus={() => {
                        setQuery(value || "");
                        setOpen(true);
                    }}
                    onChange={(e) => {
                        const next = e.target.value;
                        setQuery(next);
                        if (!open) setOpen(true);
                        // Keep form state in sync so free-typed values persist
                        // even when the user doesn't pick a suggestion.
                        onChange(next);
                    }}
                    onKeyDown={handleKeyDown}
                    className="w-full h-10 md:h-[44px] bg-[#fdfdfd] border border-[#ededed] rounded-[10px] pl-3 md:pl-[14px] pr-9 md:pr-10 text-[14px] leading-[20px] text-[#162447] placeholder:text-[rgba(10,10,10,0.5)] focus:outline-none focus:border-[#513392] font-inter"
                />
                <button
                    type="button"
                    tabIndex={-1}
                    aria-label={open ? "Close options" : "Open options"}
                    onMouseDown={(e) => {
                        // Prevent the input from losing focus when toggling.
                        e.preventDefault();
                        setOpen((o) => !o);
                        inputRef.current?.focus();
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#767E92]"
                >
                    <ChevronDown
                        size={16}
                        className={`transition-transform ${open ? "rotate-180" : ""}`}
                    />
                </button>
            </div>

            {open && (
                <div className="absolute left-0 right-0 top-full mt-1 z-[60] bg-white border border-[#ededed] rounded-[10px] shadow-[0_8px_24px_rgba(22,36,71,0.08)] overflow-hidden">
                    <ul
                        ref={listRef}
                        role="listbox"
                        className="max-h-[220px] md:max-h-[240px] overflow-y-auto overscroll-contain py-1"
                    >
                        {loading ? (
                            <li className="px-3 py-3 text-center text-[13px] font-inter text-[#767E92]">
                                {loadingLabel}
                            </li>
                        ) : options.length === 0 ? (
                            <li className="px-3 py-3 text-[13px] font-inter text-[#767E92]">
                                {query ? (
                                    <span>
                                        No match.{" "}
                                        <button
                                            type="button"
                                            className="text-[#513392] font-medium underline"
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                onChange(query);
                                                setOpen(false);
                                            }}
                                        >
                                            Use &ldquo;{query}&rdquo;
                                        </button>
                                    </span>
                                ) : (
                                    emptyLabel
                                )}
                            </li>
                        ) : (
                            options.map((opt, i) => (
                                <li
                                    key={opt.id}
                                    role="option"
                                    aria-selected={i === highlight}
                                    onMouseEnter={() => setHighlight(i)}
                                    onMouseDown={(e) => {
                                        // preventDefault stops the input blur,
                                        // which would otherwise close the panel
                                        // before the click registers on mobile.
                                        e.preventDefault();
                                        selectOption(opt);
                                    }}
                                    className={`px-3 py-2 cursor-pointer text-[13px] md:text-[14px] font-inter text-[#162447] ${i === highlight ? "bg-[#f5f1fb]" : "hover:bg-[#f5f1fb]"
                                        }`}
                                >
                                    <div className="truncate font-medium leading-5">
                                        {opt.label}
                                    </div>
                                    {opt.subtitle && (
                                        <div className="truncate text-[11px] text-[#767E92]">
                                            {opt.subtitle}
                                        </div>
                                    )}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
