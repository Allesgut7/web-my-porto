<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t, initLocale } = useI18n()

onMounted(() => {
  initLocale()
})

const siteUrl = useRuntimeConfig().public.siteUrl

useSeoMeta({
  title: () => t('skillsTitle'),
  description: () => t('skillsDescription'),
  ogTitle: () => t('skillsTitle'),
  ogDescription: () => t('skillsDescription'),
  ogUrl: `${siteUrl}/skills`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <SkillsSection />
  </div>
</template>
