<template>
  <view
    class="w-full grid grid-cols-8 min-h-10 justify-space-between items-center content-center place-items-center bg-primary-500 shadow"
  >
    <view class="fa-solid fa-arrow-right w-full text-center align-middle" style="color: white"></view>
    <view class="text-center text-white"> 第{{ currentWeek }}周 </view>
    <view
      class="text-center text-white"
      v-for="(weekday, index) in weekdays"
      :key="index"
      >{{ weekday }}</view
    >
  </view>
  <view
    class="w-full grid grid-cols-8 min-h-10 justify-space-between items-center content-center place-items-center"
  >
    <view class="text-xs"> {{ currentMonth.toString() }}月 </view>
    <view
      class="text-xs text-center rounded-full p-1 w-4 h-4"
      :style="{
        color: weekDates[index] === currentDate ? 'white' : 'black',
        backgroundColor: weekDates[index] === currentDate ? '#3B82F6' : 'unser',
      }"
      v-for="(weekDate, index) in weekDates"
      :key="index"
      >{{ weekDate.toString() }}</view
    >
  </view>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { weekdays } from "@/consts"
import { arrayRange } from "@/utils/array"

import dayjs from "dayjs"
import weekday from "dayjs/plugin/weekday"
import "dayjs/locale/zh-cn"

dayjs.extend(weekday)
dayjs.locale("zh-cn")

export default defineComponent({
  props: {
    currentWeek: Number,
  },
  setup() {
    const currentMonth = dayjs().month() + 1
    const currentDate = dayjs().get("date")
    const weekStartDate = dayjs().weekday(0).get("date")
    const weekEndDate = dayjs().weekday(6).get("date")
    const weekDates = arrayRange(weekStartDate, weekEndDate, 1)

    return { currentMonth, currentDate, weekdays, weekDates }
  },
})
</script>
