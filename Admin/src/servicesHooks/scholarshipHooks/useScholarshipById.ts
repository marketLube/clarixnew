import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";

const fetchScholarshipById = async (id: string) => {
  const { data } = await api.get(`/scholarship/${id}`);
  return data;
};

export const useScholarshipById = (id: string) => {
  return useQuery({
    queryKey: ["scholarship", id],
    queryFn: () => fetchScholarshipById(id),
    enabled: !!id,
  });
};


