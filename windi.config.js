export default {
  prefixer: false,
  extract: {
    // 忽略部分文件夹
    exclude: ['node_modules', '.git', 'dist']
  },
  plugins: [require("daisyui")],
  corePlugins: {
    // 禁用掉在小程序环境中不可能用到的 plugins
    container: false
  }
}
