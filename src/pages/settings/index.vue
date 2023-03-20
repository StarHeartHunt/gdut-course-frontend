<template>
  <view class="settings">
    <view
      class="w-full flex items-center content-center justify-center place-items-center"
    >
      <view
        class="mx-2 my-2 flex flex-col box-border items-center w-full drop-shadow-lg bg-white rounded clickable"
        @tap="onTapUserLogin"
      >
        <view
          class="relative flex middle none w-full center rounded-lg h-9 py-1 font-sans font-bold uppercase text-primary-900"
        >
          <view
            class="fa-solid fa-user w-9 mx-1 text-center align-middle justify-self-center self-center"
          ></view>
          <text
            class="ml-1 text-center align-middle justify-self-center self-center"
            >用户管理</text
          >
          <view
            class="absolute fa-chevron-right fas text-primary-900 right-4 h-fit text-center align-middle justify-self-center self-center"
          ></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import Taro from "@tarojs/taro"

import "./index.scss"

export default defineComponent({
  setup() {
    const onClickUserLogin = () => {
      Taro.navigateTo({ url: "/pages/subpages/pages/login/index" })
    }
    return {
      onTapUserLogin: onClickUserLogin,
    }
  },
})
</script>
