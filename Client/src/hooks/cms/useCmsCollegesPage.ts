import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface CmsCollegesHeroSection {
  enabled?: boolean;
  primaryHeadline?: string;
  subHeadline?: string;
}

export interface CmsCollegesPageData {
  heroSection?: CmsCollegesHeroSection;
}

interface CmsCollegesPageResponse {
  success: boolean;
  message: string;
  data?: CmsCollegesPageData;
}

async function fetchCmsCollegesPage(): Promise<CmsCollegesPageData | null> {
  const { data } = await api.get<CmsCollegesPageResponse>("/cms/collegespage");
  return (data?.data as CmsCollegesPageData) ?? null;
}

export function useCmsCollegesPage() {
  const query = useQuery<CmsCollegesPageData | null, Error>({
    queryKey: ["cms-collegespage"],
    queryFn: fetchCmsCollegesPage,
  });

  return {
    pageData: query.data,
    heroSection: query.data?.heroSection ?? null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
