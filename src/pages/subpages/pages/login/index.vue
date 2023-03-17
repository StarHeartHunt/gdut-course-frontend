<template>
  <view class="login">
    <view class="max-w-sm mx-2 bg-white shadow pt-6 pb-4 px-6">
      <form>
        <label class="block py-1">
          <text class="block text-sm font-medium text-slate-700">用户名</text>
          <input
            class="py-2 bg-white border shadow-sm border-slate-200 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
          />
        </label>
        <label class="block py-1">
          <text class="block text-sm font-medium text-slate-700">密码</text>
          <input
            class="py-2 bg-white border shadow-sm border-slate-200 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
          />
        </label>
        <label class="relative block py-1">
          <text class="block text-sm font-medium text-slate-700">验证码</text>
          <view
            class="flex flex-row items-center content-center justify-center place-items-center"
          >
            <input
              class="flex-grow py-2 bg-white border shadow-sm border-slate-200 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 contrast-more:border-slate-400 contrast-more:placeholder-slate-500"
            />
            <image style="width: 110px; height: 35px" :src="getVerifyCode()" />
          </view>
        </label>
        <view
          className="login-btn mx-auto mt-6 block rounded-lg bg-primary-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-primary-500/20"
          type="button"
          data-ripple-light="true"
        >
          登录
        </view>
      </form></view
    >
  </view>
</template>

<script>
import "./index.scss"

export default {
  setup() {
    const getTimestampMS = () => {
      return Date.now()
    }
    const getVerifyCode = () => {
      return `	https://jxfw.gdut.edu.cn/yzm?d=${getTimestampMS()}`
    }

    return { getTimestampMS, getVerifyCode }
  },
}
</script>
