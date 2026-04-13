import api from "@/src/lib/api";
import { useQuery } from "@tanstack/react-query";

const fetchCMSCoursesPage = async () => {
    const { data } = await api.get("/cms/coursespage");
    return data;
};

export const useCMSCoursesPage = () => {
    return useQuery({
        queryKey: ["cms/coursespage"],
        queryFn: fetchCMSCoursesPage,
    });
};
