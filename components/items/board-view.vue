<script setup lang="ts" generic="TData">
import type { Item } from "../../types/item";
import { LucidePlus, MoreHorizontal, Circle } from "lucide-vue-next";

const props = defineProps<{
  data: Ref<Item[]>;
  isPending?: boolean;
}>();

const emit = defineEmits<{
  create: [];
}>();

const statusColumns = [
  ...new Set(props.data.value.map((item) => item.status)),
].map((status) => ({
  value: status,
  label: status.charAt(0).toUpperCase() + status.slice(1),
  icon: Circle,
  iconClass: status === "draft" ? "text-blue-500" : "text-green-500",
}));

const getColumnItems = (status: string) => {
  return props.data.value.filter((item) => item.status === status);
};
</script>

<template>
  <div class="grid grid-cols-3 gap-4 px-4">
    <div
      v-for="column in statusColumns"
      :key="column.value"
      class="flex flex-col gap-2"
    >
      <div class="flex items-center justify-between p-2">
        <div class="flex items-center gap-2">
          <component
            :is="column.icon"
            class="h-4 w-4"
            :class="column.iconClass"
          />
          <h3 class="font-medium">
            {{ column.label }}
            <span class="ml-1 text-muted-foreground">{{
              getColumnItems(column.value).length
            }}</span>
          </h3>
        </div>
        <div class="flex items-center gap-1">
          <Button
            v-if="column.value === 'draft'"
            variant="ghost"
            size="icon"
            class="h-6 w-6"
            @click="emit('create')"
          >
            <LucidePlus class="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" class="h-6 w-6">
            <MoreHorizontal class="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <div
          v-for="item in getColumnItems(column.value)"
          :key="item.id"
          class="bg-card px-3 py-2 rounded-lg border shadow-sm"
        >
          <div class="flex items-center justify-between gap-2">
            <div class="min-w-0">
              <h4 class="font-medium truncate">{{ item.name }}</h4>
              <p class="text-xs text-muted-foreground truncate">
                {{ item.description }}
              </p>
            </div>
            <DataTableDropdown :item="item" class="shrink-0" />
          </div>
        </div>
      </div>

      <Button
        v-if="column.value === 'draft'"
        variant="ghost"
        class="border border-dashed"
        @click="emit('create')"
      >
        <LucidePlus class="h-4 w-4 mr-2" />
        Add item
      </Button>
    </div>
  </div>
</template>
