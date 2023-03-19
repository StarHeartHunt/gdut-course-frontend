<template>
  <view class="login">
    <view class="max-w-sm mx-2 bg-white shadow pt-6 pb-4 px-6">
      <form id="login-form" @submit="formSubmit">
        <label class="relative block py-1 box-border">
          <text class="block text-sm font-medium text-slate-700">用户名</text>
          <input
            type="text"
            name="account"
            placeholder="请输入用户名"
            class="form-input p-2 bg-white border shadow-sm border-slate-200 placeholder-slate-400 focus:outline-none focus:ring focus:border-primary-500 block w-auto rounded-md sm:text-sm"
          />
        </label>
        <label class="relative block py-1 box-border">
          <text class="block text-sm font-medium text-slate-700">密码</text>
          <input
            type="password"
            name="pwd"
            placeholder="请输入密码"
            class="form-input p-2 bg-white border shadow-sm border-slate-200 placeholder-slate-400 focus:outline-none focus:ring focus:border-primary-500 block w-auto rounded-md sm:text-sm focus:ring-1"
          />
        </label>
        <label class="relative block py-1 box-border">
          <text class="block text-sm font-medium text-slate-700">验证码</text>
          <view
            class="flex flex-row items-center content-center justify-center place-items-center"
          >
            <input
              type="text"
              name="verifycode"
              placeholder="请输入验证码"
              class="form-input flex-grow py-2 pl-2 w-full bg-white border shadow-sm border-slate-200 placeholder-slate-400 focus:outline-none focus:ring focus:border-primary-500 block rounded-md sm:text-sm focus:ring-1"
            />
            <image
              class="py-2 pr-1 absolute right-0"
              style="width: 110px; height: 35px"
              :src="captchaSrc"
            />
          </view>
        </label>
        <button
          form-type="submit"
          className="login-btn mx-auto mt-6 block rounded-lg bg-primary-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-primary-500/20"
          data-ripple-light="true"
        >
          登录
        </button>
      </form></view
    >
  </view>
</template>

<script lang="ts">
import Taro from "@tarojs/taro"
import { onMounted, ref } from "vue"
import { encrypt } from "@/utils/aes"
import { getTimestampMS } from "@/utils/time"
import { useCookies } from "@/stores/cookies"

import "./index.scss"

export default {
  setup() {
    const captchaSrc = ref("")
    const cookies = useCookies()

    onMounted(async () => {
      const initCookies = (
        await Taro.request({
          url: "http://127.0.0.1:3000/auth/init",
          method: "GET",
        })
      ).data
      cookies.setCookies(initCookies)
      await Taro.setStorage({
        key: "cookies",
        data: initCookies,
      })
      captchaSrc.value = (
        await Taro.request({
          url: "http://127.0.0.1:3000/auth/verify",
          data: {
            cookies: cookies.cookies,
          },
          method: "POST",
        })
      ).data
    })

    const formSubmit = async (e) => {
      const { account, pwd, verifycode } = e.detail.value
      const response = await Taro.request({
        url: "http://127.0.0.1:3000/auth/login",
        data: {
          cookies: Taro.getStorageSync("cookies"),
          account: account,
          pwd: encrypt(pwd, verifycode),
          verifycode: verifycode,
        },
        method: "POST",
      })
      if (response.statusCode >= 200 && response.statusCode < 400) {
        setTimeout(() => {
          Taro.navigateBack()
        }, 1500)
        Taro.showToast({
          title: "登录成功",
          icon: "success",
        })
        Taro.setStorageSync("isLoggedin", true)
      } else {
        Taro.showToast({
          title: "登录失败",
          icon: "none",
        })
      }
    }

    return { getTimestampMS, captchaSrc, formSubmit }
  },
}
</script>
