<script setup lang="ts">
const props = withDefaults(defineProps<{
  data?: Record<string, any>
  endpoint?: string
  status?: number
  loading?: boolean
}>(), {
  endpoint: '/api/profile',
  status: 200,
  loading: false,
})

const responseTime = ref(0)

onMounted(() => {
  responseTime.value = Math.floor(Math.random() * 40) + 8
})

function syntaxHighlight(json: string): string {
  return json
    .replace(/("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*")\s*:/g, '<span class="text-cyan-400">$1</span>:')
    .replace(/:\s*("(\\u[\da-fA-F]{4}|\\[^u]|[^\\"])*")/g, ': <span class="text-emerald-400">$1</span>')
    .replace(/:\s*(\d+\.?\d*)/g, ': <span class="text-amber-400">$1</span>')
    .replace(/:\s*(null|true|false)/g, ': <span class="text-red-400">$1</span>')
    .replace(/:\s*(\[)/g, ': <span class="text-slate-300">$1</span>')
}

const formattedJson = computed(() => {
  if (!props.data) return null
  const raw = JSON.stringify(props.data, null, 2)
  return syntaxHighlight(raw)
})

const statusText = computed(() => {
  if (props.status >= 200 && props.status < 300) return 'OK'
  if (props.status >= 400 && props.status < 500) return 'Not Found'
  if (props.status >= 500) return 'Server Error'
  return 'OK'
})

const statusColor = computed(() => {
  if (props.status >= 200 && props.status < 300) return 'text-emerald-400'
  if (props.status >= 400) return 'text-red-400'
  return 'text-slate-400'
})
</script>

<template>
  <div class="overflow-hidden rounded-xl border border-slate-700/60 bg-[#0d1117] shadow-2xl shadow-black/40 font-mono text-sm">
    <div class="flex items-center gap-2 border-b border-slate-700/60 bg-slate-900/80 px-4 py-2.5">
      <span class="h-3 w-3 rounded-full bg-red-500/90" />
      <span class="h-3 w-3 rounded-full bg-yellow-500/90" />
      <span class="h-3 w-3 rounded-full bg-green-500/90" />
      <span class="ml-3 text-xs text-slate-400">API Response</span>
    </div>

    <div class="p-4 min-h-[200px]">
      <template v-if="loading">
        <div class="space-y-3 animate-pulse">
          <div class="h-4 w-64 rounded bg-slate-800" />
          <div class="h-4 w-48 rounded bg-slate-800" />
          <div class="h-4 w-56 rounded bg-slate-800" />
          <div class="h-4 w-40 rounded bg-slate-800" />
        </div>
      </template>

      <template v-else>
        <div class="mb-4 text-xs text-slate-500">
          <span class="text-slate-400">GET</span>
          <span class="mx-2 text-cyan-400">{{ endpoint }}</span>
          <span>→</span>
          <span :class="['mx-2 font-semibold', statusColor]">{{ status }}</span>
          <span :class="statusColor">{{ statusText }}</span>
          <span class="ml-2 text-slate-600">({{ responseTime }}ms)</span>
        </div>

        <div v-if="formattedJson" class="text-[13px] leading-relaxed">
          <pre class="whitespace-pre-wrap text-slate-300" v-html="formattedJson" />
        </div>

        <div v-else class="text-[13px] leading-relaxed">
          <pre class="whitespace-pre-wrap text-slate-300"><span class="text-slate-500">{</span>
  <span class="text-cyan-400">"fullName"</span>: <span class="text-emerald-400">"Developer Name"</span>,
  <span class="text-cyan-400">"headline"</span>: <span class="text-emerald-400">"Backend Developer"</span>,
  <span class="text-cyan-400">"location"</span>: <span class="text-emerald-400">"Indonesia"</span>,
  <span class="text-cyan-400">"stack"</span>: <span class="text-slate-300">[</span><span class="text-emerald-400">"Go"</span>, <span class="text-emerald-400">"Nuxt"</span>, <span class="text-emerald-400">"PostgreSQL"</span><span class="text-slate-300">]</span>
<span class="text-slate-500">}</span></pre>
        </div>
      </template>
    </div>
  </div>
</template>
