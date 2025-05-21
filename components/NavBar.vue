<template>
  <div class="w-full flex flex-col">
    <div class="border-b">
      <div class="flex h-16 items-center px-4">
        <header
          class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
        >
          <div class="flex items-center gap-2 px-4">
            <SidebarTrigger
              class="-ml-2 size-4 text-muted-foreground"
              title="Toggle Sidebar"
            />
            <Separator orientation="vertical" class="h-4" />
            <OrganizationSwitcher />
          </div>
        </header>
        <Breadcrumbs />
        <div class="flex items-center flex-1 justify-end gap-4">
          <div class="flex items-center gap-2">
            <Search
              :navigation-items="
                navMenu
                  .flatMap((nav) => nav.items)
                  .map((item) => ({
                    path: item.link,
                    label: item.title,
                    icon: item.icon,
                  }))
              "
            />
          </div>

          <NuxtLink :to="supportLink" class="flex items-center">
            <Button variant="ghost" size="xs" class="text-muted-foreground">
              <LucideHelpCircle class="h-5 w-5" />
            </Button>
          </NuxtLink>

          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button
                variant="ghost"
                size="xs"
                class="text-muted-foreground relative"
              >
                <LucideBell class="h-5 w-5" />
                <span
                  class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground"
                >
                  2
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-80">
              <DropdownMenuLabel class="font-normal">
                <div class="flex flex-col space-y-1">
                  <p class="text-sm font-medium">Notifications</p>
                  <p class="text-xs text-muted-foreground">
                    You have 2 unread messages
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div class="flex flex-col gap-2 w-full">
                  <div class="flex items-center gap-2">
                    <span class="h-2 w-2 rounded-full bg-primary"></span>
                    <span class="text-sm font-medium">New message</span>
                    <span class="ml-auto text-xs text-muted-foreground"
                      >2m ago</span
                    >
                  </div>
                  <p class="text-xs text-muted-foreground">
                    You have a new message from a user
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div class="flex flex-col gap-2 w-full">
                  <div class="flex items-center gap-2">
                    <span class="h-2 w-2 rounded-full bg-primary"></span>
                    <span class="text-sm font-medium">New feature</span>
                    <span class="ml-auto text-xs text-muted-foreground"
                      >1h ago</span
                    >
                  </div>
                  <p class="text-xs text-muted-foreground">
                    We've added new features to the platform
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem class="cursor-pointer text-center">
                Mark all as read
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ColorModeSwitch />
          <UserButton afterSignOutUrl="/login" />
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { LucideHelpCircle, LucideBell } from "lucide-vue-next";
import { navMenu } from "../constants/menus";

const supportLink = ref("/about");
</script>

<style></style>
