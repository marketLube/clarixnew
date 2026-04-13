"use client";

import ExploreCollege from "./components/ExploreCollege";
import StayUpdated from "./components/StayUpdated";
import StudentStories from "./components/StudentStories";
import Blogs from "./components/Blogs";
import { HomePageState } from "../../types";

interface ContentBlockProps {
    data: HomePageState;
    updateContentBlocksData: (updates: Partial<HomePageState['contentBlocks']>) => void;
}

export default function ContentBlock({ data, updateContentBlocksData }: ContentBlockProps) {
    const contentBlocksData = data?.contentBlocks || {};

    const handleUpdate = (updates: Partial<HomePageState['contentBlocks']>) => {
        updateContentBlocksData({ ...contentBlocksData, ...updates });
    };

    return (
        <div className="flex flex-col gap-6">
            <ExploreCollege
                data={contentBlocksData}
                updateData={handleUpdate}
            />
            <StayUpdated
                data={contentBlocksData}
                updateData={handleUpdate}
            />
            <StudentStories
                data={contentBlocksData}
                updateData={handleUpdate}
            />
            <Blogs
                data={contentBlocksData}
                updateData={handleUpdate}
            />
        </div>
    )
}