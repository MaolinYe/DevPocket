const du = require('../../../utils/tools/dedupe')
Page({ data:{ input:'', output:'' }, onInput(e){ this.setData({ input: e.detail.value }) }, run(){ try{ const out = du.execute(this.data.input||''); this.setData({ output: out }) }catch(e){ wx.showToast({ title:'去重失败', icon:'none' }) } }, copy(){ wx.setClipboardData({ data: this.data.output||'', success(){ wx.showToast({ title:'已复制' }) } }) } })
