import { defineStore } from "pinia";
import { ref } from "vue";

export const useFiltersStore = defineStore("filters", () => {
  const textFilters = ref<Record<string, string>>({});
  const dateFilters = ref<Record<string, { start?: string; end?: string }>>({});
  const statusFilter = ref<string[]>([]);

  function setTextFilter(columnId: string, value: string) {
    textFilters.value[columnId] = value;
  }

  function setDateFilter(
    columnId: string,
    value: { start?: string; end?: string }
  ) {
    dateFilters.value[columnId] = value;
  }

  function setStatusFilter(value: string[]) {
    statusFilter.value = value;
  }

  function clearFilter(columnId: string) {
    delete textFilters.value[columnId];
    delete dateFilters.value[columnId];
    if (columnId === "status") {
      statusFilter.value = [];
    }
  }

  function clearAllFilters() {
    textFilters.value = {};
    dateFilters.value = {};
    statusFilter.value = [];
  }

  return {
    textFilters,
    dateFilters,
    statusFilter,
    setTextFilter,
    setDateFilter,
    setStatusFilter,
    clearFilter,
    clearAllFilters,
  };
});
