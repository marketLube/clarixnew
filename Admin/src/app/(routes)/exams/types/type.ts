export interface ExamData {
  id: string;
  name: string;
  description: string;
  type: string;
  conductedBy: string;
  frequency: string;
  nextDate: string;
  registered: string;
  status: "Active" | "Closed" | "Upcoming";
}
