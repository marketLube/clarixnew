import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface CmsExamHeroSection {
  enabled?: boolean;
  primaryHeadline?: string;
  subHeadline?: string;
}

export interface CmsExamPageData {
  heroSection?: CmsExamHeroSection;
}

interface CmsExamPageResponse {
  success: boolean;
  message: string;
  data?: CmsExamPageData;
}

async function fetchCmsExamPage(): Promise<CmsExamPageData | null> {
  const { data } = await api.get<CmsExamPageResponse>("/cms/exampage");
  return (data?.data as CmsExamPageData) ?? null;
}

export function useCmsExamPage() {
  const query = useQuery<CmsExamPageData | null, Error>({
    queryKey: ["cms-exampage"],
    queryFn: fetchCmsExamPage,
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
