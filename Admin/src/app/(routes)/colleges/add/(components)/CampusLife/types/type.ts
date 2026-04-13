export default interface CampusLifeItemType {
    id?: string;
    title: string;
    description: string;
    verified: boolean;
    tags: string[];
    image: string;
    imageFile?: File | null;
    source: string;
    isActive: boolean;
}