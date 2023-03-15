export default {
  pages: ["pages/index/index", "pages/index2/index2"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#000000",
    selectedColor: "#7f7f7f",
    backgroundColor: "#ffffff",
    list: [
      {
        pagePath: "pages/index/index",
        text: "组件",
      },
      {
        pagePath: "pages/index2/index2",
        text: "组件2",
      },
    ],
  },
}
