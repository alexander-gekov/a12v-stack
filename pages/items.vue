<script setup lang="ts">
import { LucidePlus } from "lucide-vue-next";
import { columns } from "../components/items/columns";

definePageMeta({
  title: "Items",
  layout: "default",
});

const { data, isLoading, createItem, isPending, refetch } = useItemsQuery();

onMounted(async () => {
  await refetch();
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

const statusOptions = [
  { label: "Draft", value: "draft" },
  { label: "Published", value: "published" },
  { label: "Archived", value: "archived" },
];

onBeforeUnmount(() => {
  isCreating.value = false;
});
</script>

<template>
  <div>
    <DataTable
      :columns="columns"
      :data="ref(data?.items ?? [])"
      :is-pending="isLoading || isPending"
      :key="`items-${isLoading || isPending}`"
      class="rounded-none"
    >
      <template #add-button>
        <Button
          variant="ghost"
          class="h-8 w-full justify-start rounded-none hover:bg-muted/50 text-muted-foreground"
          @click="isCreating = true"
        >
          <LucidePlus class="mr-2 h-4 w-4" />
          New item
        </Button>
      </template>

      <template #new-row="{ columns }">
        <TableRow v-if="isCreating">
          <TableCell class="pl-4">
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
    </DataTable>
  </div>
</template>
