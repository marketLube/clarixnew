import { Button } from "@/src/components/ui/button";

const tasks = [
    {
        id: "1",
        title: "Review 12 pending college applications",
        priority: "High Priority",
    },
    {
        id: "2",
        title: "Approve 8 scholarship requests",
        priority: "High Priority",
    },
    {
        id: "3",
        title: "Verify 15 new course entries",
        priority: "Normal",
    },
];

export default function PendingTasks() {
    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-[#364440]">Pending Tasks</h3>
                    <span className="bg-[#0dba85] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">5</span>
                </div>
                <Button variant="outline" size="sm" className="border-gray-200 text-[#364440] hover:bg-gray-50 h-8 rounded-lg text-xs font-medium">
                    View All
                </Button>
            </div>

            <div className="flex flex-col gap-3">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className="p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group border border-gray-100/80"
                    >
                        <h4 className="text-sm font-medium text-[#364440] mb-2">{task.title}</h4>
                        <span className={`text-[10px] font-semibold px-2 py-1 rounded-md ${task.priority === "High Priority"
                            ? "bg-[#FFE4E4] text-[#D32F2F]"
                            : "bg-gray-100 text-gray-500"
                            }`}>
                            {task.priority}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
