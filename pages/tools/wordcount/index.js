const wc = require('../../../utils/tools/wordcount')
Page({ data:{ input:'', chars:0, words:0 }, onInput(e){ this.setData({ input: e.detail.value }) }, count(){ try{ const r = wc.execute(this.data.input||''); this.setData({ chars: r.chars, words: r.words }) }catch(e){ wx.showToast({ title:'统计失败', icon:'none' }) } } })
