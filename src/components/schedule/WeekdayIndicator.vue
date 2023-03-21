<template>
  <scroll-view
    id="scrollview"
    class="shadow items-center justify-around border-box whitespace-nowrap"
    :scroll-x="true"
    :enhanced="true"
    :show-scrollbar="false"
    :scroll-with-animation="true"
    style="width: 100%"
  >
    <view
      :id="`item${week.toString()}`"
      class="text-center align-middle mt-2 mx-3 inline-block h-8"
      :class="{ 'selected-week-item': week == selectedWeek }"
      @tap="changeSelectedWeek"
      v-for="(week, index) in allWeeks"
      :data-week="week"
      :key="index"
      >第{{ week }}周</view
    >
  </scroll-view>
  <view
    class="w-full grid grid-cols-8 min-h-10 justify-space-between items-center content-center place-items-center"
  >
    <view class="text-xs"> {{ selectedMonth + 1 }}月 </view>
    <view v-for="(weekDate, index) in weekDates" :key="index">
      <view class="text-xs text-center mt-1">{{ weekdays[index] }}</view>
      <view
        class="text-xs text-center rounded-full p-1 w-4 h-4 mb-1"
        :style="{
          color:
            weekDates[index] === todayDate && selectedMonth == todayMonth
              ? 'white'
              : 'black',
          backgroundColor:
            weekDates[index] === todayDate && selectedMonth == todayMonth
              ? '#3B82F6'
              : 'unser',
        }"
      >
        {{ weekDate }}
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue"
import Taro, { eventCenter, getCurrentInstance } from "@tarojs/taro"

import { weekdays } from "@/consts"
import { arrayRange } from "@/utils/array"
import { useStorage } from "@/stores/storage"

import dayjs from "dayjs"
import weekday from "dayjs/plugin/weekday"
import "dayjs/locale/zh-cn"

dayjs.extend(weekday)
dayjs.locale("zh-cn")

export default defineComponent({
  props: {
    totalWeeksCount: {
      type: Number,
      required: true,
    },
    selectedWeekProp: {
      type: Number,
      required: true,
    },
  },
  emits: ["update:selectedWeek"],
  setup(props, { emit }) {
    const storage = useStorage()
    const todayMonth = dayjs().get("month")
    const todayDate = dayjs().get("date")
    const selectedWeek = computed({
      get() {
        return props.selectedWeekProp
      },
      set(value) {
        emit("update:selectedWeek", value)
      },
    })

    const selectedMonth = computed(() =>
      dayjs(storage.termStartDate)
        .startOf("week")
        .add(selectedWeek.value - 1, "week")
        .get("month")
    )

    const weekDates = computed(() => {
      return Array(7)
        .fill(dayjs(storage.termStartDate).startOf("week"))
        .map((ele, idx) => {
          return ele
            .add(selectedWeek.value - 1, "week")
            .add(idx, "day")
            .get("date")
        })
    })
    const allWeeks = computed(() => arrayRange(1, props.totalWeeksCount, 1))

    eventCenter.once(getCurrentInstance().router!.onReady, () => {
      calcLeftAndJump()
    })

    const calcLeftAndJump = () => {
      let rect
      Taro.createSelectorQuery()
        .select(`#item${selectedWeek.value}`)
        .boundingClientRect(function (rect) {
          rect.id // 节点的ID
          rect.dataset // 节点的dataset
          rect.left // 节点的左边界坐标
          rect.right // 节点的右边界坐标
          rect.top // 节点的上边界坐标
          rect.bottom // 节点的下边界坐标
          rect.width // 节点的宽度
          rect.height // 节点的高度
        })
        .exec((res) => {
          rect = res[0]
        })
      Taro.createSelectorQuery()
        .select("#scrollview")
        .node()
        .exec((res) => {
          const scrollView = res[0].node
          scrollView.scrollTo({
            left: (selectedWeek.value - 1) * rect.width,
            duration: 300,
          })
          //scrollView.scrollIntoView(`#item${selectedWeek.value}`)
        })
    }

    const changeSelectedWeek = (e: any) => {
      selectedWeek.value = e.target.dataset.week
      calcLeftAndJump()
    }

    return {
      selectedMonth,
      todayMonth,
      todayDate,
      weekdays,
      weekDates,
      allWeeks,
      selectedWeek,
      changeSelectedWeek,
    }
  },
})
</script>

<style>
.selected-week-item {
  color: rgba(167, 139, 250);
  font-weight: bold;
  border-bottom: 4rpx solid rgba(167, 139, 250);
}
</style>
