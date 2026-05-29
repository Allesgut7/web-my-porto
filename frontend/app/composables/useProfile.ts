import { useAsyncData, useNuxtApp } from '#imports'
import type { ApiResponse } from '../types/api'
import type { Profile } from '../types/profile'

export const useProfile = () => {
  const { $api } = useNuxtApp()

  const fetchProfile = async () => {
    const response = await $api<ApiResponse<Profile>>('/profile')
    return response.data
  }

  const useProfileData = () => {
    return useAsyncData('public-profile', fetchProfile)
  }

  return {
    fetchProfile,
    useProfileData,
  }
}