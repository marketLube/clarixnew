import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface CmsBlogHero {
  enabled?: boolean;
  headline?: string;
  subHeadline?: string;
}

export interface CmsBlogFilterItem {
  label?: string;
  value?: string;
}

export interface CmsBlogSearchFilters {
  enabled?: boolean;
  filters?: CmsBlogFilterItem[];
}

export interface CmsBlogNewsletter {
  enabled?: boolean;
  title?: string;
  subHeadline?: string;
  image?: string;
}

export interface CmsBlogPageData {
  hero?: CmsBlogHero;
  searchFilters?: CmsBlogSearchFilters;
  newsletter?: CmsBlogNewsletter;
}

interface CmsBlogPageResponse {
  success: boolean;
  message: string;
  data?: CmsBlogPageData;
}

async function fetchCmsBlogPage(): Promise<CmsBlogPageData | null> {
  const { data } = await api.get<CmsBlogPageResponse>("/cms/blogpage");
  return (data?.data as CmsBlogPageData) ?? null;
}

export function useCmsBlogPage() {
  const query = useQuery<CmsBlogPageData | null, Error>({
    queryKey: ["cms-blogpage"],
    queryFn: fetchCmsBlogPage,
    staleTime: 10 * 60 * 1000,
  });

  return {
    blogPage: query.data,
    hero: query.data?.hero ?? null,
    searchFilters: query.data?.searchFilters ?? null,
    newsletter: query.data?.newsletter ?? null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
