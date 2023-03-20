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
      cookies: Taro.getStorageSync("cookies"),
      account: account,
      pwd: encrypt(pwd, verifycode),
      verifycode: verifycode,
    },
    method: "POST",
  })
}

export const getAllCourses = () => {
  return Taro.request({
    url: `${process.env.BACKEND_URL}/courses/`,
    method: "POST",
    data: { cookies: Taro.getStorageSync("cookies"), semester: "202202" },
  })
}

export const getTermStartWeek = () => {
  return Taro.request({
    url: `${process.env.BACKEND_URL}/courses/termStartWeek`,
    method: "POST",
    data: { cookies: Taro.getStorageSync("cookies"), semester: "202202" },
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
    data: {
      cookies: cookies,
    },
    method: "POST",
  })
}
