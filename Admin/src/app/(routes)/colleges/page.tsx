"use client";

import { AdminHeader } from "@/src/components/common/AdminHeader";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { SectionMatrix } from "@/src/components/ui/SectionMatrix";
import { CollegesList } from "@/src/app/(routes)/colleges/(components)/CollegesList";
import { PlusIcon } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";
import { useColleges } from "@/src/servicesHooks/collegeHooks/useCollege";
import Loader from "@/src/components/common/Loader";



export default function CollegesPage() {
  const router = useRouter();
  const { data, isLoading, error } = useColleges();


  const matrix = data?.data?.matrix;



  return (
    <div className="flex flex-col gap-4">
      <AdminHeader />
      <div className="flex items-center justify-between">
        <SectionHeading
          title="Institutions & Programs"
          description="Manage colleges, courses, and their relationships in one unified interface"
        />
        <Button onClick={() => router.push("/colleges/add")}>
          <PlusIcon className="w-4 h-4" />
          Add College
        </Button>
      </div>
      <SectionMatrix items={matrix as any} />

      <CollegesList />
    </div>
  );
}
