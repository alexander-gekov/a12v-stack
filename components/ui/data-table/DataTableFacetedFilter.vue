<script setup lang="ts">
import type { Column } from "@tanstack/vue-table";
import { XIcon, CheckIcon } from "lucide-vue-next";

interface Option {
  label: string;
  value: string;
  icon?: any;
}

interface Props {
  column?: Column<any, unknown>;
  title?: string;
  options: Option[];
}

const props = defineProps<Props>();

const selectedValues = computed(() => {
  if (!props.column) return [];
  return (props.column.getFilterValue() as string[]) || [];
});

const isSelected = (value: string) => {
  return selectedValues.value.includes(value);
};

const handleSelect = (value: string) => {
  if (!props.column) return;

  if (isSelected(value)) {
    props.column.setFilterValue(
      selectedValues.value.filter((v: string) => v !== value)
    );
  } else {
    props.column.setFilterValue([...selectedValues.value, value]);
  }
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="sm" class="h-8 border-dashed">
        <span>{{ title }}</span>
        <Badge
          v-if="selectedValues.length > 0"
          variant="secondary"
          class="rounded-sm px-1 font-normal lg:hidden"
        >
          {{ selectedValues.length }}
        </Badge>
        <Badge
          v-if="selectedValues.length > 0"
          variant="secondary"
          class="ml-2 rounded-sm px-1 font-normal hidden lg:flex"
        >
          {{ selectedValues.length }} selected
        </Badge>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-[200px] p-2" align="start">
      <DropdownMenuLabel>{{ title }}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <div class="h-full max-h-[300px] overflow-auto">
        <div class="space-y-2">
          <DropdownMenuItem
            v-for="option in options"
            :key="option.value"
            @click="handleSelect(option.value)"
          >
            <div
              class="flex items-center gap-2 w-full"
              :class="{ 'opacity-50': !isSelected(option.value) }"
            >
              <component
                v-if="option.icon"
                :is="option.icon"
                class="h-4 w-4 text-muted-foreground"
              />
              <span>{{ option.label }}</span>
              <CheckIcon
                v-if="isSelected(option.value)"
                class="ml-auto h-4 w-4"
              />
            </div>
          </DropdownMenuItem>
        </div>
      </div>
      <DropdownMenuSeparator v-if="selectedValues.length > 0" />
      <DropdownMenuItem
        v-if="selectedValues.length > 0"
        class="justify-center text-center"
        @click="column?.setFilterValue(null)"
      >
        Clear filters
        <XIcon class="ml-2 h-4 w-4" />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
