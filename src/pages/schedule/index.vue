<template>
  <view class="schedule">
    <WeekdayIndicator :current-week="currentWeek" />
    <view
      class="grid grid-cols-8 grid-rows-12 grid-flow-col w-full box-border items-center content-center place-items-center gap-1"
    >
      <TimeIndicator
        v-for="(time, index) in timetable"
        :key="index"
        :number="time.number"
        :period="time.period"
        :show-period="true"
      />
      <ClazzBadge
        v-for="(course, index) in courses"
        :key="index"
        :name="course.name"
        :room="course.room"
        :teacher="course.teacher"
        :row-start="course.startNode"
        :row-end="course.endNode + 1"
        :col-start="course.day + 1"
        :col-end="course.day + 1"
        :background-color="getBgColor(course.name)"
      />
    </view>
  </view>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, ref } from "vue"
import "./index.scss"

import TimeIndicator from "@/components/schedule/TimeIndicator.vue"
import WeekdayIndicator from "@/components/schedule/WeekdayIndicator.vue"
import ClazzBadge from "@/components/schedule/ClazzBadge.vue"
import { timetable, colors } from "@/consts"
import { useStorage } from "@/stores/storage"
import dayjs from "dayjs"
import { getAllCourses, getTermStartWeek } from "@/utils/api"
import { showLoginTipAndRedirect } from "@/utils/modal"

export default defineComponent({
  components: {
    TimeIndicator,
    WeekdayIndicator,
    ClazzBadge,
  },
  setup() {
    const storage = useStorage()
    if (!storage.cookies) showLoginTipAndRedirect()

    const termStartDate = ref("2023-02-20")
    const currentWeek = computed(() =>
      termStartDate.value
        ? dayjs().diff(dayjs(termStartDate.value), "week") + 1
        : 1
    )

    getTermStartWeek().then((res) => {
      termStartDate.value = res.data[0].rq
    })

    getAllCourses().then((response) => storage.setCourses(response.data))

    const courses: ComputedRef<Array<Record<string, any>>> = computed(() =>
      storage.courses.filter(
        (course) =>
          course.startWeek <= currentWeek.value &&
          course.endWeek >= currentWeek.value
      )
    )

    const coloredCourses = {}
    const getBgColor = (name: string) => {
      if (!coloredCourses[name]) {
        coloredCourses[name] =
          colors[Object.keys(coloredCourses).length % colors.length]
      }
      return coloredCourses[name]
    }

    return {
      currentWeek,
      timetable,
      courses,
      getBgColor,
    }
  },
})
</script>
