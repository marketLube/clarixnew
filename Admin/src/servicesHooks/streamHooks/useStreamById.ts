import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api";

const fetchStreamById = async (id: string) => {
  const { data } = await api.get(`/stream/${id}`);
  return data;
};

export const useStreamById = (id: string) => {
  return useQuery({
    queryKey: ["stream", id],
    queryFn: () => fetchStreamById(id),
    enabled: !!id,
  });
};


