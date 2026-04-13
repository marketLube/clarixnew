export interface College {
    _id: string;
    name: string;
    location: string;
    type: string;
    status: string;
    courses: number;
    students: number;
    rating: number;
    image: string;
}

export interface CollegeListItemProps {
    college: any;
    isSelected: boolean;
    onToggleSelection: (id: string) => void;
    showDivider: boolean;
    onDelete?: (id: string) => void;
}

export type FormActionFooterProps = {
    onBack?: () => void;
    onNext?: () => void;
    isFirstTab?: boolean;
    isLastTab?: boolean;
    isLoading?: boolean;
};


export interface CourseData {
    _id: string;
    name: string;
}


export type TimelineFieldProps = {
    id: string;
    name: string;
    placeholder: string;
};