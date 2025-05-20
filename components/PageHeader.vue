<template>
  <div class="flex justify-between items-center py-6">
    <div>
      <h1 class="text-2xl font-bold">{{ title }}</h1>
      <p v-if="description" class="text-muted-foreground mt-1">
        {{ description }}
      </p>
    </div>
    <slot name="action"></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
}>();
</script>
