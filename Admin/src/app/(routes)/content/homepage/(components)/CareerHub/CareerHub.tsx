"use client";

import CareerSection from "./components/CareerSection";
import BackgroundImageSection from "./components/BackgroundImageSection";
import Companylogo from "./components/Companylogo";
import { HomePageState } from "../../types";

interface CareerHubProps {
    data: HomePageState;
    updateCareerHubData: (updates: Partial<HomePageState['careerHub']>) => void;
}

export default function CareerHub({ data, updateCareerHubData }: CareerHubProps) {
    return (
        <div className="flex flex-col gap-6">
            <CareerSection
                data={data?.careerHub || {}}
                updateData={(updates: Partial<HomePageState['careerHub']>) => updateCareerHubData({ ...data?.careerHub || {}, ...updates })}
            />
            <BackgroundImageSection
                data={data?.careerHub || {}}
                updateData={(updates: Partial<HomePageState['careerHub']>) => updateCareerHubData({ ...data?.careerHub || {}, ...updates })}
            />
            <Companylogo
                data={data?.careerHub || {}}
                updateData={(updates: Partial<HomePageState['careerHub']>) => updateCareerHubData({ ...data?.careerHub || {}, ...updates })}
            />
        </div>
    )
}
