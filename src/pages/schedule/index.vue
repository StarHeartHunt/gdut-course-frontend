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
import Taro from "@tarojs/taro"
import { computed, ComputedRef, defineComponent, onMounted, ref } from "vue"
import "./index.scss"

import TimeIndicator from "@/components/schedule/TimeIndicator.vue"
import WeekdayIndicator from "@/components/schedule/WeekdayIndicator.vue"
import ClazzBadge from "@/components/schedule/ClazzBadge.vue"
import { timetable } from "@/consts"
import { useCourses } from "@/stores/courses"
import dayjs from "dayjs"
import { colorPallete } from "@/utils/color"

export default defineComponent({
  components: {
    TimeIndicator,
    WeekdayIndicator,
    ClazzBadge,
  },
  setup() {
    if (!Taro.getStorageSync("cookies")) {
      Taro.showModal({
        title: "提示",
        content: "您尚未登录，请先登录",
        success: function (res) {
          if (res.confirm) {
            Taro.navigateTo({ url: "/pages/subpages/pages/login/index" })
          } else if (res.cancel) {
            console.log("login modal disposed")
          }
        },
      })
    }

    const termStartDate = ref("2023-02-20")
    const currentWeek = computed(() =>
      termStartDate.value
        ? dayjs().diff(dayjs(termStartDate.value), "week") + 1
        : 1
    )

    Taro.request({
      url: `${process.env.BACKEND_URL}/courses/termStartWeek`,
      method: "POST",
      data: { cookies: Taro.getStorageSync("cookies"), semester: "202202" },
    }).then((res) => {
      termStartDate.value = res.data[0].rq
    })
    const coursesStroage = useCourses()

    onMounted(async () => {
      const response = await Taro.request({
        url: `${process.env.BACKEND_URL}/courses/`,
        method: "POST",
        data: { cookies: Taro.getStorageSync("cookies"), semester: "202202" },
      })
      coursesStroage.setCourses(response.data)
      await Taro.setStorage({
        key: "courses",
        data: response.data,
      })
    })
    const courses: ComputedRef<Array<Record<string, any>>> = computed(() =>
      coursesStroage.storageCourses.filter(
        (course) =>
          course.startWeek <= currentWeek.value &&
          course.endWeek >= currentWeek.value
      )
    )

    const coloredCourses = {}
    const getBgColor = (name) => {
      if (!coloredCourses[name]) {
        coloredCourses[name] =
          colorPallete[Object.keys(coloredCourses).length % colorPallete.length]
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
