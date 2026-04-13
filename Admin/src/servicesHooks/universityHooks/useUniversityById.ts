import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";

const fetchUniversityById = async (id: string) => {
  const { data } = await api.get(`/university/${id}`);
  return data;
};

export const useUniversityById = (id: string) => {
  return useQuery({
    queryKey: ["university", id],
    queryFn: () => fetchUniversityById(id),
    enabled: !!id,
  });
};


