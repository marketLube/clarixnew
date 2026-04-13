import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";

const fetchExamById = async (id: string) => {
  const { data } = await api.get(`/exam/${id}`);
  return data;
};

export const useExamById = (id: string) => {
  return useQuery({
    queryKey: ["exam", id],
    queryFn: () => fetchExamById(id),
    enabled: !!id,
  });
};


