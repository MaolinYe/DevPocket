Page({ data:{ input:'', output:'' }, onInput(e){ this.setData({ input: e.detail.value }) }, optimize(){ const src = (this.data.input||'').trim(); if(!src){ wx.showToast({ title:'请输入 Prompt', icon:'none' }); return } // 基于简单规则优化
    let out = src
    // 1. 去除冗余空格
    out = out.replace(/\s+/g,' ')
    // 2. 增加角色/目的提示（示例）
    if(!/assistant|You are/i.test(out)){
      out = 'You are a helpful, concise assistant. ' + out
    }
    // 3. 给出示例输出要求
    out += '\n\nRequirements:\n- Provide concise, step-by-step answer when applicable.\n- Show code examples if relevant.\n'
    this.setData({ output: out }) }, copy(){ wx.setClipboardData({ data: this.data.output||'', success(){ wx.showToast({ title:'已复制' }) } }) } })
