import api from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";

const fetchCMSHomePage = async () => {
    const { data } = await api.get("/cms/homepage");
    return data;
};

export const useCMSHomePage = () => {
    return useQuery({
        queryKey: ["cms/homepage"],
        queryFn: fetchCMSHomePage,
    });
};