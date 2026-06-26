const STORAGE_KEY = 'inventory_data'

function getAll() {
    return wx.getStorageSync(STORAGE_KEY) || []
}

function saveAll(data) {
    wx.setStorageSync(STORAGE_KEY, data)
}

function add(item) {
    const list = getAll()
    list.unshift(item)
    saveAll(list)
}

function update(id, data) {
    const list = getAll()

    const index = list.findIndex(
        item => item.id === id
    )

    if (index === -1) return

    const oldItem = list[index]

    if (
        oldItem.imagePath &&
        data.imagePath &&
        oldItem.imagePath !== data.imagePath &&
        oldItem.imagePath.startsWith(wx.env.USER_DATA_PATH)
    ) {
        try {
            wx.getFileSystemManager().unlinkSync(
                oldItem.imagePath
            )
        } catch (e) {
            console.log('旧图片删除失败', e)
        }
    }

    list[index] = {
        ...oldItem,
        ...data
    }

    saveAll(list)
}

function remove(id) {

    const list = getAll()

    const target = list.find(
        item => item.id === id
    )

    if (
        target &&
        target.imagePath &&
        target.imagePath.startsWith(wx.env.USER_DATA_PATH)
    ) {
        try {
            wx.getFileSystemManager().unlinkSync(
                target.imagePath
            )
        } catch (e) {
            console.log('图片删除失败', e)
        }
    }

    saveAll(
        list.filter(
            item => item.id !== id
        )
    )
}

function getById(id) {
    return getAll().find(
        item => item.id === id
    )
}

function getByModule(module) {
    return getAll().filter(
        item => item.module === module
    )
}

module.exports = {
    getAll,
    saveAll,
    add,
    update,
    remove,
    getById,
    getByModule
}