import api from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";

const fetchCMSFooter = async () => {
  const { data } = await api.get("/cms/footer");
  return data;
};

export const useCMSFooter = () => {
  return useQuery({
    queryKey: ["cms/footer"],
    queryFn: fetchCMSFooter,
  });
};
