import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface CmsJobsInternshipsHeroSection {
  enabled?: boolean;
  primaryHeadline?: string;
  subHeadline?: string;
}

export interface CmsJobsInternshipsPageData {
  heroSection?: CmsJobsInternshipsHeroSection;
}

interface CmsJobsInternshipsPageResponse {
  success: boolean;
  message: string;
  data?: CmsJobsInternshipsPageData;
}

async function fetchCmsJobsInternshipsPage(): Promise<CmsJobsInternshipsPageData | null> {
  const { data } = await api.get<CmsJobsInternshipsPageResponse>("/cms/jobsinternshipspage");
  return (data?.data as CmsJobsInternshipsPageData) ?? null;
}

export function useCmsJobsInternshipsPage() {
  const query = useQuery<CmsJobsInternshipsPageData | null, Error>({
    queryKey: ["cms-jobsinternshipspage"],
    queryFn: fetchCmsJobsInternshipsPage,
    staleTime: 10 * 60 * 1000,
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
