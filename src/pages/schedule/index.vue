<template>
  <view class="schedule">
    <WeekdayIndicator
      :total-weeks-count="totalWeeksCount"
      v-model:selected-week="selectedWeek"
    />
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
import { computed, defineComponent, ref } from "vue"
import { eventCenter, getCurrentInstance } from "@tarojs/taro"
import "./index.scss"

import TimeIndicator from "@/components/schedule/TimeIndicator.vue"
import WeekdayIndicator from "@/components/schedule/WeekdayIndicator.vue"
import ClazzBadge from "@/components/schedule/ClazzBadge.vue"
import { timetable, colors } from "@/consts"
import { useStorage } from "@/stores/storage"
import { getAllCourses, getTermStartWeek, isStatusSuccess } from "@/utils/api"
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

    const totalWeeksCount = ref(20)
    let selectedWeek = ref(storage.currentWeek)

    eventCenter.once(getCurrentInstance().router!.onShow, () => {
      getTermStartWeek()
        .then((res) => {
          if (isStatusSuccess(res.statusCode))
            storage.termStartDate = res.data[0].rq
        })
        .catch((err) =>
          console.log(`[GetTermStartWeek] ${JSON.stringify(err)}`)
        )

      getAllCourses()
        .then((res) => {
          if (isStatusSuccess(res.statusCode)) storage.setCourses(res.data)
        })
        .catch((err) => console.log(`[GetAllCourses] ${JSON.stringify(err)}`))
    })

    const courses = computed(() => storage.getCourses(selectedWeek.value))

    const coursesColors = {}
    const getBgColor = (name: string) => {
      if (!coursesColors[name]) {
        coursesColors[name] =
          colors[Object.keys(coursesColors).length % colors.length]
      }
      return coursesColors[name]
    }

    return {
      timetable,
      courses,
      totalWeeksCount,
      selectedWeek,
      getBgColor,
    }
  },
})
</script>
