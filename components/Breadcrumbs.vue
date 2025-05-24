<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <NuxtLink to="/">Home</NuxtLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator v-if="breadcrumbs.length > 0"
        ><LucideChevronRight class="w-4 h-4"
      /></BreadcrumbSeparator>
      <template v-for="(crumb, index) in breadcrumbs" :key="crumb.path">
        <BreadcrumbItem>
          <template v-if="index === breadcrumbs.length - 1">
            <BreadcrumbPage>{{ crumb.name }}</BreadcrumbPage>
          </template>
          <template v-else>
            <BreadcrumbLink :to="crumb.path">{{ crumb.name }}</BreadcrumbLink>
          </template>
        </BreadcrumbItem>
        <BreadcrumbSeparator v-if="index < breadcrumbs.length - 1"
          ><LucideChevronRight class="w-4 h-4"
        /></BreadcrumbSeparator>
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>

<script lang="ts" setup>
import { LucideChevronRight } from "lucide-vue-next";

interface Crumb {
  name: string;
  path: string;
}

const route = useRoute();

const breadcrumbs = computed<Crumb[]>(() => {
  const pathArray = route.path.split("/");
  const crumbs: Crumb[] = [];
  let path = "";

  pathArray.forEach((segment) => {
    if (segment) {
      path += `/${segment}`;
      crumbs.push({
        name: segment.charAt(0).toUpperCase() + segment.slice(1),
        path,
      });
    }
  });

  return crumbs;
});
</script>
