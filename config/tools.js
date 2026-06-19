// 工具配置中心
// 请在此文件中统一管理工具信息，页面从全局读取
module.exports = [
  // 开发工具
  { id: 'timestamp', name: '时间戳转换', icon: 'clock', page: '/pages/tools/timestamp/index' },
  { id: 'json', name: 'JSON格式化', icon: 'braces', page: '/pages/tools/json/index' },
  { id: 'base64', name: 'Base64编码', icon: 'code', page: '/pages/tools/base64/index' },
  { id: 'uuid', name: 'UUID生成', icon: 'hash', page: '/pages/tools/uuid/index' },
  { id: 'md5', name: 'MD5加密', icon: 'shield', page: '/pages/tools/md5/index' },
  { id: 'urlencode', name: 'URL编码', icon: 'link', page: '/pages/tools/urlencode/index' },

  // 文本工具
  { id: 'wordcount', name: '字数统计', icon: 'document', page: '/pages/tools/wordcount/index' },
  { id: 'caseconvert', name: '大小写转换', icon: 'text', page: '/pages/tools/caseconvert/index' },
  { id: 'dedupe', name: '文本去重', icon: 'filter', page: '/pages/tools/dedupe/index' },

  // 图片工具
  { id: 'imgcompress', name: '图片压缩', icon: 'image', page: '/pages/tools/imgcompress/index' },
  { id: 'img2base64', name: '图片转Base64', icon: 'image', page: '/pages/tools/img2base64/index' },
  { id: 'imginfo', name: '图片信息查看', icon: 'image', page: '/pages/tools/imginfo/index' },

  // AI工具
  { id: 'promptopt', name: 'Prompt优化', icon: 'sparkles', page: '/pages/tools/promptopt/index' }
]
