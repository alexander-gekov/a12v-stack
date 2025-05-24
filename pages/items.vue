<script setup lang="ts">
import { LucidePlus } from "lucide-vue-next";
import { columns } from "../components/items/columns";
import type { Item } from "../types/item";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
  FlexRender,
  type SortingState,
  type PaginationState,
  type RowSelectionState,
} from "@tanstack/vue-table";

definePageMeta({
  title: "Items",
  layout: "default",
});

const sorting = ref<SortingState>([{ id: "createdAt", desc: true }]);
const nameFilter = ref("");
const statusFilter = ref<string[]>([]);
const pagination = ref<PaginationState>({
  pageIndex: 0,
  pageSize: 10,
});

const queryParams = computed(() => ({
  name: nameFilter.value,
  status: statusFilter.value,
  sortBy: sorting.value[0]?.id,
  sortOrder: sorting.value[0]?.desc ? ("desc" as const) : ("asc" as const),
  page: pagination.value.pageIndex + 1,
  pageSize: pagination.value.pageSize,
}));

const query = useItemsQuery(unref(queryParams));

const items = computed(() => query.data?.value?.items ?? []);
const pageCount = computed(() => query.data?.value?.pageCount ?? 0);
const total = computed(() => query.data?.value?.total ?? 0);

const table = useVueTable({
  get data() {
    return items.value;
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  onRowSelectionChange: () => {},
  manualPagination: true,
  manualSorting: true,
  manualFiltering: true,
  pageCount: unref(pageCount),
  state: {
    get sorting() {
      return sorting.value;
    },
    get pagination() {
      return pagination.value;
    },
  },
  onSortingChange: (updater) => {
    const newSorting =
      typeof updater === "function" ? updater(sorting.value) : updater;
    sorting.value = newSorting;
  },
  onPaginationChange: (updater) => {
    const newPagination =
      typeof updater === "function" ? updater(pagination.value) : updater;
    pagination.value = newPagination;
  },
});

const isCreating = ref(false);
const newItemForm = ref({
  name: "",
  description: "",
  status: "draft" as const,
});

const handleCreateItem = async () => {
  await query.createItem(newItemForm.value);
  isCreating.value = false;
  newItemForm.value = {
    name: "",
    description: "",
    status: "draft",
  };
};

const statusOptions = [
  { label: "Draft", value: "draft" },
  { label: "Published", value: "published" },
  { label: "Archived", value: "archived" },
];

const handleSelectionChange = (selection: RowSelectionState) => {
  // Do something with the selected rows
  console.log("Selected rows:", selection);
};
</script>

<template>
  <PageHeader title="Items" description="Manage your items and their statuses.">
    <template #action>
      <div class="flex items-center gap-4">
        <DataTableViewOptions :table="table" />
      </div>
    </template>
  </PageHeader>

  <PageContent>
    <div class="space-y-4">
      <div class="flex items-center gap-2">
        <Input
          placeholder="Filter items..."
          class="max-w-sm"
          v-model="nameFilter"
        />
        <DataTableFacetedFilter
          :table="table"
          :options="statusOptions"
          title="Status"
          column="status"
          v-model="statusFilter"
        />
      </div>

      <GenericDataTable
        :columns="columns"
        :data="items"
        :is-pending="unref(query.isLoading)"
        :page-count="unref(pageCount)"
        :enable-row-selection="true"
        :enable-multi-row-selection="true"
        @pagination-change="(p) => (pagination = p)"
        @row-selection-change="handleSelectionChange"
      >
        <template #filters>
          <DataTableFacetedFilter
            :table="table"
            :options="statusOptions"
            title="Status"
            column="status"
            v-model="statusFilter"
          />
        </template>

        <template #add-button>
          <Button
            variant="ghost"
            class="h-8 -my-2 w-full justify-start rounded-none hover:bg-muted/50 text-muted-foreground"
            @click="isCreating = true"
            v-if="!isCreating"
          >
            <LucidePlus class="mr-2 h-4 w-4" />
            New item
          </Button>
        </template>

        <template #new-row="{ columns }">
          <TableRow v-if="isCreating">
            <TableCell class="w-12">
              <Checkbox disabled />
            </TableCell>
            <TableCell>
              <Input v-model="newItemForm.name" placeholder="Item name" />
            </TableCell>
            <TableCell>
              <Input
                v-model="newItemForm.description"
                placeholder="Description"
              />
            </TableCell>
            <TableCell>
              <Select v-model="newItemForm.status">
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    v-for="option in statusOptions"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>-</TableCell>
            <TableCell>
              <div class="flex items-center gap-2">
                <Button size="sm" @click="handleCreateItem">Save</Button>
                <Button size="sm" variant="ghost" @click="isCreating = false"
                  >Cancel</Button
                >
              </div>
            </TableCell>
          </TableRow>
        </template>
      </GenericDataTable>
    </div>
  </PageContent>
</template>
