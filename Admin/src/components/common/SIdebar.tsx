"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Building2,
  Layers,
  FileText,
  Award,
  Briefcase,
  Star,
  Users,
  Settings,
  LogOut,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const routes = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Colleges", href: "/colleges", icon: GraduationCap },
  { label: "Courses", href: "/courses", icon: BookOpen },
  { label: "Universities", href: "/universities", icon: Building2 },
  { label: "Recruiters", href: "/recruiters", icon: Briefcase },
  { label: "Streams", href: "/streams", icon: Layers },
  { label: "Exams", href: "/exams", icon: FileText },
  { label: "Scholarships", href: "/scholarships", icon: Award },
  { label: "Jobs & Internships", href: "/jobs", icon: Briefcase },
  { label: "Reviews", href: "/reviews", icon: Star },
  { label: "Content Management", href: "/content", icon: Users },
];

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    router.push("/login");
    console.log("Logout");
  };

  return (
    <aside
      className={`relative bg-[#1C1D1D] flex flex-col h-full transition-all duration-300 ${isCollapsed ? "w-16" : "w-60"
        }`}
    >
      {!isCollapsed && <div
        className={`h-16 flex items-center transition-all duration-300 ${isCollapsed ? "justify-center px-0" : "px-2"
          }`}
      >
        {!isCollapsed && (
          <div className="flex flex-col mb-2">
            <Image src="/assets/Logo.png" alt="logo" width={120} height={120} />
          </div>
        )}
      </div>}

      <nav className="flex-1 mt-4">
        <div
          className={`flex flex-col gap-2 transition-all duration-300 ${isCollapsed ? "pl-0 pr-2" : "pl-2 pr-4"
            }`}
        >
          {routes.map((item) => {
            const active = pathname?.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-300 ${isCollapsed ? "justify-center" : ""
                  } ${active ? "bg-[rgba(13,186,133,0.36)]" : "backdrop-blur-[52px]"
                  }`}
                title={isCollapsed ? item.label : undefined}
              >
                <div
                  className={`flex items-center justify-center p-1.5 rounded-lg transition-all duration-300 ${active
                    ? "backdrop-blur-[14.05px] bg-[rgba(13,186,133,0.3)]"
                    : "backdrop-blur-[14.05px] bg-[rgba(255,255,255,0.12)]"
                    }`}
                >
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 ${active ? "text-white" : "text-white"
                      }`}
                  />
                </div>
                {!isCollapsed && (
                  <span
                    className={`text-sm font-thin leading-5 whitespace-nowrap text-white font-normal`}
                  >
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      <div
        className={`flex flex-col gap-2 transition-all duration-300 ${isCollapsed ? "px-2 pb-3" : "px-4 pb-3"
          }`}
      >
        <Link
          href="/settings"
          className={`flex items-center gap-2 p-2 rounded-lg backdrop-blur-[52px] transition-all duration-300 ${isCollapsed ? "justify-center" : ""
            }`}
          title={isCollapsed ? "Settings" : undefined}
        >
          <div className="backdrop-blur-[14.05px] bg-[rgba(255,255,255,0.12)] flex items-center justify-center p-1.5 rounded-lg">
            <Settings className="w-4 h-4 flex-shrink-0 text-white" />
          </div>
          {!isCollapsed && (
            <span className="text-sm leading-5 text-white font-normal whitespace-nowrap">
              Settings
            </span>
          )}
        </Link>

        <button
          className={`flex items-center gap-2 p-2 rounded-lg backdrop-blur-[52px] transition-all duration-300 w-full cursor-pointer ${isCollapsed ? "justify-center" : ""
            }`}
          title={isCollapsed ? "Log Out" : undefined}
          onClick={handleLogout}
        >
          <div className="backdrop-blur-[14.05px] bg-[rgba(246,63,63,0.45)] flex items-center justify-center p-1.5 rounded-lg" >
            <LogOut className="w-4 h-4 flex-shrink-0 text-white" />
          </div>
          {!isCollapsed && (
            <span className="text-sm leading-5 text-[#f63f3f] font-normal whitespace-nowrap" >
              Log Out
            </span>
          )}
        </button>
      </div>

      <button
        onClick={toggleSidebar}
        className="absolute -right-[10px] top-2/3 -translate-y-1/2 bg-white border-1 border-[#1c1d1d] rounded-[6px] p-[2px] hover:bg-white/90 transition-all duration-300 z-10 cursor-pointer"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <ChevronsRight className="w-4 h-4 text-[#1c1d1d]" />
        ) : (
          <ChevronsLeft className="w-4 h-4 text-[#1c1d1d]" />
        )}
      </button>
    </aside>
  );
}
