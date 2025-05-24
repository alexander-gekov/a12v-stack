<script setup lang="ts">
import { cn } from "../../lib/utils";
import { Loader2 } from "lucide-vue-next";
import PasswordInput from "../base/PasswordInput.vue";

const isLoading = ref(false);
async function onSubmit(event: Event) {
  event.preventDefault();
  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
}
</script>

<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <SignUp />
  </div>
</template>
