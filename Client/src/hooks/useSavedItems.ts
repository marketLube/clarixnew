import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { useSelector } from "react-redux";

export function useSavedItems() {
  const user = useSelector((state: any) => state.auth.user);
  const userId = user?.id || user?._id;
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["savedItems", userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data } = await api.get(`/users/saved/${userId}`);
      return data?.data;
    },
    enabled: !!userId,
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ itemId, itemType }: { itemId: string; itemType: string }) => {
      const { data } = await api.post("/users/saved/toggle", {
        userId,
        itemId,
        itemType,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedItems", userId] });
    },
  });

  return {
    savedItems: query.data || {
      colleges: [],
      courses: [],
      exams: [],
      scholarships: [],
      jobs: [],
    },
    isLoading: query.isLoading,
    isError: query.isError,
    toggleSavedItem: toggleMutation.mutate,
    isToggling: toggleMutation.isPending,
  };
}
