import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface CmsCareerHeroSection {
  enabled?: boolean;
  primaryHeadline?: string;
  subHeadline?: string;
}

export interface CmsCareerSecondSectionImage {
  url?: string;
  alt?: string;
}

export interface CmsCareerSecondSection {
  enabled?: boolean;
  primaryHeadline?: string;
  paragraph?: string;
  images?: CmsCareerSecondSectionImage[];
}

export type CmsCareerJobType =
  | "Full Time"
  | "Part Time"
  | "Internship"
  | "Contract"
  | "Freelance";

export interface CmsCareerJob {
  enabled?: boolean;
  jobTitle?: string;
  companyName?: string;
  jobType?: CmsCareerJobType;
  location?: string;
  companyWebsite?: string;
  aboutJob?: string;
  aboutYou?: string[];
}

export interface CmsCareerThirdSection {
  enabled?: boolean;
  primaryHeadline?: string;
  subHeadline?: string;
  jobCategories?: string[];
}

export interface CmsCareerPageData {
  heroSection?: CmsCareerHeroSection;
  secondSection?: CmsCareerSecondSection;
  thirdSection?: CmsCareerThirdSection;
  jobs?: CmsCareerJob[];
}

interface CmsCareerPageResponse {
  success: boolean;
  message: string;
  data?: CmsCareerPageData;
}

async function fetchCmsCareerPage(): Promise<CmsCareerPageData | null> {
  const { data } = await api.get<CmsCareerPageResponse>("/cms/careerpage");
  return (data?.data as CmsCareerPageData) ?? null;
}

export function useCmsCareerPage() {
  const query = useQuery<CmsCareerPageData | null, Error>({
    queryKey: ["cms-careerpage"],
    queryFn: fetchCmsCareerPage,
  });

  return {
    careerPage: query.data,
    heroSection: query.data?.heroSection ?? null,
    secondSection: query.data?.secondSection ?? null,
    thirdSection: query.data?.thirdSection ?? null,
    jobs: query.data?.jobs ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
