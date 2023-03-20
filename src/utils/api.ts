import Taro from "@tarojs/taro"
import { encrypt } from "./aes"

export const isStatusSuccess = (statusCode: number) => {
  return statusCode >= 200 && statusCode < 400
}

export const login_jxfw = (
  account: string,
  pwd: string,
  verifycode: string
) => {
  return Taro.request({
    url: `${process.env.BACKEND_URL}/auth/login`,
    data: {
      account: account,
      pwd: encrypt(pwd, verifycode),
      verifycode: verifycode,
    },
    header: {
      "X-Cookie": Taro.getStorageSync("cookies"),
    },
    method: "POST",
  })
}

export const getAllCourses = () => {
  return Taro.request({
    url: `${process.env.BACKEND_URL}/courses/`,
    method: "GET",
    data: { semester: "202202" },
    header: {
      "X-Cookie": Taro.getStorageSync("cookies"),
    },
  })
}

export const getTermStartWeek = () => {
  return Taro.request({
    url: `${process.env.BACKEND_URL}/courses/termStartWeek`,
    method: "GET",
    data: { semester: "202202" },
    header: {
      "X-Cookie": Taro.getStorageSync("cookies"),
    },
  })
}

export const initAuth = () => {
  return Taro.request({
    url: `${process.env.BACKEND_URL}/auth/init`,
    method: "GET",
  })
}

export const getVerifyCode = (cookies: string) => {
  return Taro.request({
    url: `${process.env.BACKEND_URL}/auth/verify`,
    header: {
      "X-Cookie": cookies,
    },
    method: "POST",
  })
}
