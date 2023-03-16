export default {
  pages: [
    "pages/schedule/schedule",
    "pages/score/score",
    "pages/settings/settings",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#1f2937",
    selectedColor: "#48b0f1",
    backgroundColor: "#ffffff",
    list: [
      {
        iconPath: "assets/images/a.png",
        selectedIconPath: "assets/images/a.png",
        pagePath: "pages/schedule/schedule",
        text: "课表",
      },
      {
        iconPath: "assets/images/a.png",
        selectedIconPath: "assets/images/a.png",
        pagePath: "pages/score/score",
        text: "成绩",
      },
      {
        iconPath: "assets/images/a.png",
        selectedIconPath: "assets/images/a.png",
        pagePath: "pages/settings/settings",
        text: "设置",
      },
    ],
  },
}
