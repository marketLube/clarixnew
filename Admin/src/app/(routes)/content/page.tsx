"use client";

import { AdminHeader } from "@/src/components/common/AdminHeader";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { SectionMatrix } from "@/src/components/ui/SectionMatrix";
import {
  BarChart3,
  Box,
  Target,
  Activity,
  Clock,
  Briefcase,
} from "lucide-react";
import ContentManagementCard from "./(components)/ContentManagementCard";
import { contentCardsData } from "./(data)/data";

const items = [
  {
    value: 11,
    label: "Published",
    color: "#0dba85",
    icon: BarChart3,
  },
  {
    value: 11,
    label: "Drafts",
    color: "#1e56a0",
    icon: Box,
  },
  {
    value: 12,
    label: "Scheduled",
    color: "#a01e68",
    icon: Clock,
  },
  {
    value: 49,
    label: "Total Versions",
    color: "#ffc107",
    icon: Activity,
  },
];

export default function ContentPage() {
  return (
    <div className="flex flex-col gap-6">
      <AdminHeader />
      <SectionHeading
        title="Content Management"
        description="Manage and publish content across all Clarix Education pages."
      />
      <SectionMatrix items={items} width="100px" />

      <div className="grid grid-cols-2 gap-6">
        {contentCardsData.map((card, index) => (
          <ContentManagementCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
}
