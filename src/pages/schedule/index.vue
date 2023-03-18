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
      />
    </view>
  </view>
</template>

<script lang="ts">
import Taro from "@tarojs/taro"
import { computed, defineComponent, onMounted, ref } from "vue"
import "./index.scss"

import TimeIndicator from "@/components/schedule/TimeIndicator.vue"
import WeekdayIndicator from "@/components/schedule/WeekdayIndicator.vue"
import ClazzBadge from "@/components/schedule/ClazzBadge.vue"
import { timetable } from "@/consts"

export default defineComponent({
  components: {
    TimeIndicator,
    WeekdayIndicator,
    ClazzBadge,
  },
  setup() {
    const currentWeek = ref(1)

    onMounted(async () => {
      const response = await Taro.request({
        url: "http://127.0.0.1:3000/courses/",
        method: "POST",
        data: {
          cookies: "JSESSIONID=930DB2B4A4E3DDDC12789C12907BB9A2",
          semester: "202202",
          //cookies: Taro.getStorageSync("cookies"),
        },
      })
      await Taro.setStorage({
        key: "courses",
        data: response.data,
      })
      console.log(response.data)
    })
    const courses = computed(() =>
      Taro.getStorageSync("courses").filter(
        (course: any) =>
          course.startWeek <= currentWeek.value &&
          course.endWeek >= currentWeek.value
      )
    )

    return {
      currentWeek,
      timetable,
      courses,
    }
  },
})
</script>
