<script setup lang="ts">
import { LucideGithub, LucideLinkedin, LucideTwitter } from "lucide-vue-next";

definePageMeta({
  title: "About Me",
  layout: "default",
});

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/alexander-gekov",
    icon: LucideGithub,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/alexander-gekov",
    icon: LucideLinkedin,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/AlexanderGekov",
    icon: LucideTwitter,
  },
];
</script>

<template>
  <PageHeader title="About Me"> </PageHeader>
  <div class="space-y-4">
    <p class="text-lg text-muted-foreground">
      Software Developer from Sofia, Bulgaria. ICT & Software Engineering
      graduate, Frontend Enthusiast & Content Creator, currently building my own
      startup at talsight.com.
    </p>
    <div class="flex gap-2">
      <a
        v-for="link in socialLinks"
        :key="link.name"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="outline" class="gap-2">
          <component :is="link.icon" class="h-4 w-4" />
          {{ link.name }}
        </Button>
      </a>
    </div>
  </div>
</template>
