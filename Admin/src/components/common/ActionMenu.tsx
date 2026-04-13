import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/src/components/ui/popover";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface ActionMenuItem {
    label: string;
    icon: LucideIcon;
    onClick?: () => void;
    className?: string; // For text color specific overrides like Delete
    danger?: boolean; // Helper for red styling
}

interface ActionMenuProps {
    trigger: React.ReactNode;
    items: ActionMenuItem[];
    align?: "start" | "center" | "end";
    sideOffset?: number;
}

export function ActionMenu({ trigger, items, align = "end", sideOffset = 5 }: ActionMenuProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                {trigger}
            </PopoverTrigger>
            <PopoverContent
                align={align}
                sideOffset={sideOffset}
                className="w-[155px] p-[3px] bg-white border border-[#dee7e4] rounded-[10px] shadow-[1px_6px_41px_0px_rgba(0,0,0,0.04)]"
            >
                <div className="flex flex-col gap-[2px]">
                    {items.map((item, index) => (
                        <button
                            key={index}
                            onClick={item.onClick}
                            className="flex items-center gap-2 px-4 py-[7px] w-full text-left rounded-[7px] hover:bg-gray-50 transition-colors group"
                        >
                            <item.icon
                                className={cn(
                                    "w-4 h-4 text-gray-500 group-hover:text-gray-700",
                                    item.danger && "text-[#f63f3f] group-hover:text-[#f63f3f]",
                                    item.className
                                )}
                            />
                            <span
                                className={cn(
                                    "text-sm font-medium leading-[20px] text-[#1c1d1d]",
                                    item.danger && "text-[#f63f3f]",
                                    item.className
                                )}
                            >
                                {item.label}
                            </span>
                        </button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}
