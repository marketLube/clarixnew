import api from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";

const fetchCMSAboutPage = async () => {
  const { data } = await api.get("/cms/aboutpage");
  return data;
};

export const useCMSAboutPage = () => {
  return useQuery({
    queryKey: ["cms/aboutpage"],
    queryFn: fetchCMSAboutPage,
  });
};
