import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";

const fetchRecruiterById = async (id: string) => {
  const { data } = await api.get(`/recruiter/${id}`);
  return data;
};

export const useRecruiterById = (id: string) => {
  return useQuery({
    queryKey: ["recruiter", id],
    queryFn: () => fetchRecruiterById(id),
    enabled: !!id,
  });
};


