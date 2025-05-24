<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef, SortingState } from "@tanstack/vue-table";
import {
  FlexRender,
  getCoreRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table";
import { computed, ref, onBeforeUnmount } from "vue";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { valueUpdater } from "../../lib/utils";

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[];
  data: Ref<TData[]>;
}>();

const tableState = ref();
const sorting = ref<SortingState>([]);
const rowSelection = ref({});

const table = useVueTable({
  columns: props.columns,
  data: props.data,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onRowSelectionChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, rowSelection),
  state: {
    get sorting() {
      return sorting.value;
    },

    get pagination() {
      return tableState.value?.pagination;
    },
    get rowSelection() {
      return rowSelection.value;
    },
  },
  initialState: {
    expanded: true,
    sorting: [{ id: "created", desc: false }],
  },
});

onBeforeUnmount(() => {
  tableState.value = null;
});
</script>

<template>
  <div class="rounded-md">
    <Table>
      <TableHeader>
        <TableRow
          v-for="headerGroup in table?.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <TableHead
            class="pl-4"
            v-for="header in headerGroup.headers"
            :key="header.id"
            :style="{ width: `${header.getSize()}px` }"
          >
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table?.getRowModel().rows?.length">
          <TableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined"
          >
            <TableCell
              class="pl-4"
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
            >
              <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
              />
            </TableCell>
          </TableRow>
          <slot name="new-row" :columns="columns" />
          <TableRow>
            <TableCell :colspan="columns.length" class="h-8 p-0">
              <slot name="add-button" />
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>
</template>
