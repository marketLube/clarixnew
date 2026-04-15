import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { Blog } from "@/hooks/blog/useBlogs";

const fetchBlogById = async (id: string) => {
    const { data } = await api.get<{ data: Blog }>(`/blog/${id}`);
    return data.data;
};

export const useBlog = (id: string) => {
    return useQuery({
        queryKey: ["blog", id],
        queryFn: () => fetchBlogById(id),
        enabled: !!id,
        staleTime: 30 * 60 * 1000,
    });
};
