const tabs = [
  { pagePath: '/pages/tools/index' },
  { pagePath: '/pages/recent/index' },
  { pagePath: '/pages/profile/index' }
]
Component({
  data: { active: 0 },
  methods: {
    switchTab(e){
      const path = e.currentTarget.dataset.path
      if(!path) return
      const idx = tabs.findIndex(t => t.pagePath === path)
      this.setData({ active: idx })
      wx.switchTab({ url: path })
    }
  }
})
