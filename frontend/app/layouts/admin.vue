<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-app-background text-app-text">
    <div class="flex min-h-screen">
      <AdminSidebar />

      <div class="flex min-w-0 flex-1 flex-col lg:pl-72">
        <AdminTopbar />

        <main class="flex-1 px-6 py-8 lg:px-8">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>