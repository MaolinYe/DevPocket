const app = getApp()
const recentUtil = require('../../utils/recent')

Page({
  data: { recentList: [], tools: [] },

  onShow() {
    console.log('recent page onShow')
    const tools = (app && app.globalData && app.globalData.tools) || []
    const recentList = recentUtil.getRecent()
    const recentItems = recentList.map(id => {
      const t = (tools || []).find(x => x.id === id) || {}
      return { id, name: t.name || id, icon: t.icon || '⚙️' }
    })
    this.setData({ recentList, recentItems, tools })
  },

  onToolClick(e) {
    const id = e.currentTarget.dataset.id
    const tool = (this.data.tools || []).find(t => t.id === id)
    if (!tool) return
    recentUtil.recordRecent(id)
    wx.navigateTo({ url: tool.page + '?id=' + id })
  },

  onClear() {
    wx.showModal({ title: '清空记录', content: '确定清空最近使用记录吗？', success: res => {
      if (res.confirm) {
        recentUtil.clearRecent()
        this.setData({ recentList: [], recentItems: [] })
      }
    }})
  },

  onRemove(e){
    // stop propagation on button tap
    const id = e.currentTarget.dataset.id
    if(!id) return
    recentUtil.removeRecent(id)
    const recentList = recentUtil.getRecent()
    const recentItems = recentList.map(id => { const t = (this.data.tools||[]).find(x=>x.id===id)||{}; return { id, name: t.name||id, icon: t.icon||'filter' } })
    this.setData({ recentList, recentItems })
  },

  goToTools() { wx.switchTab({ url: '/pages/tools/index' }) }
})
