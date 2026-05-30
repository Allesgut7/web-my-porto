<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name?: string
    role?: string
    focus?: string[]
  }>(),
  {
    name: 'Developer',
    role: 'Fullstack Developer',
    focus: () => ['Backend', 'Frontend', 'Data', 'Testing'],
  },
)

const formattedFocus = computed(() => props.focus.map((item) => `"${item}"`).join(', '))
</script>

<template>
  <div class="relative overflow-hidden rounded-3xl border border-slate-800 bg-brand-dark p-5 shadow-card">
    <div class="absolute right-0 top-0 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl" />
    <div class="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />

    <div class="relative flex items-center gap-2 border-b border-white/10 pb-4">
      <span class="h-3 w-3 rounded-full bg-red-400" />
      <span class="h-3 w-3 rounded-full bg-amber-400" />
      <span class="h-3 w-3 rounded-full bg-green-400" />

      <span class="ml-3 font-mono text-xs text-slate-400">
        portfolio.profile.ts
      </span>
    </div>

    <pre class="relative mt-5 overflow-x-auto text-sm leading-7 text-slate-300"><code><span class="text-cyan-300">const</span> developer = {
  name: <span class="text-amber-300">"{{ name }}"</span>,
  role: <span class="text-amber-300">"{{ role }}"</span>,
  stack: [{{ formattedFocus }}],
  mindset: <span class="text-amber-300">"build, test, iterate"</span>,
  status: <span class="text-green-300">"available"</span>
}</code></pre>
  </div>
</template>