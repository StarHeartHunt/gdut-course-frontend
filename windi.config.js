export default {
  prefixer: false,
  extract: {
    // 忽略部分文件夹
    exclude: ["node_modules", ".git", "dist"],
  },
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#48B0F1",
          50: "#7ae2ff",
          100: "#70d8ff",
          200: "#66ceff",
          300: "#5cc4ff",
          400: "#52bafb",
          500: "#48b0f1",
          600: "#3ea6e7",
          700: "#349cdd",
          800: "#2a92d3",
          900: "#2088c9",
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    // 禁用掉在小程序环境中不可能用到的 plugins
    container: false,
  },
}
