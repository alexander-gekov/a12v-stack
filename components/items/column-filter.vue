<script setup lang="ts" generic="TData extends Item">
import type { Column } from "@tanstack/vue-table";
import type { Item } from "../../types/item";
import { Input } from "../../components/ui/input";
import { ref, watch, computed } from "vue";
import { useFiltersStore } from "../../stores/filters";

const props = defineProps<{
  column: Column<TData, unknown>;
}>();

const filtersStore = useFiltersStore();

const value = computed({
  get: () => filtersStore.textFilters[props.column.id] || "",
  set: (newValue: string) => {
    if (newValue) {
      filtersStore.setTextFilter(props.column.id, newValue);
    } else {
      filtersStore.clearFilter(props.column.id);
    }
  },
});

const startDate = computed({
  get: () => filtersStore.dateFilters[props.column.id]?.start || "",
  set: (newValue: string) => {
    const currentFilter = filtersStore.dateFilters[props.column.id] || {};
    if (newValue) {
      filtersStore.setDateFilter(props.column.id, {
        ...currentFilter,
        start: newValue,
      });
    } else {
      const { end } = currentFilter;
      if (end) {
        filtersStore.setDateFilter(props.column.id, { end });
      } else {
        filtersStore.clearFilter(props.column.id);
      }
    }
  },
});

const endDate = computed({
  get: () => filtersStore.dateFilters[props.column.id]?.end || "",
  set: (newValue: string) => {
    const currentFilter = filtersStore.dateFilters[props.column.id] || {};
    if (newValue) {
      filtersStore.setDateFilter(props.column.id, {
        ...currentFilter,
        end: newValue,
      });
    } else {
      const { start } = currentFilter;
      if (start) {
        filtersStore.setDateFilter(props.column.id, { start });
      } else {
        filtersStore.clearFilter(props.column.id);
      }
    }
  },
});

const columnHeader = computed(() => {
  const header = props.column.columnDef.header;
  if (typeof header === "string") {
    return header;
  }
  return props.column.id.charAt(0).toUpperCase() + props.column.id.slice(1);
});

const shouldShowFilter = computed(() => {
  return props.column.getCanFilter() && props.column.id !== "status";
});

// Watch store changes to update table filters
watch(
  () => filtersStore.textFilters[props.column.id],
  (newValue) => {
    if (props.column.id === "createdAt") return;
    props.column.setFilterValue(newValue || undefined);
  }
);

watch(
  () => filtersStore.dateFilters[props.column.id],
  (newValue) => {
    if (props.column.id === "createdAt") {
      props.column.setFilterValue(newValue || undefined);
    }
  },
  { deep: true }
);
</script>

<template>
  <div v-if="shouldShowFilter" class="px-2 py-2">
    <div class="flex items-center justify-between">
      <span class="text-sm">{{ columnHeader }}</span>
      <span
        v-if="props.column.getIsFiltered()"
        class="text-xs text-muted-foreground"
        >Filtered</span
      >
    </div>
    <div class="mt-2">
      <template v-if="props.column.id === 'createdAt'">
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <Input
              type="date"
              v-model="startDate"
              class="h-8"
              :max="endDate || undefined"
              placeholder="Start date"
              @keydown.stop
            />
          </div>
          <div class="flex items-center gap-2">
            <Input
              type="date"
              v-model="endDate"
              class="h-8"
              :min="startDate || undefined"
              placeholder="End date"
              @keydown.stop
            />
          </div>
        </div>
      </template>
      <Input
        v-else
        v-model="value"
        placeholder="Filter..."
        class="h-8 w-full"
        @keydown.stop
      />
    </div>
  </div>
</template>
