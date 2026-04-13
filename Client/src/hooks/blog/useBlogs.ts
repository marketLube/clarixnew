import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface Blog {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    thumbnail: string;
    status: "Draft" | "Published";
    tags: string[];
    views: number;
    date?: string;
    readTime?: string;
    category?: string;
    createdAt: string;
    updatedAt: string;
}

interface BlogListResponse {
    blogs: Blog[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

const fetchBlogs = async (search?: string) => {
    const { data } = await api.get<{ data: BlogListResponse }>("/blog", {
        params: { search }
    });
    return data.data;
};

export const useBlogs = (search?: string) => {
    return useQuery({
        queryKey: ["blogs", search],
        queryFn: () => fetchBlogs(search),
    });
};
