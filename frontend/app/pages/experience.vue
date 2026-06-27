<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t, initLocale } = useI18n()

onMounted(() => {
  initLocale()
})

const siteUrl = useRuntimeConfig().public.siteUrl

useSeoMeta({
  title: () => t('experienceTitle'),
  description: () => t('experienceDescription'),
  ogTitle: () => t('experienceTitle'),
  ogDescription: () => t('experienceDescription'),
  ogUrl: `${siteUrl}/experience`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <ExperienceSection />
  </div>
</template>
