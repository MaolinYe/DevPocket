# 程序员口袋（WeChat 小程序）

这是一个面向程序员与互联网从业者的纯前端工具箱小程序骨架，采用微信原生小程序技术栈（WXML / WXSS / JS），所有数据本地存储，无后端依赖。

主要功能：
- 工具页：常用开发、文本、图片与 AI 工具集合
- 最近页：记录最近使用的工具
- 我的页：关于、反馈、分享

结构说明：
- /config/tools.js - 工具配置中心
- /pages/tools - 工具入口，所有工具已拆分为独立页面（无 handler）
- /pages/recent - 最近页
- /pages/profile - 我的页
- /utils/recent.js - 最近记录工具类（recordRecent / getRecent / clearRecent）

打开方法：
1. 使用微信开发者工具打开本项目目录
2. 预览或编译运行

可扩展性：
- 通过 /config/tools.js 添加新工具（指定 id、name、icon、page）
 - 工具实现分散在 `pages/tools/<tool>/index.*`，通过 `config/tools.js` 管理
# DevPocket
DevPocket
