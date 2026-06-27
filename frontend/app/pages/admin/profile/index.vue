<script setup lang="ts">
import { emptyProfileForm, profileToForm } from '~/composables/useAdminProfile'

definePageMeta({
  layout: 'admin',
})

const { getProfile, updateProfile } = useAdminProfile()
const { uploadImage, uploadFile } = useUploads()

const form = ref(emptyProfileForm())
const isSubmitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const validationErrors = ref<Record<string, string>>({})
const isUploadingAvatar = ref(false)
const isUploadingCv = ref(false)
const avatarUploadError = ref('')
const cvUploadError = ref('')

const { data: profile, pending, error, refresh } = useAsyncData(
  'admin-profile',
  () => getProfile(),
)

watch(
  profile,
  (value) => {
    if (value) {
      form.value = profileToForm(value)
    }
  },
  { immediate: true },
)

useSeoMeta({
  title: 'Admin Profile',
  description: 'Edit profile admin.',
})

async function handleAvatarUpload(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  avatarUploadError.value = ''
  isUploadingAvatar.value = true

  try {
    const uploaded = await uploadImage(file, 'avatar')
    form.value.avatarUrl = uploaded.fileUrl
  } catch (error: any) {
    avatarUploadError.value =
      error?.data?.message ||
      error?.statusMessage ||
      error?.message ||
      'Gagal upload avatar.'
  } finally {
    isUploadingAvatar.value = false
    input.value = ''
  }
}

async function handleCvUpload(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  cvUploadError.value = ''
  isUploadingCv.value = true

  try {
    const uploaded = await uploadFile(file, 'cv')
    form.value.cvUrl = uploaded.fileUrl
  } catch (error: any) {
    cvUploadError.value =
      error?.data?.message ||
      error?.statusMessage ||
      error?.message ||
      'Gagal upload CV.'
  } finally {
    isUploadingCv.value = false
    input.value = ''
  }
}

async function handleSubmit() {
  errorMessage.value = ''
  successMessage.value = ''
  validationErrors.value = {}
  isSubmitting.value = true

  try {
    const updated = await updateProfile(form.value)
    form.value = profileToForm(updated)
    successMessage.value = 'Profile berhasil diperbarui.'
    await refresh()
  } catch (error: any) {
    errorMessage.value =
      error?.data?.message ||
      error?.message ||
      'Gagal update profile.'
    validationErrors.value = error?.data?.data?.errors || error?.data?.errors || {}
  } finally {
    isSubmitting.value = false
  }
}

function retry() {
  refresh()
}
</script>

