import api from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";

const fetchCMSJobsInternshipsPage = async () => {
    const { data } = await api.get("/cms/jobsinternshipspage");
    return data;
};

export const useCMSJobsInternshipsPage = () => {
    return useQuery({
        queryKey: ["cms/jobsinternshipspage"],
        queryFn: fetchCMSJobsInternshipsPage,
    });
};
