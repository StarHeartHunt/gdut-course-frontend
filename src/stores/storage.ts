import { defineStore } from "pinia"
import { ref } from "vue"
import Taro from "@tarojs/taro"

export const useStorage = defineStore("storage", () => {
  const cookies = ref(Taro.getStorageSync<string>("cookies") || "")
  const courses = ref(
    Taro.getStorageSync<Array<Record<string, any>>>("courses") ||
      ([] as Array<Record<string, any>>)
  )
  const setCookies = (value: string) => {
    cookies.value = value
    Taro.setStorageSync("cookies", value)
  }
  const setCourses = (value: Array<Record<string, any>>) => {
    courses.value = value
    Taro.setStorageSync("courses", value)
  }

  return { cookies, courses, setCookies, setCourses }
})
