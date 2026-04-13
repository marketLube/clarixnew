import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface CmsAboutHero {
  enabled?: boolean;
  headline?: string;
  subHeadline?: string;
}

export interface CmsAboutThirdSectionCard {
  title?: string;
  description?: string;
  icon?: string;
}

export interface CmsAboutThirdSection {
  enabled?: boolean;
  headline?: string;
  paragraph?: string;
  cards?: CmsAboutThirdSectionCard[];
}

export interface CmsAboutSecondSection {
  enabled?: boolean;
  headline?: string;
  paragraph?: string;
  mission?: string;
  vision?: string;
}

export interface CmsAboutFourthSection {
  enabled?: boolean;
  headline?: string;
  paragraph?: string;
}

export interface CmsAboutKeyStatisticItem {
  label?: string;
  value?: string;
}

export interface CmsAboutKeyStatistics {
  enabled?: boolean;
  stats?: CmsAboutKeyStatisticItem[];
}

export interface CmsAboutPageData {
  hero?: CmsAboutHero;
  secondSection?: CmsAboutSecondSection;
  thirdSection?: CmsAboutThirdSection;
  fourthSection?: CmsAboutFourthSection;
  keyStatistics?: CmsAboutKeyStatistics;
}

interface CmsAboutPageResponse {
  success: boolean;
  message: string;
  data?: CmsAboutPageData;
}

async function fetchCmsAboutPage(): Promise<CmsAboutPageData | null> {
  const { data } = await api.get<CmsAboutPageResponse>("/cms/aboutpage");
  return (data?.data as CmsAboutPageData) ?? null;
}

export function useCmsAboutPage() {
  const query = useQuery<CmsAboutPageData | null, Error>({
    queryKey: ["cms-aboutpage"],
    queryFn: fetchCmsAboutPage,
  });

  return {
    aboutPage: query.data,
    hero: query.data?.hero ?? null,
    secondSection: query.data?.secondSection ?? null,
    thirdSection: query.data?.thirdSection ?? null,
    fourthSection: query.data?.fourthSection ?? null,
    keyStatistics: query.data?.keyStatistics ?? null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
