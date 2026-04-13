import { Button } from "@/src/components/ui/button";
import { Building2, FileText, GraduationCap, Briefcase, FileCheck, Calendar, MessageSquare, Clock } from "lucide-react";

interface Activity {
    id: string;
    type: string;
    title: string;
    description: string;
    user: string;
    time: string;
    Icon: any;
    iconColor: string;
    bgColor: string;
}

const activities: Activity[] = [
    {
        id: "1",
        type: "College",
        title: "New College Added",
        description: "IIT Delhi - Computer Science",
        user: "Admin User",
        time: "2 minutes ago",
        Icon: Building2,
        iconColor: "#1e56a0",
        bgColor: "#CEE7FF",
    },
    {
        id: "2",
        type: "Application",
        title: "Application Submitted",
        description: "25 new applications received",
        user: "System",
        time: "15 minutes ago",
        Icon: FileText,
        iconColor: "#0dba85",
        bgColor: "#DCFCE7",
    },
    {
        id: "3",
        type: "Scholarship",
        title: "Scholarship Approved",
        description: "Merit Scholarship - Rs. 50,000",
        user: "Finance Team",
        time: "1 hour ago",
        Icon: GraduationCap,
        iconColor: "#FFC107",
        bgColor: "#FEF3C7",
    },
    {
        id: "4",
        type: "Job",
        title: "Job Posted",
        description: "Software Engineer at Google",
        user: "HR Team",
        time: "2 hours ago",
        Icon: Briefcase,
        iconColor: "#8B5CF6",
        bgColor: "#EDE9FE",
    },
    {
        id: "5",
        type: "Content",
        title: "Content Published",
        description: "Guide: JEE Main 2024 Preparation",
        user: "Content Team",
        time: "3 hours ago",
        Icon: FileCheck,
        iconColor: "#EF4444",
        bgColor: "#FEE2E2",
    },
    {
        id: "6",
        type: "Event",
        title: "Event Scheduled",
        description: "Webinar on AI Innovations",
        user: "Events Team",
        time: "1 hour ago",
        Icon: Calendar,
        iconColor: "#1e56a0",
        bgColor: "#CEE7FF",
    },
    {
        id: "7",
        type: "Feedback",
        title: "Feedback Received",
        description: "User feedback on the new features",
        user: "Product Team",
        time: "30 minutes ago",
        Icon: MessageSquare,
        iconColor: "#0dba85",
        bgColor: "#DCFCE7",
    },
];

export default function LeftBody() {
    return (
        <div className="bg-white rounded-[18px] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-semibold text-[#364440]">Recent Activities</h3>
                <Button size="sm" className="bg-[#0dba85] hover:bg-[#0aa67bd2] text-white px-4 h-8 rounded-lg text-xs font-medium">
                    View All
                </Button>
            </div>

            <div className="flex flex-col">
                {activities.map((activity, index) => (
                    <div key={activity.id} className="relative">
                        <div className="flex items-start gap-4 py-4 group cursor-pointer lg:hover:bg-gray-50/50 rounded-lg transition-colors">
                            <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                                style={{ backgroundColor: activity.bgColor }}
                            >
                                <activity.Icon className="w-5 h-5" style={{ color: activity.iconColor }} />
                            </div>

                            <div className="flex-1">
                                <h4 className="text-sm font-semibold text-[#364440] mb-0.5">{activity.title}</h4>
                                <p className="text-sm text-[#868F8B] font-normal mb-1">{activity.description}</p>
                                <div className="flex items-center gap-2 text-xs text-[#868F8B]">
                                    <span>{activity.user}</span>
                                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        <span>{activity.time}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {index !== activities.length - 1 && (
                            <div className="h-[1px] bg-gray-100/80 w-full" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}