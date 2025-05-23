<template>
  <Sidebar size="lg" collapsible="offcanvas" variant="inset">
    <SidebarHeader class="mt-2">
      <SidebarMenu>
        <SidebarMenuItem>
          <div class="flex items-center justify-between w-full gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  class="flex px-1 items-center gap-2 max-w-[calc(100%-70px)] truncate"
                >
                  <NuxtImg
                    src="https://github.com/alexander-gekov.png"
                    class="w-5 h-5 rounded-full flex-shrink-0"
                  />
                  <span class="truncate text-sm"
                    >Alexander Gekov's Workspace</span
                  >
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent class="ml-2 w-64">
                <DropdownMenuItem class="flex justify-between">
                  <span>Settings</span>
                  <span class="text-xs text-muted-foreground">G then S</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Invite and manage members</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Download desktop app</span>
                </DropdownMenuItem>
                <DropdownMenuItem class="flex justify-between">
                  <span>Switch workspace</span>
                  <span class="text-xs text-muted-foreground">O then W</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem class="flex items-center gap-2">
                  <span>Log out</span>
                  <div class="ml-auto flex items-center gap-1">
                    <kbd class="text-xs">⌘</kbd>
                    <kbd class="text-xs">↑</kbd>
                    <kbd class="text-xs">Q</kbd>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div class="flex items-center gap-1">
              <Button variant="ghost" size="sm" class="h-8 w-8">
                <LucideSearch
                  class="h-4 w-4 text-muted-foreground hover:text-foreground"
                />
              </Button>
              <Button variant="ghost" size="sm" class="h-8 w-8">
                <LucideSettings
                  class="h-4 w-4 text-muted-foreground hover:text-foreground"
                />
              </Button>
            </div>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>

    <SidebarContent class="bg-text-primary z-50">
      <!-- Discover Section -->
      <SidebarGroup class="py-0">
        <SidebarGroupLabel>Discover</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem
            v-for="item in navMenu[0].items"
            :key="item.link"
            as-child
          >
            <NuxtLink :to="item.link">
              <SidebarMenuButton
                class="w-full text-primary"
                :class="
                  currentRoute.path == item.link ? 'bg-sidebar-hover' : ''
                "
                :tooltip="item.title"
              >
                <component :is="item.icon" class="mr-2 h-4 w-4" />
                <span>{{ item.title }}</span>
              </SidebarMenuButton>
            </NuxtLink>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
      <Collapsible defaultOpen class="group/collapsible">
        <SidebarGroup class="py-0">
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger>
              Socials
              <LucideChevronDown
                class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
              /> </CollapsibleTrigger
          ></SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarMenu>
              <SidebarMenuItem
                v-for="item in navMenu[1].items"
                :key="item.link"
                as-child
              >
                <NuxtLink :to="item.link" target="_blank">
                  <SidebarMenuButton
                    class="w-full text-primary"
                    :class="
                      currentRoute.path == item.link ? 'bg-sidebar-hover' : ''
                    "
                    :tooltip="item.title"
                  >
                    <component :is="item.icon" class="mr-2 h-4 w-4" />
                    <span>{{ item.title }}</span>
                  </SidebarMenuButton>
                </NuxtLink>
              </SidebarMenuItem>
            </SidebarMenu>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
    </SidebarContent>

    <!-- Account Section -->
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <Button
            variant="outline"
            size="xs"
            @click="openPolarCheckout"
            class="w-full flex items-center justify-center gap-2 text-muted-foreground mb-2"
            :class="{ 'aspect-square p-2': !open }"
          >
            <span class="text-xs flex items-center gap-1" v-if="open">
              Upgrade Now
              <LucideArrowUpRight class="h-3 w-3" />
            </span>
          </Button>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <DropdownMenu v-model:open="isDropdownOpen">
            <DropdownMenuTrigger as-child>
              <Button
                variant="ghost"
                size="xs"
                class="relative w-full h-auto px-2 py-1.5 text-muted-foreground text-xs"
              >
                <div class="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage
                      :src="
                        user?.imageUrl ||
                        'https://github.com/alexander-gekov.png'
                      "
                    />
                    <AvatarFallback>
                      {{ user?.fullName?.charAt(0) }}
                    </AvatarFallback>
                  </Avatar>
                  <div v-if="open" class="flex flex-col items-center text-sm">
                    <span class="font-medium">{{ user?.fullName }}</span>
                    <span class="text-muted-foreground text-xs">{{
                      user?.primaryEmailAddress
                    }}</span>
                  </div>
                  <div
                    v-if="open"
                    class="ml-auto flex items-center self-stretch"
                  >
                    <LucideChevronsUpDown
                      class="h-5 w-5"
                      :class="{ 'rotate-180': isDropdownOpen }"
                    />
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" class="w-56">
              <div class="flex flex-col gap-1 p-2">
                <div class="flex items-center gap-2 px-2 py-1.5">
                  <UserButton afterSignOutUrl="/auth/login" />
                  <div class="flex flex-col items-start text-sm">
                    <span class="font-medium">{{ user?.fullName }}</span>
                    <span class="text-muted-foreground text-xs">{{
                      user?.primaryEmailAddress
                    }}</span>
                  </div>
                </div>

                <DropdownMenuItem class="gap-2" @click="openPolarCheckout">
                  <LucideStar class="h-4 w-4" />
                  <span>Upgrade to Pro</span>
                </DropdownMenuItem>

                <DropdownMenuItem class="gap-2">
                  <LucideUser class="h-4 w-4" />
                  <span>Account</span>
                </DropdownMenuItem>

                <DropdownMenuItem class="gap-2">
                  <LucideSettings class="h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>

                <DropdownMenuItem class="gap-2">
                  <LucideBell class="h-4 w-4" />
                  <span>Notifications</span>
                </DropdownMenuItem>

                <DropdownMenuItem class="gap-2">
                  <LucideGithub class="h-4 w-4" />
                  <span>Github Repository</span>
                </DropdownMenuItem>

                <DropdownMenuItem class="gap-2">
                  <LucidePaintbrush class="h-4 w-4" />
                  <span>Theme</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <SignOutButton>
                  <DropdownMenuItem
                    class="gap-2 text-destructive focus:text-destructive"
                  >
                    <LucideLogOut class="h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </SignOutButton>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>

