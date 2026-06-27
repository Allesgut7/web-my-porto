<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: ['guest'],
})

const route = useRoute()
const { login } = useAuth()

const form = reactive({
  email: '',
  password: '',
})

const isSubmitting = ref(false)
const errorMessage = ref('')

useSeoMeta({
  title: 'Admin Login',
  description: 'Login admin untuk mengelola project portfolio.',
})

async function handleLogin() {
  errorMessage.value = ''
  isSubmitting.value = true

  try {
    await login(form)

    const raw = typeof route.query.redirect === 'string' ? route.query.redirect : ''
    const redirect = raw.startsWith('/') && !raw.startsWith('//') && !raw.includes('://') ? raw : '/admin/dashboard'

    await navigateTo(redirect)
  } catch (error: any) {
    errorMessage.value =
      error?.data?.message ||
      error?.message ||
      'Email atau password tidak valid.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="technical-grid flex min-h-screen items-center justify-center bg-app-background px-6 py-12">
    <div class="w-full max-w-md">
      <NuxtLink
        to="/"
        class="mb-8 inline-block text-sm font-semibold text-brand-primary hover:text-blue-800"
      >
        ← Back to public site
      </NuxtLink>

      <div class="app-card p-6 md:p-8">
        <p class="section-eyebrow">Admin Access</p>

        <h1 class="mt-3 text-3xl font-bold tracking-tight text-app-text">
          Login Dashboard
        </h1>

        <p class="mt-3 text-sm leading-6 text-app-muted">
          Masuk untuk mengelola project portfolio. Token disimpan melalui HTTP-only cookie dari backend.
        </p>

        <FormError
          class="mt-6"
          :message="errorMessage"
        />

        <form
          class="mt-6 space-y-5"
          @submit.prevent="handleLogin"
        >
          <div>
            <label for="login-email" class="text-sm font-semibold text-app-text">Email</label>
            <input
              id="login-email"
              v-model="form.email"
              type="email"
              class="input mt-2"
              placeholder="admin@example.com"
              autocomplete="email"
              required
            >
          </div>

          <div>
            <label for="login-password" class="text-sm font-semibold text-app-text">Password</label>
            <input
              id="login-password"
              v-model="form.password"
              type="password"
              class="input mt-2"
              placeholder="••••••••"
              autocomplete="current-password"
              required
            >
          </div>

          <button
            type="submit"
            class="btn-primary w-full"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Logging in...' : 'Login' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>