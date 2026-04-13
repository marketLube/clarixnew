import BackgroundMedia from "./components/BackgroundMedia";
import CallActionButton from "./components/CallActionButton";
import Headlines from "./components/Headlines";
import { HomePageState } from "../../types";

interface HeroProps {
    data: HomePageState;
    updateHeroData: (updates: Partial<HomePageState['hero']>) => void;
}

export default function Hero({ data, updateHeroData }: HeroProps) {
    return (
        <div className="flex flex-col gap-6">
            <Headlines
                data={data?.hero?.headlines || {}}
                updateData={(updates) => updateHeroData({ headlines: { ...data?.hero?.headlines || {}, ...updates } })}
            />
            <CallActionButton
                data={data?.hero?.cta || {}}
                updateData={(updates) => updateHeroData({ cta: { ...data?.hero?.cta || {}, ...updates } })}
            />
            <BackgroundMedia
                data={data?.hero?.backgroundMedia || {}}
                updateData={(updates) => updateHeroData({ backgroundMedia: { ...data?.hero?.backgroundMedia || {}, ...updates } })}
            />
        </div>
    );
}