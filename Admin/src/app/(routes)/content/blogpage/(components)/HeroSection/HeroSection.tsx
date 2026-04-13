import Headline from "./(components)/Headline";
import SearchBar from "./(components)/SearchBar";
import Newsletter from "./(components)/Newsletter";
import {
    BlogPageHeroState,
    BlogPageSearchFiltersState,
    BlogPageNewsletterState,
} from "../../types";

interface HeroSectionProps {
    hero: BlogPageHeroState;
    searchFilters: BlogPageSearchFiltersState;
    newsletter: BlogPageNewsletterState;
    onHeroChange: (updates: Partial<BlogPageHeroState>) => void;
    onSearchFiltersChange: (updates: Partial<BlogPageSearchFiltersState>) => void;
    onNewsletterChange: (updates: Partial<BlogPageNewsletterState>) => void;
}

export default function HeroSection({
    hero,
    searchFilters,
    newsletter,
    onHeroChange,
    onSearchFiltersChange,
    onNewsletterChange,
}: HeroSectionProps) {
    return (
        <div className="flex flex-col gap-6">
            <Headline
                enabled={hero.enabled}
                primaryHeadline={hero.headline}
                subHeadline={hero.subHeadline}
                onChange={onHeroChange}
            />
            <SearchBar
                enabled={searchFilters.enabled}
                filters={searchFilters.filters}
                onChange={onSearchFiltersChange}
            />
            <Newsletter
                enabled={newsletter.enabled}
                title={newsletter.title}
                subHeadline={newsletter.subHeadline}
                image={newsletter.image}
                onChange={onNewsletterChange}
            />
        </div>
    );
}
