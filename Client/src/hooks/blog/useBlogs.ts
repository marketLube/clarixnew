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

export interface UseBlogsOptions {
    page?: number;
    limit?: number;
    search?: string;
}

const fetchBlogs = async (opts: UseBlogsOptions) => {
    const params: Record<string, any> = {
        page: opts.page ?? 1,
        limit: opts.limit ?? 12,
    };
    if (opts.search) params.search = opts.search;

    const { data } = await api.get<{ data: BlogListResponse }>("/blog", { params });
    return data.data;
};

export const useBlogs = (opts: UseBlogsOptions = {}) => {
    return useQuery({
        queryKey: ["blogs", opts],
        queryFn: () => fetchBlogs(opts),
        staleTime: 5 * 60 * 1000,
    });
};
