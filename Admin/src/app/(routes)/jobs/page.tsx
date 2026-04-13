"use client";

import { useState } from "react";
import { AdminHeader } from "@/src/components/common/AdminHeader";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { SectionMatrix } from "@/src/components/ui/SectionMatrix";
import JobList from "./(components)/JobList";
import { Button } from "@/src/components/ui/button";
import { PlusIcon, Briefcase, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useJobs } from "@/src/servicesHooks/jobHooks/useJobs";

export default function JobsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const { data } = useJobs();
  const jobs = data?.data?.jobs || [];
  const totalJobs = data?.data?.pagination?.total || 0;

  const activeJobs = jobs.filter(job => job.isActive).length;
  const internships = jobs.filter(job => job.jobType === 'Internship').length;
  const fullTimeJobs = jobs.filter(job => job.jobType === 'Full Time').length;

  const matrixItems = [
    {
      value: totalJobs,
      label: "Total Jobs",
      color: "#1e56a0",
      icon: Briefcase,
    },
    {
      value: activeJobs,
      label: "Active Postings",
      color: "#0dba85",
      icon: CheckCircle,
    },
    {
      value: internships,
      label: "Internships",
      color: "#a01e68",
      icon: Briefcase,
    },
    {
      value: fullTimeJobs,
      label: "Full Time",
      color: "#ffc107",
      icon: Briefcase,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <AdminHeader />
      <div className="flex justify-between">
        <SectionHeading
          title="Jobs & Internships"
          description="Manage job postings and internship opportunities for students"
        />
        <Button onClick={() => router.push("/jobs/add")}>
          <PlusIcon className="w-4 h-4" />
          Post New Job
        </Button>
      </div>
      <SectionMatrix items={matrixItems} />
      <JobList searchQuery={searchQuery} onSearchChange={setSearchQuery} />
    </div>
  );
}
