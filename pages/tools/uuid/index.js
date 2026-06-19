const uuid = require('../../../utils/tools/uuid')
Page({ data:{ output:'' }, gen(){ this.setData({ output: uuid.execute() }) }, copyOutput(){ wx.setClipboardData({ data: this.data.output||'' , success(){ wx.showToast({ title:'已复制' }) } }) } })
