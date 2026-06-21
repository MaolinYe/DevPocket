Page({

  data: {
    src: '',
    resultSrc: '',

    quality: 70,
    qualityText: '推荐压缩，适合分享',

    originWidth: 0,
    originHeight: 0,
    originSize: '',

    previewWidth: 0,
    previewHeight: 0,

    resultWidth: 0,
    resultHeight: 0,
    resultSize: '',

    savedPercent: 0,

    canvasWidth: 0,
    canvasHeight: 0
  },

  chooseImage() {

    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],

      success: (res) => {

        const file = res.tempFiles[0]

        wx.getImageInfo({
          src: file.tempFilePath,

          success: (img) => {

            this.setData({
              src: file.tempFilePath,
              resultSrc: '',

              originWidth: img.width,
              originHeight: img.height,

              originSize: this.formatSize(file.size)
            })

            this.updatePreviewSize()
          }
        })

      }
    })

  },

  updatePreviewSize() {

    if (!this.data.originWidth) return

    const scale = this.data.quality / 100

    this.setData({
      previewWidth: Math.round(
        this.data.originWidth * scale
      ),

      previewHeight: Math.round(
        this.data.originHeight * scale
      )
    })

  },

  updateQualityText(value) {

    let text = ''

    if (value >= 90) {
      text = '接近原图质量'
    }
    else if (value >= 75) {
      text = '标准压缩，画质良好'
    }
    else if (value >= 60) {
      text = '推荐压缩，适合分享'
    }
    else {
      text = '极限压缩，体积最小'
    }

    this.setData({
      qualityText: text
    })

    this.updatePreviewSize()

  },

  onQualityChanging(e) {

    const value = Number(e.detail.value)

    this.setData({
      quality: value
    })

    this.updateQualityText(value)

  },

  onQualityChange(e) {

    const value = Number(e.detail.value)

    this.setData({
      quality: value
    })

    this.updateQualityText(value)

  },

  compressImage() {

    if (!this.data.src) {

      wx.showToast({
        title: '请先选择图片',
        icon: 'none'
      })

      return
    }

    wx.showLoading({
      title: '压缩中...'
    })

    const scale = this.data.quality / 100

    const width = Math.round(
      this.data.originWidth * scale
    )

    const height = Math.round(
      this.data.originHeight * scale
    )

    this.setData({
      canvasWidth: width,
      canvasHeight: height
    })

    setTimeout(() => {

      const ctx = wx.createCanvasContext(
        'compressCanvas'
      )

      ctx.clearRect(
        0,
        0,
        width,
        height
      )

      ctx.drawImage(
        this.data.src,
        0,
        0,
        width,
        height
      )

      ctx.draw(false, () => {

        setTimeout(() => {

          wx.canvasToTempFilePath({

            canvasId: 'compressCanvas',

            width,
            height,

            destWidth: width,
            destHeight: height,

            success: (res) => {

              wx.getFileSystemManager()
                .getFileInfo({

                  filePath: res.tempFilePath,

                  success: (fileInfo) => {

                    const originBytes =
                      this.parseSize(
                        this.data.originSize
                      )

                    const newBytes =
                      fileInfo.size

                    const percent =
                      Math.max(
                        0,
                        Math.round(
                          (
                            originBytes -
                            newBytes
                          ) /
                          originBytes *
                          100
                        )
                      )

                    wx.hideLoading()

                    this.setData({

                      resultSrc:
                        res.tempFilePath,

                      resultWidth:
                        width,

                      resultHeight:
                        height,

                      resultSize:
                        this.formatSize(
                          newBytes
                        ),

                      savedPercent:
                        percent

                    })

                    wx.showModal({
                      title: '压缩成功',
                      content:
                        `原图：${this.data.originSize}\n` +
                        `压缩后：${this.formatSize(newBytes)}\n` +
                        `节省：${percent}%`,
                      showCancel: false
                    })

                  },

                  fail: () => {

                    wx.hideLoading()

                    wx.showToast({
                      title: '获取文件信息失败',
                      icon: 'none'
                    })

                  }

                })

            },

            fail: (err) => {

              wx.hideLoading()

              console.error(err)

              wx.showToast({
                title: '压缩失败',
                icon: 'none'
              })

            }

          })

        }, 300)

      })

    }, 50)

  },

  saveImage() {

    if (!this.data.resultSrc) {
      return
    }

    wx.saveImageToPhotosAlbum({

      filePath: this.data.resultSrc,

      success() {

        wx.showToast({
          title: '保存成功'
        })

      },

      fail() {

        wx.showToast({
          title: '保存失败',
          icon: 'none'
        })

      }

    })

  },

  formatSize(size) {

    if (size < 1024) {
      return size + ' B'
    }

    if (size < 1024 * 1024) {
      return (
        size / 1024
      ).toFixed(1) + ' KB'
    }

    return (
      size / 1024 / 1024
    ).toFixed(2) + ' MB'
  },

  parseSize(text) {

    if (text.includes('MB')) {
      return (
        parseFloat(text) *
        1024 *
        1024
      )
    }

    if (text.includes('KB')) {
      return (
        parseFloat(text) *
        1024
      )
    }

    return parseFloat(text)
  }

})