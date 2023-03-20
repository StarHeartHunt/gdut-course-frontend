import Taro from "@tarojs/taro"

export const showLoginFailed = () => {
  Taro.showToast({
    title: "登录失败",
    icon: "none",
  })
}

export const showLoginSuccess = () => {
  Taro.showToast({
    title: "登录成功",
    icon: "success",
  })
}
