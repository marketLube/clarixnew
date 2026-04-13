"use client";

import { AdminHeader } from "@/src/components/common/AdminHeader";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { SectionMatrix } from "@/src/components/ui/SectionMatrix";
import ReviewList from "./components/ReviewList";
import { useReviewStats } from "@/src/servicesHooks/reviewHooks/useReviewStats";
import { Briefcase, CheckCircle, Users, Flag } from "lucide-react";

export default function ReviewsPage() {
  const { data: statsData } = useReviewStats();
  const stats = statsData?.data || { total: 0, pending: 0, approved: 0, rejected: 0 };

  const matrixItems = [
    {
      value: stats.total,
      label: "Total Reviews",
      change: 0,
      color: "#1e56a0",
      icon: Briefcase,
    },
    {
      value: stats.pending,
      label: "Pending Review",
      change: 0,
      color: "#0dba85",
      icon: CheckCircle,
    },
    {
      value: stats.approved,
      label: "Approved",
      change: 0,
      color: "#a01e68",
      icon: Users,
    },
    {
      value: stats.rejected,
      label: "Rejected",
      change: 0,
      color: "#ffc107",
      icon: Flag,
    },
  ];

  return (
    <div className="flex flex-col gap-6 ">
      <AdminHeader />
      <SectionHeading
        title="Student Reviews"
        description="Manage reviews and ratings for colleges and courses"
      />
      <SectionMatrix items={matrixItems} />
      <ReviewList />
    </div>
  );
}