const ts = require('../../../utils/tools/timestamp')
Page({ data:{ input:'', output:'' }, onInput(e){ this.setData({ input: e.detail.value }) }, convert(){ try{ const out = ts.execute(this.data.input); this.setData({ output: out }) }catch(e){ wx.showToast({ title: e.message||'转换失败', icon:'none' }) } } })
