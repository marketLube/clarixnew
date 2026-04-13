import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface CmsFooterNewsletter {
  enabled?: boolean;
  primaryHeadline?: string;
  subHeadline?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
}

export interface CmsFooterData {
  enabled?: boolean;
  primaryHeadline?: string;
  subHeadline?: string;
  locationLink?: string;
  contactNumber?: string;
  email?: string;
  newsletter?: CmsFooterNewsletter;
  exploreColleges?: any[];
  courses?: any[];
  exams?: any[];
  admissions?: any[];
  scholarships?: any[];
  about?: any[];
}

interface CmsFooterResponse {
  success: boolean;
  message: string;
  data?: CmsFooterData;
}

async function fetchCmsFooter(): Promise<CmsFooterData | null> {
  const { data } = await api.get<CmsFooterResponse>("/cms/footer");
  return (data?.data as CmsFooterData) ?? null;
}

export function useCmsFooter() {
  const query = useQuery<CmsFooterData | null, Error>({
    queryKey: ["cms-footer"],
    queryFn: fetchCmsFooter,
  });

  return {
    footer: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
