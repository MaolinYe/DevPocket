// utils/recent.js
const KEY = 'recentTools'

function recordRecent(toolId) {
  if (!toolId) return
  let arr = wx.getStorageSync(KEY) || []
  arr = arr.filter(id => id !== toolId)
  arr.unshift(toolId)
  if (arr.length > 20) arr = arr.slice(0, 20)
  wx.setStorageSync(KEY, arr)
}

function getRecent() {
  return wx.getStorageSync(KEY) || []
}

function clearRecent() {
  try { wx.removeStorageSync(KEY) } catch (e) { wx.setStorageSync(KEY, []) }
}

function removeRecent(toolId){
  if(!toolId) return
  let arr = wx.getStorageSync(KEY) || []
  arr = arr.filter(id => id !== toolId)
  wx.setStorageSync(KEY, arr)
}

module.exports = {
  recordRecent,
  getRecent,
  clearRecent
  ,removeRecent
}
