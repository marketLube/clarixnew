"use client";

import { useState } from "react";
import { AdminHeader } from "@/src/components/common/AdminHeader";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { SectionMatrix } from "@/src/components/ui/SectionMatrix";
import { DataTable, Column } from "@/src/components/ui/DataTable";
import { Filter } from "@/src/components/ui/Filter";
import {
  Calendar as CalendarIcon,
  PlusIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { filterOptions, MatixItems } from "./data/data";
import { Button } from "@/src/components/ui/button";
import { ActionMenu } from "@/src/components/common/ActionMenu";
import { Eye, Pencil, Trash2, Upload, Ban, FileText, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { StatusBadge } from "@/src/components/common/StatusBadge";
import { AddExamDrawer } from "./components/AddExamDrawer";
import { ViewExamDrawer } from "./components/ViewExamDrawer";
import { EditExamDrawer } from "./components/EditExamDrawer";
import { useExams } from "@/src/servicesHooks/examHooks/useExams";
import { useDeleteExam } from "@/src/servicesHooks/examHooks/useDeleteExam";
import { Exam } from "@/src/servicesHooks/examHooks/types/examHooksType";
import { format } from "date-fns";
import { toast } from "sonner";
import Loader from "@/src/components/common/Loader";

interface ExamTableData {
  id: string;
  _id: string;
  name: string;
  shortName: string;
  examDate: string;
  collegesAccepting: string;
  stream?: string;
  status: "Active" | "Closed" | "Upcoming";
}

export default function ExamsPage() {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewExamId, setViewExamId] = useState<string | null>(null);
  const [editExamId, setEditExamId] = useState<string | null>(null);

  const { data, isLoading, refetch } = useExams({ search: searchQuery });
  const { deleteExam, isPending: isDeleting } = useDeleteExam();

  const exams = data?.data?.exams || [];
  const pagination = data?.data?.pagination;

  // Transform exams data to table format
  const tableData: ExamTableData[] = exams.map((exam: Exam) => {
    const examDate = new Date(exam.examDate);
    const today = new Date();

    let status: "Active" | "Closed" | "Upcoming";
    if (examDate < today) {
      status = "Closed";
    } else if (exam.isActive) {
      status = "Active";
    } else {
      status = "Upcoming";
    }

    return {
      id: exam._id, // DataTable requires 'id' field
      _id: exam._id,
      name: exam.fullName,
      shortName: exam.shortName,
      examDate: format(new Date(exam.examDate), "MMM dd, yyyy"),
      collegesAccepting: exam.collegesAccepting.toString(),
      stream: (exam as any).stream,
      status,
    };
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this exam?")) {
      deleteExam(id, {
        onSuccess: () => {
          refetch();
        },
      });
    }
  };

  // Calculate stats
  const totalExams = pagination?.total || 0;
  const activeExams = tableData.filter(e => e.status === "Active").length;
  const upcomingExams = tableData.filter(e => e.status === "Upcoming").length;

  const updatedMatrixItems = [
    {
      label: "Total Exams",
      value: totalExams,
    },
    {
      label: "Active Exams",
      value: activeExams,
    },
    {
      label: "Upcoming Exams",
      value: upcomingExams,
    },
  ];

  const columns: Column<ExamTableData>[] = [
    {
      header: "Exam Name",
      accessorKey: "name",
      subKey: "shortName",
    },
    {
      header: "Exam Date",
      render: (_, item) => (
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-gray-300" />
          {item.examDate}
        </div>
      ),
    },
    {
      header: "Colleges Accepting",
      accessorKey: "collegesAccepting",
    },
    {
      header: "Stream",
      accessorKey: "stream",
    },
    {
      header: "Status",
      accessorKey: "status",
      render: (status: string) => <StatusBadge status={status} />,
    },
  ];

  const handleView = (exam: ExamTableData) => {
    setViewExamId(exam._id);
  };

  const handleEdit = (exam: ExamTableData) => {
    setEditExamId(exam._id);
  };

  return (
    <div className="flex flex-col gap-6">
      <AdminHeader />
      <div className="flex justify-between">
        <SectionHeading
          title="Entrance Exams"
          description="Manage entrance exams, eligibility criteria, and admission schedules"
        />
        <Button onClick={() => setIsDrawerOpen(true)}>
          <PlusIcon className="w-4 h-4" />
          Add Exam
        </Button>
      </div>
      <SectionMatrix items={updatedMatrixItems} />

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <Loader size="md" />
          <span className="text-gray-600">Loading exams...</span>
        </div>
      ) : (
        <DataTable
          columns={[
            ...columns,
            {
              header: "Actions",
              render: (_value, item) => (
                <ActionMenu
                  trigger={
                    <button className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full transition-colors">
                      <MoreVertical className="w-4 h-4 text-[#364440]" />
                    </button>
                  }
                  items={[
                    { label: "View", icon: Eye, onClick: () => handleView(item) },
                    { label: "Edit", icon: Pencil, onClick: () => handleEdit(item) },
                    {
                      label: "Delete",
                      icon: Trash2,
                      danger: true,
                      onClick: () => handleDelete(item._id),
                    },
                  ]}
                />
              ),
              className: "text-right",
              headerClassName: "text-right",
            },
          ]}
          data={tableData}
          searchPlaceholder="Search exams..."
          onSearchChange={setSearchQuery}
          filters={
            <Filter
              options={filterOptions}
            />
          }
        />
      )}
      <AddExamDrawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
      />
      <ViewExamDrawer
        open={viewExamId !== null}
        onOpenChange={(open) => !open && setViewExamId(null)}
        examId={viewExamId}
      />
      <EditExamDrawer
        open={editExamId !== null}
        onOpenChange={(open) => !open && setEditExamId(null)}
        examId={editExamId}
      />
    </div>
  );
}