"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/common/Button";

type NavigationTab = {
  id: string;
  label: string;
};

const NAV_TABS: NavigationTab[] = [
  { id: "overview", label: "Overview" },
  { id: "courses", label: "Courses" },
  { id: "admission", label: "Admission" },
  { id: "fees", label: "Fees" },
  { id: "placements", label: "Placements" },
  { id: "campus-life", label: "Campus life" },
  { id: "gallery", label: "Gallery" },
  { id: "reviews", label: "Reviews" },
  { id: "faq", label: "FAQ" },
];

export default function NavigationTabs({ college }: any) {
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-100px 0px -80% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    NAV_TABS.forEach((tab) => {
      const element = document.getElementById(tab.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleTabClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Offset for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setActiveTab(id);
  };

  return (
    <div className="hidden lg:block w-full sticky top-0 z-[40] mt-[8rem] p-4 bg-white shadow-[0_1px_4px_0_rgba(0,0,0,0.05)] border-b border-gray-100">
      <div className="flex items-center justify-center gap-3">
        {NAV_TABS.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "primary" : "outline"}
            onClick={() => handleTabClick(tab.id)}
            className="transition-all duration-200"
          >
            {tab.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
