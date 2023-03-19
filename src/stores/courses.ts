import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useCourses = defineStore("courses", () => {
  const courses = ref([] as Array<Record<string, any>>)
  const storageCourses = computed(() => courses.value)
  const setCourses = (value: Array<Record<string, any>>) => {
    courses.value = value
  }

  return { courses, storageCourses, setCourses }
})
