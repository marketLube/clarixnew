import api from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";

const fetchCMSBlogPage = async () => {
    const { data } = await api.get("/cms/blogpage");
    return data;
};

export const useCMSBlogPage = () => {
    return useQuery({
        queryKey: ["cms/blogpage"],
        queryFn: fetchCMSBlogPage,
    });
};
