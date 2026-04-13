import api from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";

const fetchCMSExamPage = async () => {
    const { data } = await api.get("/cms/exampage");
    return data;
};

export const useCMSExamPage = () => {
    return useQuery({
        queryKey: ["cms/exampage"],
        queryFn: fetchCMSExamPage,
    });
};
