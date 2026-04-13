import { Calendar, FileText, Users } from "lucide-react";

export const MatixItems = [
  {
    value: 245,
    label: "Total Exams",
    change: 12,
    color: "#0dba85",
    icon: FileText,
  },
  {
    value: 156,
    label: "Active Exams",
    change: 8,
    color: "#1e56a0",
    icon: FileText,
  },
  {
    value: "54.1K",
    label: "Registered Students",
    change: 8,
    color: "#a01e68",
    icon: Users,
  },
  {
    value: 32,
    label: "Upcoming",
    change: 8,
    color: "#a01e1e",
    icon: Calendar,
  },
];

export const filterOptions = [
  { label: "All Types", value: "all" },
  { label: "Public", value: "Public" },
  { label: "Private", value: "Private" },
  { label: "Government", value: "Government" },
  { label: "Deemed", value: "Deemed" },
];