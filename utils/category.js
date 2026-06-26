const DEFAULT = {
    closet: [
        '上衣',
        '裤子',
        '外套',
        '鞋子',
        '帽子',
        '包包',
        '配饰',
        '其他'
    ],
    item: [
        '数码',
        '工具',
        '证件',
        '书籍',
        '收藏',
        '日用品',
        '其他'
    ]
}
function getKey(module) {
    return `${module}_categories`
}
function getCategories(module) {
    const key = getKey(module)
    const data = wx.getStorageSync(key)
    if (data && data.length) {
        return data
    }
    wx.setStorageSync(
        key,
        DEFAULT[module] || []
    )
    return DEFAULT[module] || []
}
function addCategory(module, name) {
    const list = getCategories(module)
    if (list.includes(name)) {
        return false
    }
    list.push(name)
    wx.setStorageSync(
        getKey(module),
        list
    )
    return true
}
function removeCategory(module, name) {
    const list = getCategories(module)
    wx.setStorageSync(
        getKey(module),
        list.filter(
            item => item !== name
        )
    )
}
module.exports = {
    getCategories,
    addCategory,
    removeCategory
}