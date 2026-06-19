Page({ data:{ src:'', targetW:'800', targetH:'600', preview:'', working:false },
  chooseImage(){ const self=this; wx.chooseImage({ count:1, success(res){ self.setData({ src: res.tempFilePaths[0], preview: res.tempFilePaths[0] }) } }) },
  onWidth(e){ this.setData({ targetW: e.detail.value }) },
  onHeight(e){ this.setData({ targetH: e.detail.value }) },
  compress(){ const self=this; if(!this.data.src){ wx.showToast({ title:'请先选择图片', icon:'none' }); return }
    const w= parseInt(this.data.targetW)||800; const h=parseInt(this.data.targetH)||600; this.setData({ working:true })
    wx.getImageInfo({ src: this.data.src, success(info){ const ratio = info.width/info.height; let dw=w, dh=h; if(!self.data.targetW || !self.data.targetH){ if(info.width>info.height){ dw = w; dh = Math.round(w/ratio) } else { dh = h; dw = Math.round(h*ratio) } }
      const systemInfo = wx.getSystemInfoSync(); const canvasId='compressCanvas'; const query = wx.createSelectorQuery(); query.select('#'+canvasId).fields({ node:true, size:true }).exec(()=>{
        const ctx = wx.createCanvasContext(canvasId, self);
        ctx.drawImage(self.data.src, 0, 0, dw, dh);
        ctx.draw(false, setTimeout(()=>{
          wx.canvasToTempFilePath({ canvasId, width: dw, height: dh, destWidth: dw, destHeight: dh, success(res){ self.setData({ preview: res.tempFilePath, working:false }); wx.showToast({ title:'压缩完成' }) }, fail(err){ self.setData({ working:false }); wx.showToast({ title:'生成失败', icon:'none' }) } }, self)
        },100));
      });
    }, fail(){ this.setData({ working:false }); wx.showToast({ title:'读取图片失败', icon:'none' }) } }) },
  saveImage(){ const self=this; if(!this.data.preview){ wx.showToast({ title:'没有可保存的图片', icon:'none' }); return }
    wx.saveImageToPhotosAlbum({ filePath: this.data.preview, success(){ wx.showToast({ title:'已保存到相册' }) }, fail(err){ if(err.errMsg && err.errMsg.indexOf('auth')!==-1){ wx.showModal({ title:'权限', content:'请授权保存到相册', showCancel:false }) } else{ wx.showToast({ title:'保存失败', icon:'none' }) } } }) }
})
