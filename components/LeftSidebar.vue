<template>
  <Sidebar size="lg" collapsible="icon">
    <SidebarHeader class="mt-3">
      <SidebarMenu>
        <SidebarMenuItem>
          <!-- Logo/Brand -->
          <NuxtLink
            to="/"
            external
            id="logo"
            class="font-bold flex items-center gap-4 text-lg xl:text-xl 2xl:text-2xl"
            :class="{ 'px-2': open }"
          >
            <div
              class="flex aspect-square size-8 items-center justify-center rounded-lg"
            >
              <img
                :src="logo"
                class="w-10 xl:w-14 2xl:w-18 hover:transform hover:scale-110 transition-transform duration-300"
                alt="Logo"
              />
            </div>
            <div v-if="open" class="font-semibold font-mono text-sm">
              {{ config.public.appName }}
            </div>
          </NuxtLink>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>

    <SidebarContent class="bg-text-primary z-50">
      <!-- Discover Section -->
      <SidebarGroup>
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
    </SidebarContent>

    <!-- Account Section -->
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <Button
            variant="outline"
            size="sm"
            @click="openPolarCheckout"
            class="w-full flex items-center justify-center gap-2"
            :class="{ 'aspect-square p-2': !open }"
          >
            <LucideStar class="h-4 w-4" />
            <span v-if="open">Upgrade</span>
          </Button>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <DropdownMenu v-model:open="isDropdownOpen">
            <DropdownMenuTrigger as-child>
              <Button
                variant="ghost"
                class="relative w-full h-auto px-2 py-1.5"
              >
                <div class="flex items-center gap-2">
                  <UserButton afterSignOutUrl="/auth/login" />
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

                <DropdownMenuItem class="gap-2">
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
import logo from "~/assets/images/logo.png";
import {
  LucideSettings,
  LucideHome,
  LucideFolders,
  LucideStar,
  LucideLogOut,
  LucideChevronsUpDown,
  LucideUser,
  LucideBell,
  LucideGithub,
  LucidePaintbrush,
} from "lucide-vue-next";
import { useSidebar } from "./ui/sidebar";
import { navMenu } from "../constants/menus";

const { user } = useUser();
const { userId, isSignedIn } = useAuth();

const router = useRouter();
const config = useRuntimeConfig();
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
