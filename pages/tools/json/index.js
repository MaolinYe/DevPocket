const jsonTool = require('../../../utils/tools/json')

Page({
  data:{ input:'', output:'' },
  onInput(e){ this.setData({ input: e.detail.value }) },
  formatJson(){ try{ const out = jsonTool.execute(this.data.input); this.setData({ output: out }) }catch(e){ wx.showToast({ title: e.message||'解析失败', icon:'none' }) } },
  minifyJson(){ try{ const out = JSON.stringify(JSON.parse(this.data.input)); this.setData({ output: out }) }catch(e){ wx.showToast({ title:'解析失败', icon:'none' }) } },
  copyOutput(){ wx.setClipboardData({ data: this.data.output||'' , success(){ wx.showToast({ title:'已复制' }) } }) }
})
