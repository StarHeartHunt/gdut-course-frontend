export default {
  lazyCodeLoading: "requiredComponents",
  pages: ["pages/schedule/index", "pages/score/index", "pages/settings/index"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#48b0f1",
    navigationBarTitleText: "GDUTCourse",
    navigationBarTextStyle: "white",
  },
  tabBar: {
    color: "#1f2937",
    selectedColor: "#48b0f1",
    backgroundColor: "#ffffff",
    list: [
      {
        iconPath: "assets/images/a.png",
        selectedIconPath: "assets/images/a.png",
        pagePath: "pages/schedule/index",
        text: "课表",
      },
      {
        iconPath: "assets/images/a.png",
        selectedIconPath: "assets/images/a.png",
        pagePath: "pages/score/index",
        text: "成绩",
      },
      {
        iconPath: "assets/images/a.png",
        selectedIconPath: "assets/images/a.png",
        pagePath: "pages/settings/index",
        text: "设置",
      },
    ],
  },
  subpackages: [
    {
      root: "pages/subpages",
      pages: ["pages/login/index"],
    },
  ],
}
