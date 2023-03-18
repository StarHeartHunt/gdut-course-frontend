<template>
  <view class="text-sm flex flex-col justify-space-between">
    <view class="text-center">{{ number }}</view>
    <view class="text-center" v-if="showPeriod"> {{ period }} </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    number: {
      type: String,
      required: true,
    },
    period: {
      type: String,
      required: true,
    },
    showPeriod: {
      type: Boolean,
      default: false,
    }
  },
  setup() {
    return {}
  },
})
</script>
