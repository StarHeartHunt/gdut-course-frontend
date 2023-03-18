<template>
  <view class="schedule">
    <WeekdayIndicator />
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
      <view
        class="flex bg-primary-500/65 w-full h-full row-span-2 box-border border border-white rounded active:bg-primary-800/65"
      >
        <view class="m-1 text-white text-sm break-all"
          >123456789101111112132131313</view
        >
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import Taro from "@tarojs/taro"
import { defineComponent, onMounted } from "vue"
import "./index.scss"

import TimeIndicator from "@/components/schedule/TimeIndicator.vue"
import WeekdayIndicator from "@/components/schedule/WeekdayIndicator.vue"
import { timetable } from "@/consts"

export default defineComponent({
  components: {
    TimeIndicator,
    WeekdayIndicator,
  },
  setup() {

    onMounted(async () => {
      const response = await Taro.request({
        url: "http://127.0.0.1:3000/courses/",
        method: "GET",
        header: {
          Cookie: "cookies.storageCookies",
        },
      })
      console.log(response)
    })

    return {
      timetable
    }
  },
})
</script>
