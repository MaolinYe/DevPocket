const tabs = [
  { pagePath: '/pages/tools/index' },
  { pagePath: '/pages/recent/index' },
  { pagePath: '/pages/profile/index' }
]
Component({
  data: { active: 0 },
  attached(){
    this.updateActive()
  },
  methods: {
    updateActive(){
      try{
        const pages = getCurrentPages()
        const route = pages.length ? ('/' + pages[pages.length-1].route) : '/pages/tools/index'
        const idx = tabs.findIndex(t => t.pagePath === route)
        this.setData({ active: idx === -1 ? 0 : idx })
      }catch(e){ this.setData({ active: 0 }) }
    },
    switchTab(e){
      const path = e.currentTarget.dataset.path
      if(!path) return
      wx.switchTab({ url: path })
    }
  }
})
