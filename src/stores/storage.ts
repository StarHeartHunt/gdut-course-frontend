import { defineStore } from "pinia"
import { computed, Ref, ref } from "vue"
import Taro from "@tarojs/taro"

import dayjs from "dayjs"
import weekday from "dayjs/plugin/weekday"
import "dayjs/locale/zh-cn"
import { Course } from "@/utils/api"

dayjs.extend(weekday)
dayjs.locale("zh-cn")

export const useStorage = defineStore("storage", () => {
  const cookies = ref(Taro.getStorageSync<string>("cookies") || "")
  const courses: Ref<Array<Course>> = ref(
    Taro.getStorageSync<Array<Course>>("courses") || ([{}] as Array<Course>)
  )
  const termStartDate = ref(
    Taro.getStorageSync<string>("termStartDate") || "2023-08-28"
  )
  const currentWeek = computed(() =>
    termStartDate.value
      ? dayjs().diff(dayjs(termStartDate.value), "week") + 1
      : 1
  )

  const getCourses = (week: number) => {
    return courses.value
      ? courses.value.filter((course) => course?.weeks?.indexOf(week) != -1)
      : []
  }

  const setCookies = (value: string) => {
    cookies.value = value
    Taro.setStorageSync("cookies", value)
  }
  const setCourses = (value: Array<Course>) => {
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
