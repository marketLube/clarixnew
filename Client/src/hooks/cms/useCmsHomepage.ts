import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface CmsHomepageHero {
  enabled?: boolean;
  headline?: string;
  subHeadline?: string;
  paragraph?: string;
  PrimaryCtaText?: string;
  PrimaryCtaLink?: string;
  SecondaryCtaText?: string;
  SecondaryCtaLink?: string;
  images?: string[];
  popularSearches?: string[];
}

export interface CmsHomepageContentBlock {
  title?: string;
  description?: string;
  image?: string;
  sectionKey?: string;
}

export interface CmsHomepageContentBlocksSection {
  enabled?: boolean;
  blocks?: CmsHomepageContentBlock[];
}

export interface CmsHomepageCareerHub {
  enabled?: boolean;
  title?: string;
  paragraph?: string;
  images?: string[];
  logo?: string[];
}

export interface CmsHomepageFaqItem {
  question?: string;
  answer?: string;
}

export interface CmsHomepageFaqSection {
  enabled?: boolean;
  title?: string;
  paragraph?: string;
  items?: CmsHomepageFaqItem[];
}

export interface CmsHomepageData {
  hero?: CmsHomepageHero;
  streams?: {
    enabled?: boolean;
    title?: string;
    paragraph?: string;
    items?: Array<{
      name?: string;
      icon?: string;
    }>;
  };
  contentBlocks?: CmsHomepageContentBlocksSection;
  careerHub?: CmsHomepageCareerHub;
  location?: {
    enabled?: boolean;
    title?: string;
    items?: Array<{
      name?: string;
      slug?: string;
      image?: string;
      isActive?: boolean;
    }>;
  };
  faq?: CmsHomepageFaqSection;
}

interface CmsHomepageResponse {
  success: boolean;
  message: string;
  data?: CmsHomepageData;
}

async function fetchCmsHomepage(): Promise<CmsHomepageData | null> {
  const { data } = await api.get<CmsHomepageResponse>("/cms/homepage");
  return (data?.data as CmsHomepageData) ?? null;
}

export function useCmsHomepage() {
  const query = useQuery<CmsHomepageData | null, Error>({
    queryKey: ["cms-homepage"],
    queryFn: fetchCmsHomepage,
  });

  const heroImages = (query.data?.hero?.images ?? []).filter(Boolean);

  return {
    homePage: query.data,
    hero: query.data?.hero ?? null,
    streams: query.data?.streams ?? null,
    contentBlocks: query.data?.contentBlocks ?? null,
    heroImages,
    careerHub: query.data?.careerHub ?? null,
    location: query.data?.location ?? null,
    faq: query.data?.faq ?? null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
