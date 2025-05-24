<script setup lang="ts">
import {
  LucideBriefcase,
  LucideChartBar,
  LucideDollarSign,
  LucidePlusCircle,
  LucideUsers,
  LucideUserPlus,
  LucideSettings,
} from "lucide-vue-next";

definePageMeta({
  title: "Home",
  layout: "default",
});

const stats = [
  { name: "Total Users", value: "8.9k", icon: LucideUsers },
  {
    name: "Monthly Revenue",
    value: "$20,456",
    icon: LucideDollarSign,
  },
  { name: "Active Projects", value: "245", icon: LucideBriefcase },
  { name: "Completion Rate", value: "95%", icon: LucideChartBar },
];
</script>

<template>
  <div>
    <PageHeader
      title="Welcome back!"
      description="Here's what's happening with your projects today."
    >
      <template #action>
        <Button>
          <LucidePlusCircle class="w-4 h-4 mr-2" />
          New Item
        </Button>
      </template>
    </PageHeader>

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
              <LucidePlusCircle class="w-4 h-4 mr-2" />
              Create New Project
            </Button>
            <Button variant="outline" class="w-full justify-start">
              <LucideUserPlus class="w-4 h-4 mr-2" />
              Invite Team Member
            </Button>
            <Button variant="outline" class="w-full justify-start">
              <LucideSettings class="w-4 h-4 mr-2" />
              Account Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
