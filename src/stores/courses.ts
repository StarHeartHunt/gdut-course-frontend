import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useCourses = defineStore("courses", () => {
  const courses = ref({})
  const storageCourses = computed(() => courses.value)
  const setCourses = (value: string) => {
    courses.value = value
  }

  return { courses, storageCourses, setCourses }
})
