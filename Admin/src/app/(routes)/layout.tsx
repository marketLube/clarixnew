"use client";

import { Sidebar } from "@/src/components/common/SIdebar";
import React from "react";
import { usePathname } from "next/navigation";

export default function layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isContentRoute = pathname?.startsWith("/content/") && pathname.length > 9;

  return (
    <div className="h-screen w-full p-4">
      <div className="h-full w-full rounded-2xl flex overflow-hidden">
        <Sidebar />
        <main className={`flex-1 bg-[#F0F9F4] ${isContentRoute ? "p-0" : "p-6"} overflow-y-auto rounded-xl border border-black/10`}>
          {children}
        </main>
      </div>
    </div>
  );
}
