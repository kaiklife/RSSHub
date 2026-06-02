# CodeBuddy WorkBuddy Changelog RSS 路由

## 路由信息

- **路径**: `/codebuddy/workbuddy/changelog`
- **命名空间**: `codebuddy` (codebuddy.cn)
- **源页面**: https://www.codebuddy.cn/docs/workbuddy/Changelog
- **类别**: `program-update`

## 文件清单

| 文件           | 描述                             |
| -------------- | -------------------------------- |
| `namespace.ts` | 命名空间配置（名称、URL、语言）  |
| `index.ts`     | 路由处理（handler + route 导出） |

## 实现说明

### 抓取方式

VitePress 静态站点生成，页面内容在 HTML 中预渲染。使用 `got` + `cheerio` 直接抓取，**无需 Puppeteer/Playwright**。

### 页面结构

```
<main class="main">
  <div class="vp-doc _docs_workbuddy_Changelog">
    <div>                          ← 内容容器
      <h1>...</h1>                 ← 页面标题
      <h2>...</h2>                 ← 版本标题
      <ul>/<p>/<div>...</div>      ← 版本内容
      <h2>...</h2>                 ← 下一版本
      ...
    </div>
  </div>
</main>
```

### 解析逻辑

1. `$('main h2')` 收集所有版本标题
2. `$('main .vp-doc > div').children()` 遍历所有直接子节点
3. 遇到 h2 切到下一版本条目
4. 其他元素（ul/p/div/blockquote/pre/hr）追加到当前条目 description

### 日期解析

正则 `\(?(\d{4}-\d{2}-\d{2})\)?` 从标题中提取日期：

- `4.21.0 版本发布 🚀(2026-04-28)` → `2026-04-28`
- `4.7.5（2026-03-30）` → `2026-03-30`
- 无日期的条目省略 pubDate（RSSHub 原则：不伪造日期）

### 输出

- 44 条版本记录（4.5.0 ~ 4.24.3）
- 带完整的版本描述（修复列表、新增功能等）
- 支持 RSSHub 标准 `?limit=N` 参数控制条目数
- 支持 RSSHub radar 自动发现

## 变更历史

| 日期       | 说明                   |
| ---------- | ---------------------- |
| 2026-06-02 | 初始创建，完整实现路由 |
