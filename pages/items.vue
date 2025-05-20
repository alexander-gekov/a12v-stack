<script setup lang="ts">
import { toast } from "vue-sonner";

definePageMeta({
  title: "Projects",
  layout: "default",
});
</script>

<template>
  <PageHeader title="Items">
    <template #description>
      <p>Here are some of the items I've worked on.</p>
    </template>
    <template #action>
      <Button>Add Item</Button>
    </template>
  </PageHeader>
  <PageContent>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Item 1</CardTitle>
          <CardDescription>Item 1 description</CardDescription>
        </CardHeader>
      </Card>
    </div>
  </PageContent>
</template>
