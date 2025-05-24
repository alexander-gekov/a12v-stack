import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import type { Item, CreateItemDTO, UpdateItemDTO } from "../types/item";

export const useItemsQuery = () => {
  const queryKey = ["items"] as const;

  const { data: items, isLoading } = useQuery({
    queryKey,
    queryFn: () => $fetch<Item[]>("/api/items"),
  });

  const queryClient = useQueryClient();

  const { mutate: createItem } = useMutation({
    mutationFn: (newItem: CreateItemDTO) =>
      $fetch<Item>("/api/items", {
        method: "POST",
        body: newItem,
      }),
    onSuccess: (createdItem) => {
      queryClient.setQueryData<Item[]>(queryKey, (old) =>
        old ? [...old, createdItem] : [createdItem]
      );
    },
  });

  const { mutate: updateItem } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateItemDTO }) =>
      $fetch<Item>(`/api/items/${id}`, {
        method: "PATCH",
        body: data,
      }),
    onSuccess: (updatedItem) => {
      queryClient.setQueryData<Item[]>(
        queryKey,
        (old) =>
          old?.map((item) =>
            item.id === updatedItem.id ? updatedItem : item
          ) ?? []
      );
    },
  });

  const { mutate: deleteItem } = useMutation({
    mutationFn: (id: string) =>
      $fetch<void>(`/api/items/${id}`, {
        method: "DELETE",
      }),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<Item[]>(
        queryKey,
        (old) => old?.filter((item) => item.id !== deletedId) ?? []
      );
    },
  });

  return {
    items,
    isLoading,
    createItem,
    updateItem,
    deleteItem,
  };
};
