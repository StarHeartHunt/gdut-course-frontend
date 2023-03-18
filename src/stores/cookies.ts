import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useCookies = defineStore("cookies", () => {
  const cookies = ref("")
  const storageCookies = computed(() => cookies.value)
  const setCookies = (value: string) => {
    cookies.value = value
  }

  return { cookies, storageCookies, setCookies }
})
