import Taro from "@tarojs/taro"

export const showLoginTipAndRedirect = () => {
  Taro.showModal({
    title: "提示",
    content: "您尚未登录，请先登录",
    success: function (res) {
      if (res.confirm) {
        Taro.navigateTo({ url: "/pages/subpages/pages/login/index" })
      }
    },
  })
}
