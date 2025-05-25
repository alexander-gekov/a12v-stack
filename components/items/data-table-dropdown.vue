<script setup lang="ts">
import { MoreHorizontal } from "lucide-vue-next";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useItemsQuery } from "../../composables/useItemsQuery";
import { toast } from "vue-sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useQueryClient } from "@tanstack/vue-query";

const { deleteItem } = useItemsQuery();
const queryClient = useQueryClient();

defineProps<{
  item: {
    id: string;
  };
}>();

const isDeleting = ref(false);

function copy(id: string) {
  navigator.clipboard.writeText(id);
}

async function handleDelete(id: string) {
  try {
    isDeleting.value = true;
    await deleteItem(id);
    queryClient.invalidateQueries({ queryKey: ["items"] });
    toast("Item deleted successfully");
  } catch (error) {
    toast("Failed to delete item");
  } finally {
    isDeleting.value = false;
  }
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger class="h-3 w-3 p-0" as-child>
      <Button variant="ghost">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="h-3 w-3" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem @click="copy(item.id)">Copy item ID</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>View item</DropdownMenuItem>
      <DropdownMenuItem>Edit item</DropdownMenuItem>
      <DropdownMenuItem @click="handleDelete(item.id)" :disabled="isDeleting">
        <AlertDialog>
          <AlertDialogTrigger as-child> Delete item </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                item.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                @click="handleDelete(item.id)"
                :disabled="isDeleting"
              >
                {{ isDeleting ? "Deleting..." : "Delete" }}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
