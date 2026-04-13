import { ActionMenu } from "@/src/components/common/ActionMenu";
import { StatusBadge } from "@/src/components/common/StatusBadge";
import { Button } from "@/src/components/ui/button";
import { Calendar, Eye, Home, MoreVertical, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

interface ContentManagementCardProps {
    title?: string;
    description?: string;
    status?: string;
    updatedAt?: string;
    updateBy?: string;
    Icon?: any;
    navigateTo?: string;
}

export default function ContentManagementCard({
    title = "Home Page",
    description = "Main landing page with hero section, featured colleges, popular courses, and testimonials.",
    status = "Published",
    updatedAt = "2 hours ago",
    updateBy = "Priya Sharma",
    Icon = Home,
    navigateTo = "/content/homepage"
}: ContentManagementCardProps) {

    const router = useRouter()
    return (
        <div className="bg-white border rounded-[20px] p-4 shadow-[1px_6px_41px_0px_rgba(0,0,0,0.04)] border-[#DEE7E4]">
            <div className="flex items-start justify-between mb-3">
                <div className="flex gap-3">
                    <div className="w-14 h-14 bg-[#DEE7E4] rounded-xl flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-[#364440]" />
                    </div>
                    <div>
                        <h3 className="text-base font-medium text-[#364440] mb-1">{title}</h3>
                        <div className="flex items-center gap-1.5 text-xs text-[#868F8B]">
                            <Calendar className="w-3 h-3" />
                            <span>Updated {updatedAt} by {updateBy}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <StatusBadge status={status} className="text-[10px] px-2 py-0.5 min-w-[70px]" />
                    <ActionMenu
                        trigger={
                            <button className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                                <MoreVertical className="w-3.5 h-3.5 text-gray-500" />
                            </button>
                        }
                        items={[
                            { label: "Edit", icon: Pencil, onClick: () => { } },
                            { label: "Preview", icon: Eye, onClick: () => { } },
                        ]}
                    />
                </div>
            </div>

            <p className="text-sm text-[#364440] font-normal leading-5 mb-4">
                {description}
            </p>

            <div className="flex items-center gap-3">
                <Button className="flex-1 bg-[#10B981] hover:bg-[#059669] text-white rounded-lg h-9 gap-2 text-xs" onClick={() => router.push(navigateTo)}>
                    <Pencil className="w-3.5 h-3.5" />
                    Edit Content
                </Button>
                <Button variant="outline" className="w-[120px] border-gray-200 text-[#364440] hover:bg-gray-50 rounded-lg h-9 gap-2 text-xs">
                    <Eye className="w-3.5 h-3.5" />
                    Preview
                </Button>
            </div>
        </div>
    )
}   