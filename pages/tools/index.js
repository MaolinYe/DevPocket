const app = getApp()
const recent = require('../../utils/recent')

Page({
  data: {
    tools: [],
    filteredTools: [],
    query: ''
  },

  onLoad() {
    console.log('tools page onLoad')
    const tools = (app && app.globalData && app.globalData.tools) || []
    this.setData({ tools, filteredTools: tools })
    // register custom tab-bar if present
    try{ const tabBar = this.getTabBar && this.getTabBar(); if(tabBar){ tabBar.updateActive && tabBar.updateActive() } }catch(e){}
  },
  onShow() { try { console.log('tools page onShow, route:', (getCurrentPages()||[]).map(p=>p.route)) }catch(e){} },

  onSearch(e) {
    const q = (e.detail.value || '').trim().toLowerCase()
    const filtered = this.data.tools.filter(t => t.name.toLowerCase().includes(q) || t.id.toLowerCase().includes(q))
    this.setData({ query: q, filteredTools: filtered })
  },

  onToolClick(e) {
    const id = e.currentTarget.dataset.id
    const tool = this.data.tools.find(t => t.id === id)
    if (!tool) return
    // 记录最近使用，再跳转
    try { recent.recordRecent(id) } catch (err) { console.warn('recordRecent fail', err) }
    wx.navigateTo({ url: tool.page + '?id=' + id })
  }
})
