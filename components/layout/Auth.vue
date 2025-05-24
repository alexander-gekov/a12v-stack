<script setup lang="ts">
import logo from "@/assets/images/logo.png";
const config = useRuntimeConfig();
</script>

<template>
  <div
    class="relative flex items-center justify-center px-4 h-dvh lg:max-w-none lg:px-0"
  >
    <div
      class="relative hidden h-full flex-1 flex-col bg-muted p-10 text-white lg:flex dark:border-r"
    >
      <div class="absolute inset-0 bg-zinc-900" />
      <div
        class="relative z-20 flex items-center font-mono text-lg font-medium"
      >
        <img :src="logo" alt="logo" class="mr-2 h-12 w-12" />
        {{ config.public.appName }}
      </div>
      <div class="relative z-20 mt-auto">
        <blockquote class="space-y-2">
          <p class="text-lg">
            &ldquo;{{ config.public.appName }} has saved me countless hours of
            work and helped me build my SaaS faster than ever before.&rdquo;
          </p>
          <footer class="text-sm">John Doe</footer>
        </blockquote>
      </div>
    </div>
    <div class="mx-auto flex-1 lg:p-8">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
