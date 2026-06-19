// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    console.log('App onLaunch start')
    // 加载工具配置到全局，便于页面统一读取
    try {
      const tools = require('./config/tools')
      this.globalData.tools = tools || []
    } catch (e) {
      console.warn('无法加载工具配置', e)
      this.globalData.tools = []
    }

    console.log('App onLaunch end')
  },
  onShow() {
    try { console.log('App onShow, current pages:', (getCurrentPages() || []).map(p => p.route)) } catch(e){}
    // 不在 onShow 中强制切换 tab，避免触发基础库超时问题
  },
  globalData: {
    userInfo: null,
    tools: []
  }
})
