<script setup lang="ts" generic="TData extends Item, TValue">
import type { ColumnDef, SortingState } from "@tanstack/vue-table";
import {
  FlexRender,
  getCoreRowModel,
  getSortedRowModel,
  useVueTable,
  getFilteredRowModel,
} from "@tanstack/vue-table";
import { computed, ref, onBeforeUnmount } from "vue";
import {
  LayoutGrid,
  LayoutList,
  Settings2,
  Filter,
  ListFilter,
  Search,
  LucidePlus,
} from "lucide-vue-next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuCheckboxItem,
} from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { valueUpdater } from "../../lib/utils";
import BoardView from "./board-view.vue";
import type { Item } from "../../types/item";
import ColumnFilter from "./column-filter.vue";
import { useFiltersStore } from "../../stores/filters";

const viewModeCookie = useCookie<"table" | "board">("items-view-mode", {
  default: () => "table",
  watch: true,
  maxAge: 60 * 60 * 24 * 365, // 1 year
});

const viewMode = computed({
  get: () => viewModeCookie.value,
  set: (value: "table" | "board") => {
    viewModeCookie.value = value;
  },
});

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[];
  data: Ref<TData[]>;
}>();

const tableState = ref();
const sorting = ref<SortingState>([]);
const rowSelection = ref({});

const filtersStore = useFiltersStore();

const statusOptions = [
  { label: "Draft", value: "draft" },
  { label: "Published", value: "published" },
  { label: "Archived", value: "archived" },
];

const columnFilters = ref([]);

const table = useVueTable({
  get data() {
    return props.data.value ?? [];
  },
  get columns() {
    return props.columns;
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onRowSelectionChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, rowSelection),
  onColumnFiltersChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnFilters),
  filterFns: {
    status: (row, columnId, filterValue: string[]) => {
      if (!filterValue.length) return true;
      return filterValue.includes(row.getValue(columnId));
    },
    dateBetween: (row, columnId, filterValue: { start?: Date; end?: Date }) => {
      const cellValue = row.getValue<Date>(columnId);
      const start = filterValue.start ? new Date(filterValue.start) : null;
      const end = filterValue.end ? new Date(filterValue.end) : null;

      if (start && end) {
        return cellValue >= start && cellValue <= end;
      } else if (start) {
        return cellValue >= start;
      } else if (end) {
        return cellValue <= end;
      }

      return true;
    },
  },
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
    get columnFilters() {
      return columnFilters.value;
    },
  },
  initialState: {
    expanded: true,
    sorting: [{ id: "created", desc: false }],
    columnFilters: [],
  },
});

onBeforeUnmount(() => {
  tableState.value = null;
});
</script>

<template>
  <div>
    <div class="flex h-10 items-center justify-between border-b px-4">
      <div class="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="xs"
              class="h-6 gap-1 text-muted-foreground hover:bg-muted"
            >
              <ListFilter class="h-3 w-3" />
              Filter
              <Badge
                v-if="table.getState().columnFilters.length"
                variant="secondary"
                class="ml-2"
              >
                {{ table.getState().columnFilters.length }}
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" class="w-[280px]">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <div class="flex items-center">
                  Status
                  <Badge
                    v-if="filtersStore.statusFilter.length"
                    variant="secondary"
                    size="xs"
                    class="ml-2"
                  >
                    {{ filtersStore.statusFilter.length }}
                  </Badge>
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent class="w-48">
                <DropdownMenuCheckboxItem
                  v-for="status in statusOptions"
                  :key="status.value"
                  :model-value="
                    filtersStore.statusFilter.includes(status.value)
                  "
                  @update:model-value="
                    (checked) => {
                      if (checked) {
                        filtersStore.setStatusFilter([
                          ...filtersStore.statusFilter,
                          status.value,
                        ]);
                      } else {
                        filtersStore.setStatusFilter(
                          filtersStore.statusFilter.filter(
                            (s) => s !== status.value
                          )
                        );
                      }
                      table
                        .getColumn('status')
                        ?.setFilterValue(filtersStore.statusFilter);
                    }
                  "
                >
                  <Badge
                    :variant="
                      status.value === 'published'
                        ? 'default'
                        : status.value === 'draft'
                          ? 'secondary'
                          : 'outline'
                    "
                    class="mr-2"
                  >
                    {{ status.label }}
                  </Badge>
                  <span class="ml-auto text-xs">{{
                    props.data.value.filter(
                      (item) => item.status === status.value
                    ).length
                  }}</span>
                </DropdownMenuCheckboxItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <ColumnFilter
              v-for="column in table
                .getAllColumns()
                .filter((column) => column.getCanFilter())"
              :key="column.id"
              :column="column"
            />
            <DropdownMenuSeparator />
            <DropdownMenuItem
              v-if="table.getState().columnFilters.length"
              @click="
                () => {
                  filtersStore.clearAllFilters();
                  table.resetColumnFilters();
                }
              "
              class="justify-center text-sm"
            >
              Reset filters
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="xs"
            class="h-6 gap-1 text-muted-foreground hover:bg-muted"
          >
            <Settings2 class="h-3 w-3" />
            Display
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-48">
          <DropdownMenuLabel>View Mode</DropdownMenuLabel>
          <div class="flex gap-2 p-2">
            <DropdownMenuItem
              class="flex-1 h-12 justify-center items-center flex-col gap-0.5 border rounded-md hover:bg-muted"
              :class="{ 'bg-muted': viewMode === 'table' }"
              @click="viewMode = 'table'"
            >
              <LayoutList class="h-4 w-4 mt-0.5" />
              <span class="text-sm">List</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              class="flex-1 h-12 justify-center items-center flex-col gap-1 border rounded-md hover:bg-muted"
              :class="{ 'bg-muted': viewMode === 'board' }"
              @click="viewMode = 'board'"
            >
              <LayoutGrid class="h-4 w-4 mt-0.5" />
              <span class="text-sm">Board</span>
            </DropdownMenuItem>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Column Settings</DropdownMenuLabel>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Order by</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                @click="sorting = [{ id: 'name', desc: false }]"
              >
                Name
              </DropdownMenuItem>
              <DropdownMenuItem
                @click="sorting = [{ id: 'status', desc: false }]"
              >
                Status
              </DropdownMenuItem>
              <DropdownMenuItem
                @click="sorting = [{ id: 'createdAt', desc: true }]"
              >
                Created Date
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Show Columns</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuCheckboxItem
                v-for="column in table
                  .getAllColumns()
                  .filter((col) => col.getCanHide())"
                :key="column.id"
                :model-value="column.getIsVisible()"
                @update:model-value="column.toggleVisibility()"
              >
                {{ column.id.charAt(0).toUpperCase() + column.id.slice(1) }}
              </DropdownMenuCheckboxItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <BoardView
      v-if="viewMode === 'board'"
      :data="ref(table.getFilteredRowModel().rows.map((row) => row.original))"
      :is-pending="false"
    />

    <div v-else class="rounded-md">
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
          <template v-if="table?.getFilteredRowModel().rows?.length">
            <TableRow
              v-for="row in table.getFilteredRowModel().rows"
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
          </template>
          <template v-else>
            <TableRow>
              <TableCell :colspan="columns.length" class="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          </template>
          <slot name="new-row" :columns="columns" />
          <TableRow>
            <TableCell :colspan="columns.length" class="h-8 p-0">
              <slot name="add-button" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
