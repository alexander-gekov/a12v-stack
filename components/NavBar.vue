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
          </div>
        </header>
        <Breadcrumbs />
        <div class="flex items-center flex-1 justify-end gap-2">
          <ColorModeSwitch />
          <UserButton afterSignOutUrl="/auth/login" />
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
