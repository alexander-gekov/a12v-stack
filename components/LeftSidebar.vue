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
            <div v-if="open" class="font-semibold font-mono">
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
            v-for="item in navigationItems"
            :key="item.path"
            as-child
          >
            <NuxtLink :to="item.path">
              <SidebarMenuButton
                class="w-full text-primary"
                :class="
                  currentRoute.path == item.path ? 'bg-sidebar-hover' : ''
                "
                :tooltip="item.label"
              >
                <component :is="item.icon" class="mr-2 h-4 w-4" />
                <span>{{ item.label }}</span>
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
          <GettingStartedSidebar />
        </SidebarMenuItem>
        <SidebarMenuItem>
          <NuxtLink :to="supportLink">
            <SidebarMenuButton class="w-full text-primary">
              <LucideHelpCircle stroke-width="1" class="mr-2 h-4 w-4" />
              <span>Help</span>
            </SidebarMenuButton>
          </NuxtLink>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <SidebarMenuButton size="lg">
                <UserButton afterSignOutUrl="/login" />
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-semibold">
                    {{ user?.fullName ?? user?.primaryEmailAddress }}
                  </span>
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <!-- Add dropdown content if needed -->
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>

<script lang="ts" setup>
import logo from '~/assets/images/logo.png';
import {
  LucideHelpCircle,
  LucideSettings,
  LucideHome,
  LucideFolders,
} from 'lucide-vue-next';
import { useSidebar } from './ui/sidebar';

const { user } = useUser();
const { userId } = useAuth();

const router = useRouter();
const config = useRuntimeConfig();
const { open } = useSidebar();
const currentRoute = computed(() => router.currentRoute.value);

watch(
  () => userId.value,
  () => {
    if (userId.value === null) {
      navigateTo('/login');
    }
  }
);

// Navigation items data
const supportLink = ref('/support/how-to-build-a-search-for-candidates');

const navigationItems = [
  {
    path: '/',
    label: 'Home',
    icon: LucideHome,
  },
  {
    path: '/projects',
    label: 'Projects',
    icon: LucideFolders,
  },
  {
    path: '/settings',
    label: 'Settings',
    icon: LucideSettings,
  },
];
</script>

<style scoped></style>
