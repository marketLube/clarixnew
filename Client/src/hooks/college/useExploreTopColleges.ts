import { useState } from "react";
import { useColleges } from "./useColleges";

export type FilterType = "reviews" | "placements" | "fees" | "featured";

export function useExploreTopColleges() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("reviews");

  const { colleges: data, isLoading, error } = useColleges({
    limit: 8,
    search: undefined,
  });

  // Client-side sorting logic
  const sortColleges = (colleges: any[]) => {
    if (!colleges) return colleges;

    return [...colleges].sort((a, b) => {
      switch (activeFilter) {
        case "reviews":
          // Sort by rating (descending)
          return (b.rating || 0) - (a.rating || 0);

        case "placements":
          // Sort by placementPercentage (descending)
          return (Number(b.placementPercentage) || 0) - (Number(a.placementPercentage) || 0);

        case "fees":
          // Sort by avgAnnualFee (ascending)
          // Parse "₹3,636.4" -> 3636.4
          const getFee = (str: string) => {
             if (typeof str === 'number') return str;
             if (!str) return Infinity;
             return parseFloat(str.replace(/[^0-9.]/g, "")) || Infinity;
          };
          return getFee(a.avgAnnualFee) - getFee(b.avgAnnualFee);

        case "featured":
          // Sort by rating (descending)
          return (b.rating || 0) - (a.rating || 0);

        default:
          return 0;
      }
    });
  };

  const sortedColleges = sortColleges(data);
  const colleges = sortedColleges?.slice(0, 4);

  const toggleFilter = (filter: FilterType) => {
    setActiveFilter(filter);
  };


  return {
    colleges,
    isLoading,
    error,
    activeFilter,
    toggleFilter,
  };
}
