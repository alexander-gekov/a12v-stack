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
} from "@tanstack/vue-table";

definePageMeta({
  title: "Items",
  layout: "default",
});

const { items, isLoading, createItem, updateItem, deleteItem } =
  useItemsQuery();

const table = useVueTable({
  get data() {
    return items.value || [];
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  onRowSelectionChange: () => {},
});

const isCreating = ref(false);
const newItemForm = ref({
  name: "",
  description: "",
  status: "draft" as const,
});

const handleCreateItem = async () => {
  await createItem(newItemForm.value);
  isCreating.value = false;
  newItemForm.value = {
    name: "",
    description: "",
    status: "draft",
  };
};

const nameFilter = computed({
  get: () => table.getColumn("name")?.getFilterValue() as string,
  set: (value: string) => table.getColumn("name")?.setFilterValue(value),
});
</script>

<template>
  <PageHeader title="Items" description="Manage your items and their statuses.">
    <template #action>
      <div class="flex items-center gap-4">
        <DataTableViewOptions :table="table" />
        <Button @click="isCreating = true" v-if="!isCreating">
          <LucidePlus class="mr-2 h-4 w-4" />
          Add Item
        </Button>
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
          :options="[
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
            { label: 'Archived', value: 'archived' },
          ]"
          title="Status"
          column="status"
        />
      </div>

      <div class="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead class="w-12">
                <Checkbox
                  :model-value="table.getIsAllPageRowsSelected()"
                  @update:model-value="
                    (value) => table.toggleAllPageRowsSelected(!!value)
                  "
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead
                v-for="column in table.getAllColumns()"
                :key="column.id"
              >
                <DataTableColumnHeader :column="column" :title="column.id" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
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
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
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
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() && 'selected'"
            >
              <TableCell class="w-12">
                <Checkbox
                  :model-value="row.getIsSelected()"
                  @update:model-value="(value) => row.toggleSelected(!!value)"
                  aria-label="Select row"
                />
              </TableCell>
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <DataTablePagination :table="table" />
    </div>
  </PageContent>
</template>
