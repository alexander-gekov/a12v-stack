<script setup lang="ts">
import logo from "@/assets/images/logo.png";

definePageMeta({
  layout: "login",
});
</script>

<template>
  <div class="min-h-screen w-full flex">
    <!-- Left section: black background with centered logo -->
    <div class="w-1/2 h-screen bg-black flex items-center justify-center">
      <img :src="logo" alt="A12V Logo" class="w-48 h-48 object-contain" />
    </div>

    <!-- Right section: login form -->
    <div class="w-1/2 h-screen flex items-center justify-center bg-white">
      <div class="w-full max-w-md p-12 flex flex-col justify-center">
        <h1 class="text-2xl font-semibold mb-2 text-black">
          Sign in to your account
        </h1>
        <slot name="form">
          <SignIn />
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
