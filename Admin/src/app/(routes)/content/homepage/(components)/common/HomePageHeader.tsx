import { PageHeader } from "@/src/components/common/PageHeader";

interface HomePageHeaderProps {
    onPublish?: () => void;
}

export function HomePageHeader({ onPublish }: HomePageHeaderProps) {
    return <PageHeader title="Home Page" onPublish={onPublish} />;
}

