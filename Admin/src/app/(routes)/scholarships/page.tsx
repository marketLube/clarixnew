"use client";

import { useState } from "react";
import { AdminHeader } from "@/src/components/common/AdminHeader";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { SectionMatrix } from "@/src/components/ui/SectionMatrix";
import { DataTable, Column } from "@/src/components/ui/DataTable";
import { Filter } from "@/src/components/ui/Filter";
import {
  Calendar as CalendarIcon,
  Eye, Pencil, Trash2, MoreVertical,
  PlusIcon,
} from "lucide-react";
import { ActionMenu } from "@/src/components/common/ActionMenu";
import { StatusBadge } from "@/src/components/common/StatusBadge";
import { Button } from "@/src/components/ui/button";
import { AddScholarshipDrawer } from "./components/AddScholarshipDrawer";
import { ViewScholarshipDrawer } from "./components/ViewScholarshipDrawer";
import { EditScholarshipDrawer } from "./components/EditScholarshipDrawer";
import { useScholarships } from "@/src/servicesHooks/scholarshipHooks/useScholarships";
import { useDeleteScholarship } from "@/src/servicesHooks/scholarshipHooks/useDeleteScholarship";
import { Scholarship } from "@/src/servicesHooks/scholarshipHooks/types/scholarshipHooksType";
import { format } from "date-fns";
import { toast } from "sonner";
import Loader from "@/src/components/common/Loader";

interface ScholarshipTableData {
  id: string;
  _id: string;
  name: string;
  type: string;
  fundingType: string;
  amount: string;
  deadline: string;
  status: "Active" | "Closed" | "Upcoming";
}

export default function ScholarshipsPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewScholarshipId, setViewScholarshipId] = useState<string | null>(null);
  const [editScholarshipId, setEditScholarshipId] = useState<string | null>(null);

  const { data, isLoading, refetch } = useScholarships({
    search: searchQuery,
    limit: 10,
    page: 1,
  });
  const { deleteScholarship, isPending: isDeleting } = useDeleteScholarship();

  const scholarships = data?.data?.scholarships || [];
  const pagination = data?.data?.pagination;

  // Transform scholarships data to table format
  const tableData: ScholarshipTableData[] = scholarships.map((scholarship: Scholarship) => {
    const deadline = new Date(scholarship.deadline);
    const today = new Date();

    let status: "Active" | "Closed" | "Upcoming";
    if (deadline < today) {
      status = "Closed";
    } else if (scholarship.isActive) {
      status = "Active";
    } else {
      status = "Upcoming";
    }

    return {
      id: scholarship._id, // DataTable requires 'id' field
      _id: scholarship._id,
      name: scholarship.scholarshipName,
      type: scholarship.scholarshipType,
      fundingType: scholarship.fundingType,
      amount: `₹${scholarship.totalFundingAmount.toLocaleString()}`,
      deadline: format(new Date(scholarship.deadline), "MMM dd, yyyy"),
      status,
    };
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this scholarship?")) {
      deleteScholarship(id, {
        onSuccess: () => {
          refetch();
        },
      });
    }
  };

  // Calculate stats
  const totalScholarships = pagination?.total || 0;
  const activeScholarships = tableData.filter(s => s.status === "Active").length;
  const closedScholarships = tableData.filter(s => s.status === "Closed").length;

  const updatedMatrixItems = [
    {
      label: "Total Scholarships",
      value: totalScholarships,
    },
    {
      label: "Active Scholarships",
      value: activeScholarships,
    },
    {
      label: "Closed Scholarships",
      value: closedScholarships,
    },
  ];

  const columns: Column<ScholarshipTableData>[] = [
    {
      header: "Scholarship Name",
      accessorKey: "name",
      subKey: "type",
    },
    {
      header: "Funding Type",
      accessorKey: "fundingType",
    },
    {
      header: "Amount",
      accessorKey: "amount",
    },
    {
      header: "Deadline",
      render: (_, item) => (
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-gray-300" />
          {item.deadline}
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      render: (status: string) => <StatusBadge status={status} />,
    },
  ];

  const handleView = (row: ScholarshipTableData) => {
    setViewScholarshipId(row._id);
  };

  const handleEdit = (row: ScholarshipTableData) => {
    setEditScholarshipId(row._id);
  };

  return (
    <div className="flex flex-col gap-6">
      <AdminHeader />
      <div className="flex justify-between">
        <SectionHeading
          title="Scholarships"
          description="Manage scholarship opportunities for students"
        />
        <Button onClick={() => setIsDrawerOpen(true)}>
          <PlusIcon className="w-4 h-4" />
          Add New Scholarship
        </Button>
      </div>
      <SectionMatrix items={updatedMatrixItems} />

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <Loader size="md" />
          <span className="text-gray-600">Loading scholarships...</span>
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
          searchPlaceholder="Search scholarships..."
          onSearchChange={setSearchQuery}
          filters={
            <Filter
              options={[
                { label: "All Status", value: "all" },
                { label: "Active", value: "active" },
                { label: "Closed", value: "closed" },
                { label: "Upcoming", value: "upcoming" },
              ]}
            />
          }
        />
      )}
      <AddScholarshipDrawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
      />
      <ViewScholarshipDrawer
        open={viewScholarshipId !== null}
        onOpenChange={(open) => !open && setViewScholarshipId(null)}
        scholarshipId={viewScholarshipId}
      />
      <EditScholarshipDrawer
        open={editScholarshipId !== null}
        onOpenChange={(open) => !open && setEditScholarshipId(null)}
        scholarshipId={editScholarshipId}
      />
    </div>
  );
}