<template>
  <div>
    <div class="mb-8">
      <p class="section-eyebrow">Profile</p>
      <h1 class="section-title">Edit Profile</h1>
      <p class="section-description">
        Update informasi profile yang tampil di portfolio public.
      </p>
    </div>

    <LoadingState v-if="pending" />

    <ErrorState
      v-else-if="error"
      title="Profile gagal dimuat"
      :message="error.message"
      @retry="retry"
    />

    <SuccessState
      v-if="successMessage"
      class="mb-6"
      title="Update berhasil"
      :message="successMessage"
    />

    <form
      v-if="!pending && !error"
      class="space-y-6"
      @submit.prevent="handleSubmit"
    >
      <FormError
        :message="errorMessage"
        :errors="validationErrors"
      />

      <div class="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div class="space-y-6">
          <div class="app-card p-6 md:p-8">
            <p class="section-eyebrow">Personal Info</p>

            <div class="mt-6 space-y-5">
              <div>
                <label for="prof-name" class="text-sm font-semibold text-app-text">Full Name</label>
                <input
                  id="prof-name"
                  v-model="form.fullName"
                  type="text"
                  class="input mt-2"
                  placeholder="John Doe"
                  required
                >
              </div>

              <div>
                <label for="prof-headline" class="text-sm font-semibold text-app-text">Headline</label>
                <input
                  id="prof-headline"
                  v-model="form.headline"
                  type="text"
                  class="input mt-2"
                  placeholder="Full Stack Developer"
                >
              </div>

              <div>
                <label for="prof-bio" class="text-sm font-semibold text-app-text">Bio</label>
                <textarea
                  id="prof-bio"
                  v-model="form.bio"
                  class="input mt-2 min-h-40"
                  placeholder="Ceritakan tentang diri kamu..."
                />
              </div>

              <div>
                <label for="prof-location" class="text-sm font-semibold text-app-text">Location</label>
                <input
                  id="prof-location"
                  v-model="form.location"
                  type="text"
                  class="input mt-2"
                  placeholder="Jakarta, Indonesia"
                >
              </div>
            </div>
          </div>

          <div class="app-card p-6 md:p-8">
            <p class="section-eyebrow">Contact & Social</p>

            <div class="mt-6 space-y-5">
              <div class="grid gap-5 md:grid-cols-2">
                <div>
                  <label for="prof-email" class="text-sm font-semibold text-app-text">Email</label>
                  <input
                    id="prof-email"
                    v-model="form.email"
                    type="email"
                    class="input mt-2"
                    placeholder="john@example.com"
                  >
                </div>

                <div>
                  <label for="prof-phone" class="text-sm font-semibold text-app-text">Phone</label>
                  <input
                    id="prof-phone"
                    v-model="form.phone"
                    type="tel"
                    class="input mt-2"
                    placeholder="+62 812 3456 7890"
                  >
                </div>
              </div>

              <div>
                <label for="prof-github" class="text-sm font-semibold text-app-text">GitHub URL</label>
                <input
                  id="prof-github"
                  v-model="form.githubUrl"
                  type="url"
                  class="input mt-2"
                  placeholder="https://github.com/username"
                >
              </div>

              <div>
                <label for="prof-linkedin" class="text-sm font-semibold text-app-text">LinkedIn URL</label>
                <input
                  id="prof-linkedin"
                  v-model="form.linkedinUrl"
                  type="url"
                  class="input mt-2"
                  placeholder="https://linkedin.com/in/username"
                >
              </div>

              <div>
                <label for="prof-website" class="text-sm font-semibold text-app-text">Website URL</label>
                <input
                  id="prof-website"
                  v-model="form.websiteUrl"
                  type="url"
                  class="input mt-2"
                  placeholder="https://yoursite.com"
                >
              </div>
            </div>
          </div>
        </div>

        <aside class="space-y-6">
          <div class="app-card p-6">
            <p class="section-eyebrow">Avatar</p>

            <div class="mt-6 space-y-4">
              <div class="technical-grid aspect-square w-32 overflow-hidden rounded-2xl border border-app-border dark:border-slate-800 bg-brand-soft dark:bg-blue-950">
                <img
                  v-if="form.avatarUrl"
                  :src="form.avatarUrl"
                  alt="Avatar preview"
                  class="h-full w-full object-cover"
                >
                <div
                  v-else
                  class="flex h-full items-center justify-center"
                >
                  <p class="font-mono text-xs text-app-muted">Avatar</p>
                </div>
              </div>

              <label class="block">
                <span class="sr-only">Upload avatar</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  class="block w-full cursor-pointer rounded-xl border border-app-border dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-app-muted dark:text-slate-400 file:mr-4 file:border-0 file:bg-brand-primary file:px-5 file:py-3 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-800"
                  :disabled="isUploadingAvatar"
                  @change="handleAvatarUpload"
                >
              </label>

              <p
                v-if="isUploadingAvatar"
                class="text-sm text-app-muted"
              >
                Uploading avatar...
              </p>

              <p
                v-if="avatarUploadError"
                class="text-sm font-medium text-red-600 dark:text-red-400"
              >
                {{ avatarUploadError }}
              </p>
            </div>
          </div>

          <div class="app-card p-6">
            <p class="section-eyebrow">CV / Resume</p>

            <div class="mt-6 space-y-4">
              <div v-if="form.cvUrl">
                <a
                  :href="form.cvUrl"
                  target="_blank"
                  class="text-sm font-semibold text-brand-primary hover:text-blue-800 dark:hover:text-blue-400"
                >
                  View current CV
                </a>
              </div>

              <label class="block">
                <span class="sr-only">Upload CV</span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  class="block w-full cursor-pointer rounded-xl border border-app-border dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-app-muted dark:text-slate-400 file:mr-4 file:border-0 file:bg-brand-primary file:px-5 file:py-3 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-800"
                  :disabled="isUploadingCv"
                  @change="handleCvUpload"
                >
              </label>

              <p
                v-if="isUploadingCv"
                class="text-sm text-app-muted"
              >
                Uploading CV...
              </p>

              <p
                v-if="cvUploadError"
                class="text-sm font-medium text-red-600 dark:text-red-400"
              >
                {{ cvUploadError }}
              </p>
            </div>
          </div>

          <div class="app-card p-6">
            <button
              type="submit"
              class="btn-primary w-full"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'Saving...' : 'Update Profile' }}
            </button>
          </div>
        </aside>
      </div>
    </form>
  </div>
</template>
