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
import LeftBody from "./(components)/LeftBody";
import Chart from "./(components)/Chart";
import PendingTasks from "./(components)/PendingTasks";

import { useColleges } from "@/src/servicesHooks/collegeHooks/useCollege";
import { useCourses } from "@/src/servicesHooks/courseHooks/useCourse";
import { useScholarships } from "@/src/servicesHooks/scholarshipHooks/useScholarships";
import { useJobs } from "@/src/servicesHooks/jobHooks/useJobs";

export default function DashboardScreen() {
  const { data: collegesData } = useColleges({ limit: 1 });
  const { data: coursesData } = useCourses({ limit: 1 });
  const { data: scholarshipsData } = useScholarships({ status: 'active', limit: 1 });
  const { data: jobsData } = useJobs({ status: 'active', limit: 1 } as any);

  const totalColleges = collegesData?.data?.matrix?.total || collegesData?.data?.pagination?.total || 0;
  const activeCourses = coursesData?.data?.pagination?.total || 0;
  const liveScholarships = scholarshipsData?.data?.pagination?.total || 0;
  const postedJobs = jobsData?.data?.pagination?.total || 0;

  const items = [
    {
      value: totalColleges,
      label: "Total Colleges",
      color: "#0dba85",
      icon: BarChart3,
    },
    {
      value: activeCourses,
      label: "Active Courses",
      color: "#1e56a0",
      icon: Box,
    },
    {
      value: liveScholarships,
      label: "Scholarships Live",
      color: "#ffc107",
      icon: Activity,
    },
    {
      value: postedJobs,
      label: "Jobs Posted",
      color: "#0dba85",
      icon: Briefcase,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <AdminHeader />
      <SectionHeading
        title="Dashboard"
        description="Welcome back! Here's what's happening with Clarix Education today."
      />
      <SectionMatrix items={items} />
      <div className="grid grid-cols-2 gap-6 items-start">
        <LeftBody />
        <div className="flex flex-col bg-white rounded-[18px] shadow-sm ">
          <Chart />
          <PendingTasks />
        </div>
      </div>
    </div>
  );
}
