<template>
  <view
    class="flex w-full h-full box-border border border-white rounded bg-primary-500/65 active:bg-primary-800/65"
    :style="gridArea"
  >
    <view class="m-1 text-white text-xs"
      ><text>{{ name }}</text
      >@{{ room }}
      <view class="mt-1" style="white-space: pre-wrap">
        {{ teacher }}
      </view></view
    >
  </view>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    name: String,
    room: String,
    teacher: String,
    rowStart: {
      type: Number,
      default: 1,
    },
    colStart: {
      type: Number,
      default: 1,
    },
    rowEnd: {
      type: Number,
      default: 1,
    },
    colEnd: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    const gridArea = {
      gridArea: `${props.rowStart} / ${props.colStart} / ${props.rowEnd} / ${props.colStart}`,
    }
    return { gridArea }
  },
})
</script>
