import api from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";

const fetchCMSCollegesPage = async () => {
    const { data } = await api.get("/cms/collegespage");
    return data;
};

export const useCMSCollegesPage = () => {
    return useQuery({
        queryKey: ["cms/collegespage"],
        queryFn: fetchCMSCollegesPage,
    });
};
