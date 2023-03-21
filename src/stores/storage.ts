import { defineStore } from "pinia"
import { computed, ref } from "vue"
import Taro from "@tarojs/taro"

import dayjs from "dayjs"
import weekday from "dayjs/plugin/weekday"
import "dayjs/locale/zh-cn"

dayjs.extend(weekday)
dayjs.locale("zh-cn")

export const useStorage = defineStore("storage", () => {
  const cookies = ref(Taro.getStorageSync<string>("cookies") || "")
  const courses = ref(
    Taro.getStorageSync<Array<Record<string, any>>>("courses") ||
      ([] as Array<Record<string, any>>)
  )
  const termStartDate = ref(
    Taro.getStorageSync<string>("termStartDate") || "2023-02-20"
  )
  const currentWeek = computed(() =>
    termStartDate.value
      ? dayjs().diff(dayjs(termStartDate.value), "week") + 1
      : 1
  )

  const getCourses = (week: number) => {
    return courses.value
      ? courses.value.filter(
          (course) => course.startWeek <= week && course.endWeek >= week
        )
      : []
  }

  const setCookies = (value: string) => {
    cookies.value = value
    Taro.setStorageSync("cookies", value)
  }
  const setCourses = (value: Array<Record<string, any>>) => {
    courses.value = value
    Taro.setStorageSync("courses", value)
  }

  return {
    cookies,
    courses,
    currentWeek,
    termStartDate,
    getCourses,
    setCookies,
    setCourses,
  }
})
