import { cn } from "@/lib/utils";

interface BlogSectionTabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    createTabLabel?: string;
}

export function BlogSectionTabs({ activeTab, setActiveTab, createTabLabel = "Create a Blog" }: BlogSectionTabsProps) {
    const tabs = [
        { id: "list", label: "Blog List" },
        { id: "hero", label: "Hero Section" },
        { id: "create", label: createTabLabel },
    ];

    return (
        <div className="flex justify-center py-6">
            <div className="flex items-center p-1 bg-white border border-[#E2E2E2] rounded-[10px] w-fit">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "px-10 py-2.5 rounded-[8px] text-sm font-medium transition-all duration-200 min-w-[170px]",
                            activeTab === tab.id
                                ? "bg-[#0dba85] text-white shadow-sm"
                                : "text-[#868F8B] hover:text-[#364440] bg-transparent"
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
