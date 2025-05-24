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

defineProps<{
  item: {
    id: string;
  };
}>();

function copy(id: string) {
  navigator.clipboard.writeText(id);
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
      <DropdownMenuItem>Delete item</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
