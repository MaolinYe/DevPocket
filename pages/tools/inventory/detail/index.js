const inventory = require('../../../../utils/inventory')
Page({
    data: {
        item: {},
        time: ''
    },
    onLoad(options) {
        const item = inventory.getById(options.id)
        this.setData({
            item,
            time: this.formatTime(item.createTime)
        })
    },
    formatTime(t) {
        const d = new Date(t)
        return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
    },
    edit() {
        wx.navigateTo({
            url: `/pages/tools/inventory/edit/index?id=${this.data.item.id}`
        })
    },
    remove() {
        wx.showModal({
            title: '确认删除',
            content: '删除后不可恢复',
            success: res => {
                if (!res.confirm) return
                inventory.remove(this.data.item.id)
                wx.showToast({ title: '已删除' })
                setTimeout(() => wx.navigateBack(), 600)
            }
        })
    }
})