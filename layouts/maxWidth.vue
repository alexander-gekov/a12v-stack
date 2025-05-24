<template>
  <ClerkLoaded>
    <SignedIn>
      <SidebarProvider>
        <div class="flex flex-col md:flex-row w-full">
          <LeftSidebar />
          <SidebarInset>
            <main class="flex flex-col w-full h-screen justify-between">
              <div class="flex flex-col page-wrap">
                <NavBar />
                <div :class="'mx-auto w-full'">
                  <NuxtPage />
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
