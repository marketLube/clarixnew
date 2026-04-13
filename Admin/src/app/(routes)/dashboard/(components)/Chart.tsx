"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Button } from "@/src/components/ui/button";

const data = [
    { name: "Engineering", value: 28.5, count: "3,845", color: "#0DBA85" },
    { name: "Architecture", value: 22, count: "3,845", color: "#7CD0B0" },
    { name: "Management", value: 18.5, count: "3,845", color: "#48C7B9" },
    { name: "Arts & Humanities", value: 16, count: "2,156", color: "#46BDC8" },
    { name: "Science", value: 9.2, count: "3,845", color: "#B3EDB1" },
    { name: "Hotel Management", value: 3.4, count: "456", color: "#E4F48A" },
    { name: "Commerce", value: 2.2, count: "298", color: "#FEE08B" },
];

export default function Chart() {
    return (
        <div className="flex flex-col p-6 pb-0">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h3 className="text-lg font-semibold text-[#364440]">College Distribution</h3>
                    <p className="text-sm text-[#868F8B]">By category</p>
                </div>
                <Button size="sm" className="bg-[#0dba85] hover:bg-[#0aa67bd2] text-white px-4 h-8 rounded-lg text-xs font-medium">
                    View All
                </Button>
            </div>

            <div className="flex items-center gap-6 mt-4">
                {/* Chart Section - Made slightly bigger */}
                <div className="w-[240px] h-[240px] relative shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={110}
                                paddingAngle={4}
                                dataKey="value"
                                startAngle={90}
                                endAngle={450}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                            </Pie>
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const data = payload[0].payload;
                                        return (
                                            <div className="bg-white p-2 border border-gray-100 shadow-lg rounded-lg outline-none">
                                                <p className="text-xs font-medium text-[#364440]">{data.name}</p>
                                                <p className="text-[10px] text-[#868F8B]">{data.value}% ({data.count})</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Legend Section - Made more compact */}
                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                    {data.map((item) => (
                        <div
                            key={item.name}
                            className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0 group"
                        >
                            <div className="flex items-center gap-2 min-w-0">
                                <div
                                    className="w-2 h-2 rounded-full shrink-0"
                                    style={{ backgroundColor: item.color }}
                                />
                                <div className="truncate">
                                    <h4 className="text-[11px] font-medium text-[#364440] truncate leading-tight">{item.name}</h4>
                                    <p className="text-[9px] text-[#868F8B] leading-tight">{item.count} Added</p>
                                </div>
                            </div>
                            <span className="text-[11px] font-semibold text-[#364440] ml-2">{item.value}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}