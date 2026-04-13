import api from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";

const fetchBlogs = async () => {
    const { data } = await api.get("/blog", {
        params: {
            page: 1,
            limit: 50,
        },
    });
    return data;
};

export const useBlogs = () => {
    return useQuery({
        queryKey: ["blogs"],
        queryFn: fetchBlogs,
    });
};
