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
  },
  onShow() { 
    try { 
      console.log('tools page onShow, route:', (getCurrentPages()||[]).map(p=>p.route))
      const tabBar = this.getTabBar && this.getTabBar()
      if (tabBar) tabBar.setData({ active: 0 })
    }catch(e){} 
  },

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
