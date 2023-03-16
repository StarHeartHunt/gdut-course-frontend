<template>
  <view class="settings">
    <view
      class="w-full flex items-center content-center justify-center place-items-center"
    >
      <view
        class="mx-2 my-2 flex flex-col box-border items-center w-11/12 drop-shadow-lg bg-white rounded"
      >
        <view
          class="flex middle none w-full center rounded-lg py-3 font-sans font-bold uppercase text-primary-900"
        >
          <image
            class="mx-4"
            src="/assets/images/a.png"
            mode="widthFix"
            style="width: 25px"
          ></image>
          <text class="justify-self-center self-center">用户管理</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import "./index.scss"

export default {
  name: "Settings",
}
</script>