<script lang="ts" setup>
import {
  LucideSettings,
  LucideStar,
  LucideLogOut,
  LucideChevronsUpDown,
  LucideUser,
  LucideBell,
  LucideGithub,
  LucidePaintbrush,
  LucideSearch,
  LucideChevronDown,
  LucideArrowUpRight,
} from "lucide-vue-next";
import { useSidebar } from "./ui/sidebar";
import { navMenu } from "../constants/menus";

const { user } = useUser();
const { userId } = useAuth();

const router = useRouter();
const { open } = useSidebar();
const currentRoute = computed(() => router.currentRoute.value);

watch(
  () => userId.value,
  () => {
    if (userId.value === null) {
      navigateTo("auth/login");
    }
  }
);

interface PolarProductsResponse {
  result: {
    items: any[];
  };
}

interface PolarCheckoutResponse {
  url: string;
}

const { data: products } = await useFetch<PolarProductsResponse>(
  "/api/polar/products"
);

const openPolarCheckout = async () => {
  try {
    if (!products.value?.result.items.length) {
      return;
    }

    const productId = products.value.result.items[0].id;
    const checkout = await $fetch<PolarCheckoutResponse>(
      "/api/polar/checkout",
      {
        method: "POST",
        body: { productId },
      }
    );

    if (checkout?.url) {
      window.location.href = checkout.url;
    }
  } catch (error) {
    console.error("Failed to open checkout:", error);
  }
};

const isDropdownOpen = ref(false);
</script>

<style scoped></style>
