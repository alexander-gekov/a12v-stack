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
  const fetchItems = async () => {
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

    const result = await $fetch<ItemsResponse>(
      `/api/items${searchParams.toString() ? `?${searchParams.toString()}` : ""}`
    );
    return result;
  };

  const itemsQuery = useQuery({
    queryKey: ["items", params],
    queryFn: fetchItems,
    enabled: true,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const queryClient = useQueryClient();

  const { mutateAsync: createItem } = useMutation({
    mutationFn: (newItem: CreateItemDTO) =>
      $fetch<Item>("/api/items", {
        method: "POST",
        body: newItem,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const { mutateAsync: updateItem } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateItemDTO }) =>
      $fetch<Item>(`/api/items/${id}`, {
        method: "PATCH",
        body: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const { mutateAsync: deleteItem } = useMutation({
    mutationFn: (id: string) =>
      $fetch<void>(`/api/items/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  return {
    ...itemsQuery,
    data: itemsQuery.data,
    isLoading: itemsQuery.isLoading,
    isPending: itemsQuery.isPending,
    refetch: itemsQuery.refetch,
    createItem,
    updateItem,
    deleteItem,
  };
};
