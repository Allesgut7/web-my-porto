<template>
  <div role="status" aria-live="polite" class="app-card p-6 md:p-8">
    <span class="sr-only">Loading...</span>
    <div class="animate-pulse space-y-5">
      <div class="h-4 w-32 rounded-full bg-slate-200 dark:bg-slate-700" />
      <div class="h-7 w-2/3 rounded-full bg-slate-200 dark:bg-slate-700" />
      <div class="space-y-3">
        <div class="h-4 w-full rounded-full bg-slate-200 dark:bg-slate-700" />
        <div class="h-4 w-5/6 rounded-full bg-slate-200 dark:bg-slate-700" />
        <div class="h-4 w-3/5 rounded-full bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
  </div>
</template>