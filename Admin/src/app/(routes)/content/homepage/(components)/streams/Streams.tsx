"use client";

import StreamDetails from "./components/StreamDetails";
import { HomePageState } from "../../types";

interface StreamsProps {
    data: HomePageState;
    updateStreamsData: (updates: Partial<HomePageState['streams']>) => void;
}

export default function Streams({ data, updateStreamsData }: StreamsProps) {
    return (
        <div className="flex flex-col gap-6">
            <StreamDetails
                data={data.streams}
                updateData={(updates) => updateStreamsData({ ...data.streams, ...updates })}
            />
        </div>
    );
}