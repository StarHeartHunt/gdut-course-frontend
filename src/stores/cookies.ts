import { defineStore } from "pinia"
import { ref } from "vue"

export const useCookies = defineStore("cookies", () => {
  const cookies = ref("")
  const setCookies = (value: string) => {
    cookies.value = value
  }

  return { cookies, setCookies }
})
