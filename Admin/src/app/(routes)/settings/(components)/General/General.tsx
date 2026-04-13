import DataAndPrivacy from "./components/DataAndPrivacy";
import PlatformConfiguration from "./components/PlatformConfiguration";

export default function General() {
    return (
        <div className="flex flex-col gap-3">
            <PlatformConfiguration />
            <DataAndPrivacy />
        </div>
    );
}