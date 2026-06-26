const inventory = require('../../../../utils/inventory')
const category = require('../../../../utils/category')
Page({
    data: {
        module: 'item',
        title: '物品管理',
        keyword: '',
        categories: ['全部'],
        activeCategory: '全部',
        list: [],
        filteredList: []
    },
    onLoad(options) {
        const module =
            options.module || 'item'
        this.setData({
            module,
            title:
                module === 'closet'
                    ? '衣橱管理'
                    : '物品管理'
        })
        wx.setNavigationBarTitle({
            title: this.data.title
        })
    },
    onShow() {
        this.loadData()
    },
    loadData() {
        const list =
            inventory.getByModule(
                this.data.module
            )
        const categories = [
            '全部',
            ...category.getCategories(
                this.data.module
            )
        ]
        this.setData({
            list,
            categories
        })
        this.filterData()
    },
    filterData() {
        let list = [...this.data.list]
        if (
            this.data.activeCategory !== '全部'
        ) {
            list = list.filter(
                item =>
                    item.category ===
                    this.data.activeCategory
            )
        }
        const keyword =
            this.data.keyword.trim()
        if (keyword) {
            list = list.filter(item => {
                return (
                    (item.name || '')
                        .includes(keyword) ||
                    (item.remark || '')
                        .includes(keyword)
                )
            })
        }
        this.setData({
            filteredList: list
        })
    },
    onSearch(e) {
        this.setData({
            keyword: e.detail.value
        })
        this.filterData()
    },
    switchCategory(e) {
        this.setData({
            activeCategory:
                e.currentTarget.dataset.category
        })
        this.filterData()
    },
    goAdd() {
        wx.navigateTo({
            url:
                '/pages/tools/inventory/edit/index?module=' +
                this.data.module
        })
    },
    openDetail(e) {
        wx.navigateTo({
            url:
                '/pages/tools/inventory/detail/index?id=' +
                e.currentTarget.dataset.id
        })
    }
})