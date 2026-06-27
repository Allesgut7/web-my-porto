<script setup lang="ts">
import { safeUrl } from '~/utils/url'

definePageMeta({ layout: 'default' })

const { data: profile, pending, error, refresh } = useProfile()
const { t, initLocale } = useI18n()
const { submitMessage, isSubmitting, error: submitError } = useContact()

const siteUrl = useRuntimeConfig().public.siteUrl

onMounted(() => {
  initLocale()
})

useSeoMeta({
  title: () => profile.value?.fullName ? `Contact — ${profile.value.fullName}` : 'Contact',
  description: () =>
    t('contactDescription'),
  ogTitle: () => profile.value?.fullName ? `Contact — ${profile.value.fullName}` : 'Contact',
  ogDescription: () =>
    t('contactDescription'),
  ogUrl: `${siteUrl}/contact`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const isSuccess = ref(false)
const validationErrors = ref<Record<string, string>>({})

function validate(): boolean {
  const errs: Record<string, string> = {}
  if (!form.name.trim()) errs.name = t('contactFormNameRequired')
  if (!form.email.trim()) errs.email = t('contactFormEmailRequired')
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = t('contactFormEmailInvalid')
  if (!form.message.trim()) errs.message = t('contactFormMessageRequired')
  validationErrors.value = errs
  return Object.keys(errs).length === 0
}

async function handleSubmit() {
  if (!validate()) return
  isSuccess.value = false

  try {
    await submitMessage({
      name: form.name,
      email: form.email,
      subject: form.subject || undefined,
      message: form.message,
    })
    isSuccess.value = true
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
    validationErrors.value = {}
  } catch {
    // error is handled by useContact composable
  }
}

function retry() {
  refresh()
}
</script>

<template>
  <div>
    <LoadingState
      v-if="pending"
      class="app-container my-16"
    />

    <ErrorState
      v-else-if="error"
      class="app-container my-16"
      :title="t('commonError')"
      :message="error.message"
      @retry="retry"
    />

    <template v-else-if="profile">
      <!-- Hero -->
      <section class="relative overflow-hidden bg-white py-20 dark:bg-slate-950 md:py-28">
        <div class="app-container">
          <AnimatedContainer>
            <p class="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-cyan-500">
              {{ t('contactEyebrow') }}
            </p>
            <h1 class="mt-4 text-4xl font-bold tracking-tight text-app-text dark:text-slate-50 md:text-5xl lg:text-6xl font-display">
              {{ t('contactTitle') }}
              <span class="heading-gradient-accent">{{ t('contactTitleAccent') }}</span>
              {{ t('contactTitleEnd') }}
            </h1>
            <p class="mt-6 max-w-2xl text-lg leading-8 text-app-muted dark:text-slate-300 md:text-xl">
              {{ t('contactDescription') }}
            </p>
          </AnimatedContainer>
        </div>
      </section>

      <!-- Form + Connect -->
      <section class="relative overflow-hidden bg-app-background py-20 dark:bg-slate-950 md:py-28">
        <div class="app-container">
          <div class="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
            <!-- Contact Form -->
            <AnimatedContainer>
              <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8">
                <p class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-500">
                  {{ t('contactFormTitle') }}
                </p>

                <form class="mt-6 space-y-4" @submit.prevent="handleSubmit">
                  <div>
                    <label for="contact-name" class="block text-sm font-medium text-app-text dark:text-slate-300 mb-1.5">
                      {{ t('contactFormName') }}
                    </label>
                    <input
                      id="contact-name"
                      v-model="form.name"
                      type="text"
                      :placeholder="t('contactFormNamePlaceholder')"
                      class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-app-text placeholder-slate-400 transition-all duration-200 focus:border-cyan-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-cyan-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:border-cyan-500 dark:focus:bg-slate-800 dark:focus:ring-cyan-500"
                      :class="validationErrors.name ? 'border-red-400 dark:border-red-500' : ''"
                    >
                    <p v-if="validationErrors.name" class="mt-1 text-xs text-red-500">
                      {{ validationErrors.name }}
                    </p>
                  </div>

                  <div>
                    <label for="contact-email" class="block text-sm font-medium text-app-text dark:text-slate-300 mb-1.5">
                      {{ t('contactFormEmail') }}
                    </label>
                    <input
                      id="contact-email"
                      v-model="form.email"
                      type="email"
                      :placeholder="t('contactFormEmailPlaceholder')"
                      class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-app-text placeholder-slate-400 transition-all duration-200 focus:border-cyan-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-cyan-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:border-cyan-500 dark:focus:bg-slate-800 dark:focus:ring-cyan-500"
                      :class="validationErrors.email ? 'border-red-400 dark:border-red-500' : ''"
                    >
                    <p v-if="validationErrors.email" class="mt-1 text-xs text-red-500">
                      {{ validationErrors.email }}
                    </p>
                  </div>

                  <div>
                    <label for="contact-subject" class="block text-sm font-medium text-app-text dark:text-slate-300 mb-1.5">
                      {{ t('contactFormSubject') }}
                      <span class="text-slate-400 dark:text-slate-500">({{ t('contactFormOptional') }})</span>
                    </label>
                    <input
                      id="contact-subject"
                      v-model="form.subject"
                      type="text"
                      :placeholder="t('contactFormSubjectPlaceholder')"
                      class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-app-text placeholder-slate-400 transition-all duration-200 focus:border-cyan-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-cyan-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:border-cyan-500 dark:focus:bg-slate-800 dark:focus:ring-cyan-500"
                    >
                  </div>

                  <div>
                    <label for="contact-message" class="block text-sm font-medium text-app-text dark:text-slate-300 mb-1.5">
                      {{ t('contactFormMessage') }}
                    </label>
                    <textarea
                      id="contact-message"
                      v-model="form.message"
                      rows="5"
                      :placeholder="t('contactFormMessagePlaceholder')"
                      class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-app-text placeholder-slate-400 transition-all duration-200 focus:border-cyan-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-cyan-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:border-cyan-500 dark:focus:bg-slate-800 dark:focus:ring-cyan-500 resize-none"
                      :class="validationErrors.message ? 'border-red-400 dark:border-red-500' : ''"
                    />
                    <p v-if="validationErrors.message" class="mt-1 text-xs text-red-500">
                      {{ validationErrors.message }}
                    </p>
                  </div>

                  <FormError
                    v-if="submitError"
                    :message="submitError"
                  />

                  <SuccessState
                    v-if="isSuccess"
                    :title="t('contactFormSuccessTitle')"
                    :message="t('contactFormSuccessMessage')"
                  />

                  <button
                    type="submit"
                    :disabled="isSubmitting"
                    class="btn w-full bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:from-cyan-400 hover:to-blue-400 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span v-if="isSubmitting" class="flex items-center justify-center gap-2">
                      <svg class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      {{ t('contactFormSending') }}
                    </span>
                    <span v-else class="flex items-center justify-center gap-2">
                      {{ t('contactFormSubmit') }}
                      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>
                </form>
              </div>
            </AnimatedContainer>

            <!-- Connect Cards -->
            <AnimatedContainer :delay="200" direction="right">
              <div class="space-y-6">
                <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8">
                  <p class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-500">
                    {{ t('contactConnect') }}
                  </p>

                  <div class="mt-6 space-y-3">
                    <a
                      v-if="profile.email"
                      :href="`mailto:${profile.email}`"
                      class="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-app-muted transition-all duration-300 hover:border-brand-primary hover:bg-white hover:shadow-inner-glow hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-brand-primary dark:hover:bg-slate-800"
                    >
                      <span class="flex items-center gap-3">
                        <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 dark:text-blue-400">
                          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </span>
                        Email
                      </span>
                      <span class="font-medium text-app-text dark:text-white">{{ profile.email }}</span>
                    </a>

                    <a
                      v-if="profile.githubUrl"
                      :href="safeUrl(profile.githubUrl) || undefined"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-app-muted transition-all duration-300 hover:border-brand-primary hover:bg-white hover:shadow-inner-glow hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-brand-primary dark:hover:bg-slate-800"
                    >
                      <span class="flex items-center gap-3">
                        <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-500/10 text-slate-500 dark:text-slate-300">
                          <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
                          </svg>
                        </span>
                        GitHub
                      </span>
                      <span class="font-medium text-app-text dark:text-white">Open profile &rarr;</span>
                    </a>

                    <a
                      v-if="profile.linkedinUrl"
                      :href="safeUrl(profile.linkedinUrl) || undefined"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-app-muted transition-all duration-300 hover:border-brand-primary hover:bg-white hover:shadow-inner-glow hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-brand-primary dark:hover:bg-slate-800"
                    >
                      <span class="flex items-center gap-3">
                        <span class="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/10 text-blue-500 dark:text-blue-400">
                          <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </span>
                        LinkedIn
                      </span>
                      <span class="font-medium text-app-text dark:text-white">Connect &rarr;</span>
                    </a>

                    <p
                      v-if="!profile.email && !profile.githubUrl && !profile.linkedinUrl"
                      class="text-sm leading-6 text-app-muted dark:text-slate-400"
                    >
                      {{ t('contactNoLinks') }}
                    </p>
                  </div>

                  <!-- Location Info -->
                  <div v-if="profile.location" class="mt-6 border-t border-slate-100 dark:border-slate-800 pt-5">
                    <div class="flex items-center gap-3 text-sm text-app-muted dark:text-slate-400">
                      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {{ profile.location }}
                    </div>
                  </div>

                  <div class="mt-4 border-t border-slate-100 dark:border-slate-800 pt-5">
                    <p class="font-mono text-xs text-slate-400 dark:text-slate-500">
                      {{ t('contactResponseTime') }}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedContainer>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
