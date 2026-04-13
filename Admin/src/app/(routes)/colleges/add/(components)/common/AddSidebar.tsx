import { cn } from "@/lib/utils";
import { sidebarItems } from "../../data/data";


export default function AddSidebar({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) {
  return (
    <aside className="w-64 border-r border-black/10 rounded-l-xl px-3 overflow-auto">
      <ul className="py-4 space-y-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.label}>
              <button
                onClick={() => setActiveTab(item.label)}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-3 text-sm font-thin rounded-md transition",
                  "hover:bg-[#0dba85] hover:text-white text-[#868F8B]",
                  activeTab === item.label &&
                  "bg-[#0dba85] text-white hover:bg-[#0dba85] border-r-2 border-[#0dba85]"
                )}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  )
}