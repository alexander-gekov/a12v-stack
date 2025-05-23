<script setup lang="ts">
import { useMagicKeys } from "@vueuse/core";
import { LucideSearch } from "lucide-vue-next";

const { metaSymbol } = useShortcuts();
const router = useRouter();

const openCommand = ref(false);
const { meta } = useMagicKeys();
const { k } = useMagicKeys();
const isMetaKPressed = computed(() => meta.value && k.value);

watch(isMetaKPressed, (value) => {
  if (value) {
    openCommand.value = true;
  }
});

defineProps<{
  navigationItems?: Array<{
    path: string;
    label: string;
    icon?: any;
  }>;
}>();

function handleSelectLink(path: string) {
  if (path.startsWith("http")) {
    window.open(path, "_blank");
  } else {
    router.push(path);
  }
  openCommand.value = false;
}
</script>

<template>
  <SidebarMenuButton as-child tooltip="Search">
    <Button
      variant="outline"
      size="sm"
      class="text-xs w-full h-7"
      @click="openCommand = !openCommand"
    >
      <LucideSearch class="mr-2 h-4 w-4" />
      <span class="font-normal group-data-[collapsible=icon]:hidden"
        >Search</span
      >
      <div
        class="ml-auto flex items-center space-x-0.5 group-data-[collapsible=icon]:hidden"
      >
        <BaseKbd>{{ metaSymbol }}</BaseKbd>
        <BaseKbd>K</BaseKbd>
      </div>
    </Button>
  </SidebarMenuButton>

  <CommandDialog v-model:open="openCommand">
    <CommandInput placeholder="Type to search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Navigation">
        <CommandItem
          v-for="item in navigationItems"
          :key="item.path"
          :value="item.path"
          @select="handleSelectLink(item.path)"
        >
          <component v-if="item.icon" :is="item.icon" class="mr-2 h-4 w-4" />
          {{ item.label }}
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandDialog>
</template>

<style scoped></style>
