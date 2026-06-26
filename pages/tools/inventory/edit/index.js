const inventory = require('../../../../utils/inventory')
const category = require('../../../../utils/category')
Page({
    data: {
        module: '',
        id: '',
        image: '',
        name: '',
        category: '',
        remark: '',
        categories: [],
        categoryIndex: -1
    },
    onLoad(options) {
        const id = options.id
        if (id) {
            const item = inventory.getById(id)
            this.setData({
                id,
                module: item.module,
                image: item.imagePath,
                name: item.name,
                category: item.category,
                remark: item.remark
            })
        } else {
            this.setData({
                module: options.module || 'item'
            })
        }
        this.loadCategories()
    },
    chooseImage() {
        wx.chooseMedia({
            count: 1,
            mediaType: ['image'],
            success: res => {
                this.setData({
                    image: res.tempFiles[0].tempFilePath
                })
            },
            fail: err => {
                console.error(err)
            }
        })
    },
    onName(e) {
        this.setData({
            name: e.detail.value
        })
    },
    onCategory(e) {
        this.setData({
            category: e.detail.value
        })
    },
    onRemark(e) {
        this.setData({
            remark: e.detail.value
        })
    },
    loadCategories() {
        const categories =
            category.getCategories(
                this.data.module
            )
        const index =
            categories.indexOf(
                this.data.category
            )
        this.setData({
            categories,
            categoryIndex: index
        })
    },
    onCategoryChange(e) {
        const index =
            Number(e.detail.value)
        this.setData({
            categoryIndex: index,
            category:
                this.data.categories[index]
        })
    },
    addCategory() {
        wx.showModal({
            title: '新增分类',
            editable: true,
            placeholderText: '输入分类名称',
            success: res => {
                const name =
                    (res.content || '').trim()
                if (!name) return
                const success =
                    category.addCategory(
                        this.data.module,
                        name
                    )
                if (!success) {
                    wx.showToast({
                        title: '分类已存在',
                        icon: 'none'
                    })
                    return
                }
                this.loadCategories()
                wx.showToast({
                    title: '已添加'
                })
            }
        })
    },
    save() {
        if (
            !this.data.name ||
            !this.data.image
        ) {
            wx.showToast({
                title: '请填写完整',
                icon: 'none'
            })
            return
        }
        const saveItem = imagePath => {
            const item = {
                id:
                    this.data.id ||
                    Date.now() + '',
                module: this.data.module,
                imagePath,
                name: this.data.name,
                category:
                    this.data.category ||
                    '未分类',
                remark:
                    this.data.remark || '',
                createTime:
                    this.data.id
                        ? inventory.getById(
                            this.data.id
                        ).createTime
                        : Date.now()
            }
            if (this.data.id) {
                inventory.update(
                    this.data.id,
                    item
                )
            } else {
                inventory.add(item)
            }
            wx.showToast({
                title: '已保存'
            })
            setTimeout(() => {
                wx.navigateBack()
            }, 600)
        }
        // 已经是永久文件
        if (
            this.data.image.startsWith(
                wx.env.USER_DATA_PATH
            )
        ) {
            saveItem(this.data.image)
            return
        }
        const ext =
            this.data.image
                .split('.')
                .pop() || 'jpg'
        const targetPath =
            `${wx.env.USER_DATA_PATH}/${Date.now()}.${ext}`
        wx.saveFile({
            tempFilePath:
                this.data.image,
            filePath:
                targetPath,
            success: res => {
                saveItem(
                    res.savedFilePath
                )
            },
            fail: err => {
                console.error(err)
                wx.showToast({
                    title: '图片保存失败',
                    icon: 'none'
                })
            }
        })
    }
})