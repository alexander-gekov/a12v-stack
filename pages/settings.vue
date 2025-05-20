<script setup lang="ts">
const user = ref({
  name: "John Doe",
  email: "john@example.com",
  bio: "Software developer and tech enthusiast",
});

const notifications = ref({
  email: true,
  push: false,
  weekly: true,
});

const appearance = ref({
  theme: "light",
  compact: false,
});
</script>

<template>
  <div class="container py-10 space-y-8">
    <div class="space-y-2">
      <h2 class="text-3xl font-bold tracking-tight">Settings</h2>
      <p class="text-muted-foreground">
        Manage your account settings and preferences
      </p>
    </div>

    <Tabs default-value="account" class="space-y-4">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
      </TabsList>

      <TabsContent value="account" class="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Update your account settings</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <Label for="name">Name</Label>
              <Input id="name" v-model="user.name" />
            </div>
            <div class="space-y-2">
              <Label for="email">Email</Label>
              <Input id="email" type="email" v-model="user.email" />
            </div>
            <div class="space-y-2">
              <Label for="bio">Bio</Label>
              <Textarea id="bio" v-model="user.bio" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications" class="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription
              >Manage your notification preferences</CardDescription
            >
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p class="text-sm text-muted-foreground">
                    Receive email notifications about your account
                  </p>
                </div>
                <Switch v-model="notifications.email" />
              </div>
              <div class="flex items-center justify-between">
                <div class="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p class="text-sm text-muted-foreground">
                    Receive push notifications on your device
                  </p>
                </div>
                <Switch v-model="notifications.push" />
              </div>
              <div class="flex items-center justify-between">
                <div class="space-y-0.5">
                  <Label>Weekly Digest</Label>
                  <p class="text-sm text-muted-foreground">
                    Get a weekly summary of your activity
                  </p>
                </div>
                <Switch v-model="notifications.weekly" />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="appearance" class="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription
              >Customize the appearance of the application</CardDescription
            >
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="space-y-2">
              <Label>Theme</Label>
              <Select v-model="appearance.theme">
                <SelectTrigger>
                  <SelectValue placeholder="Select a theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div class="flex items-center justify-between">
              <div class="space-y-0.5">
                <Label>Compact Mode</Label>
                <p class="text-sm text-muted-foreground">
                  Use a more compact display for dense information
                </p>
              </div>
              <Switch v-model="appearance.compact" />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</template>
