import Preference from "./components/Preference";
import Rules from "./components/Rules";

export default function Notification() {
    return (
        <div className="flex flex-col gap-3">
            <Preference />
            <Rules />
        </div>
    );
}