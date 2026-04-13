import api from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";

const fetchCMSCareersPage = async () => {
  const { data } = await api.get("/cms/careerpage");
  return data;
};

export const useCMSCareersPage = () => {
  return useQuery({
    queryKey: ["cms/careerpage"],
    queryFn: fetchCMSCareersPage,
  });
};
