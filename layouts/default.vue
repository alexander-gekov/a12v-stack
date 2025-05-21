<template>
  <ClerkLoaded>
    <SignedIn>
      <SidebarProvider :default-open="false">
        <div v-if="isLargeScreen" class="flex flex-col md:flex-row w-full">
          <LeftSidebar />
          <SidebarInset>
            <main class="flex flex-col w-full h-screen justify-between">
              <div class="flex flex-col page-wrap">
                <NavBar />
                <div :class="'xl:max-w-6xl mx-auto w-full px-6'">
                  <NuxtPage keepalive />
                </div>
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </SignedIn>
    <SignedOut>
      <RedirectToSignIn />
    </SignedOut>
  </ClerkLoaded>
</template>

<script setup lang="ts">
import LeftSidebar from "../components/LeftSidebar.vue";
import { SidebarProvider, SidebarInset } from "../components/ui/sidebar";

const { userId } = useAuth();
const isLargeScreen = useMediaQuery("(min-width: 800px)");

watch(
  () => userId.value,
  async () => {
    if (userId.value === null) {
      navigateTo("/login");
    }
  }
);
</script>

<style scoped></style>
