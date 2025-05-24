<template>
  <Toaster />
  <NuxtLoadingIndicator />
  <ClientOnly>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ClientOnly>
</template>

<script setup lang="ts">
import { Toaster } from "./components/ui/sonner";
</script>
