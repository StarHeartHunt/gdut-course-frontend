<template>
  <scroll-view
    class="flex flex-row bg-primary-500 shadow items-center justify-around border-box whitespace-nowrap "
    :scroll-x="true"
    style="width: 100%"
  >
    <view
      class="text-center text-white m-3 inline-block h-auto"
      v-for="(week, index) in allWeeks"
      :key="index"
      >第{{ week }}周</view
    >
  </scroll-view>
  <view
    class="w-full grid grid-cols-8 min-h-10 justify-space-between items-center content-center place-items-center"
  >
    <view class="text-xs"> {{ (currentMonth + 1).toString() }}月 </view>
    <view v-for="(weekDate, index) in weekDates" :key="index">
      <view class="text-xs text-center mt-1">{{ weekdays[index] }}</view>
      <view
        class="text-xs text-center rounded-full p-1 w-4 h-4 mb-1"
        :style="{
          color: weekDates[index] === currentDate ? 'white' : 'black',
          backgroundColor:
            weekDates[index] === currentDate ? '#3B82F6' : 'unser',
        }"
      >
        {{ weekDate.toString() }}
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue"
import { weekdays } from "@/consts"
import { arrayRange } from "@/utils/array"

import dayjs from "dayjs"
import weekday from "dayjs/plugin/weekday"
import "dayjs/locale/zh-cn"

dayjs.extend(weekday)
dayjs.locale("zh-cn")

export default defineComponent({
  props: {
    currentWeek: {
      type: Number,
      required: true,
    },
    totalWeeksCount: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const currentMonth = dayjs().month()
    const currentDate = dayjs().get("date")
    const weekStartDate = dayjs().weekday(0).get("date")
    const weekEndDate = dayjs().weekday(6).get("date")
    const weekDates = arrayRange(weekStartDate, weekEndDate, 1)
    const allWeeks = computed(() => arrayRange(1, props.totalWeeksCount, 1))

    return {
      currentMonth,
      currentDate,
      weekdays,
      weekDates,
      allWeeks,
    }
  },
})
</script>
