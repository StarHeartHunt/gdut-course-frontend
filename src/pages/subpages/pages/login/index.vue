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
import { computed } from "vue"
import { getTimestampMS } from "@/utils/time"
import { useStorage } from "@/stores/storage"

import "./index.scss"
import { storeToRefs } from "pinia"
import { showLoginFailed, showLoginSuccess } from "@/utils/toast"
import {
  getAllCourses,
  getTermStartWeek,
  initAuth,
  isStatusSuccess,
  login_jxfw,
} from "@/utils/api"

export default {
  setup() {
    const storage = useStorage()
    const { cookies } = storeToRefs(storage)
    const captchaSrc = computed(
      () =>
        process.env.BACKEND_URL + "/auth/verify" + "?cookie=" + cookies.value
    )

    initAuth().then((response) => {
      storage.setCookies(response.data)
    })

    const formSubmit = async (e) => {
      const { account, pwd, verifycode } = e.detail.value
      try {
        const response = await login_jxfw(account, pwd, verifycode)

        if (isStatusSuccess(response.statusCode)) {
          getTermStartWeek()
            .then((res) => {
              if (isStatusSuccess(res.statusCode))
                storage.termStartDate = res.data[0].rq
            })
            .catch((err) =>
              console.log(`[GetTermStartWeek] ${JSON.stringify(err)}`)
            )

          getAllCourses()
            .then((res) => {
              if (isStatusSuccess(res.statusCode)) storage.setCourses(res.data)
            })
            .catch((err) =>
              console.log(`[GetAllCourses] ${JSON.stringify(err)}`)
            )
          setTimeout(() => {
            Taro.navigateBack()
          }, 1500)
          showLoginSuccess()
          Taro.setStorageSync("isLoggedin", true)
        } else {
          showLoginFailed()
        }
      } catch (err) {
        console.log(`[LoginJXFW] ${JSON.stringify(err)}`)
        showLoginFailed()
      }
    }

    return { getTimestampMS, captchaSrc, formSubmit }
  },
}
</script>
