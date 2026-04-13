import api from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";

const fetchBlog = async (id: string) => {
    const { data } = await api.get(`/blog/${id}`);
    return data;
};

export const useBlog = (id: string | null) => {
    return useQuery({
        queryKey: ["blog", id],
        queryFn: () => fetchBlog(id!),
        enabled: !!id,
    });
};
