<template>
  <view
    class="flex w-full h-full box-border border-2 border-white rounded-md shadow-md"
    :style="styleObj"
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
    name: {
      type: String,
      required: true,
    },
    backgroundColor: {
      type: String,
      required: true,
    },
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
    const styleObj = {
      gridArea: `${props.rowStart} / ${props.colStart} / ${props.rowEnd} / ${props.colEnd}`,
      backgroundColor: props.backgroundColor,
    }

    return { styleObj }
  },
})
</script>
