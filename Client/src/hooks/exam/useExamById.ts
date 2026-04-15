import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface ExamDetail {
  _id: string;
  shortName: string;
  fullName: string;
  registrationDate: string;
  examDate: string;
  resultPublishDate: string;
  qualificationRequired: string[];
  collegesAccepting: number;
  officialWebsite: string;
  description: string;
  isActive: boolean;
  logo: string;
  stream?: {
    _id: string;
    name: string;
  };
}

async function fetchExamById(id: string): Promise<ExamDetail> {
  const { data } = await api.get(`/exam/${id}`);
  return data?.data;
}

export function useExamById(id: string) {
  const query = useQuery({
    queryKey: ["exams", id],
    queryFn: () => fetchExamById(id),
    enabled: !!id,
    staleTime: 30 * 60 * 1000,
  });

  return {
    exam: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
