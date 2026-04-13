import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface CmsCoursesHeroSection {
  enabled?: boolean;
  primaryHeadline?: string;
  subHeadline?: string;
}

export interface CmsCoursesPageData {
  heroSection?: CmsCoursesHeroSection;
}

interface CmsCoursesPageResponse {
  success: boolean;
  message: string;
  data?: CmsCoursesPageData;
}

async function fetchCmsCoursesPage(): Promise<CmsCoursesPageData | null> {
  const { data } = await api.get<CmsCoursesPageResponse>("/cms/coursespage");
  return (data?.data as CmsCoursesPageData) ?? null;
}

export function useCmsCoursesPage() {
  const query = useQuery<CmsCoursesPageData | null, Error>({
    queryKey: ["cms-coursespage"],
    queryFn: fetchCmsCoursesPage,
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
