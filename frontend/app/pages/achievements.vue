<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t, initLocale } = useI18n()

onMounted(() => {
  initLocale()
})

const siteUrl = useRuntimeConfig().public.siteUrl

useSeoMeta({
  title: () => t('achievementsTitle'),
  description: () => t('achievementsDescription'),
  ogTitle: () => t('achievementsTitle'),
  ogDescription: () => t('achievementsDescription'),
  ogUrl: `${siteUrl}/achievements`,
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <AchievementSection />
  </div>
</template>
