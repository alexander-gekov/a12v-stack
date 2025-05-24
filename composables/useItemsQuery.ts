import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import type { Item, CreateItemDTO, UpdateItemDTO } from "../types/item";

interface ItemsResponse {
  items: Item[];
  pageCount: number;
  total: number;
}

interface ItemsQueryParams {
  name?: string;
  status?: string | string[];
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  pageSize?: number;
}

export const useItemsQuery = (params: ItemsQueryParams = {}) => {
  const queryKey = ["items", params] as const;

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () => {
      const searchParams = new URLSearchParams();

      if (params.name) searchParams.set("name", params.name);
      if (params.status) {
        if (Array.isArray(params.status)) {
          params.status.forEach((s) => searchParams.append("status", s));
        } else {
          searchParams.set("status", params.status);
        }
      }
      if (params.sortBy) searchParams.set("sortBy", params.sortBy);
      if (params.sortOrder) searchParams.set("sortOrder", params.sortOrder);
      if (params.page) searchParams.set("page", params.page.toString());
      if (params.pageSize)
        searchParams.set("pageSize", params.pageSize.toString());

      return $fetch<ItemsResponse>(`/api/items?${searchParams.toString()}`);
    },
  });

  const queryClient = useQueryClient();

  const { mutate: createItem } = useMutation({
    mutationFn: (newItem: CreateItemDTO) =>
      $fetch<Item>("/api/items", {
        method: "POST",
        body: newItem,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const { mutate: updateItem } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateItemDTO }) =>
      $fetch<Item>(`/api/items/${id}`, {
        method: "PATCH",
        body: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const { mutate: deleteItem } = useMutation({
    mutationFn: (id: string) =>
      $fetch<void>(`/api/items/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  return {
    data,
    isLoading,
    createItem,
    updateItem,
    deleteItem,
  };
};
