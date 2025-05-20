<script setup lang="ts">
import { LucidePlusCircle } from "lucide-vue-next";

definePageMeta({
  title: "Home",
  layout: "default",
});

const stats = [
  { name: "Total Users", value: "8.9k", icon: "i-heroicons-users" },
  {
    name: "Monthly Revenue",
    value: "$20,456",
    icon: "i-heroicons-currency-dollar",
  },
  { name: "Active Projects", value: "245", icon: "i-heroicons-briefcase" },
  { name: "Completion Rate", value: "95%", icon: "i-heroicons-chart-bar" },
];
</script>

<template>
  <div class="p-8">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold">Welcome back!</h1>
        <p class="text-muted-foreground mt-1">
          Here's what's happening with your projects today.
        </p>
      </div>
      <Button size="lg">
        <LucidePlusCircle class="w-4 h-4 mr-2" />
        New Item
      </Button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card v-for="stat in stats" :key="stat.name" class="p-4">
        <div class="flex items-center gap-4">
          <div class="p-2 bg-primary/10 rounded-lg">
            <span :class="stat.icon" class="w-5 h-5 text-primary" />
          </div>
          <div>
            <p class="text-sm text-muted-foreground">{{ stat.name }}</p>
            <p class="text-2xl font-semibold">{{ stat.value }}</p>
          </div>
        </div>
      </Card>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card class="p-6">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription
            >Your project updates from the last 7 days</CardDescription
          >
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <p class="text-sm text-muted-foreground">
              No recent activity to show
            </p>
          </div>
        </CardContent>
      </Card>

      <Card class="p-6">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks you can perform</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-2">
            <Button variant="outline" class="w-full justify-start">
              <span class="i-heroicons-plus-circle mr-2" />
              Create New Project
            </Button>
            <Button variant="outline" class="w-full justify-start">
              <span class="i-heroicons-user-plus mr-2" />
              Invite Team Member
            </Button>
            <Button variant="outline" class="w-full justify-start">
              <span class="i-heroicons-cog mr-2" />
              Account Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
