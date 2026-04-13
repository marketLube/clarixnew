import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";

const fetchCourseById = async (id: string) => {
  const { data } = await api.get(`/course/${id}`);
  return data;
};

export const useCourseById = (id: string) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => fetchCourseById(id),
    enabled: !!id,
  });
};

