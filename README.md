# kaiklife/RSSHub — 自定义 Fork

本项目是 [DIYgod/RSSHub](https://github.com/DIYgod/RSSHub) 的定制 Fork，在原版超 5000+ 路由的基础上，额外添加了以下自定义路由和环境变量支持。

## 🚀 自定义路由

### 1. Threads 用户时间线（增强版）

> 在原版 `/threads/:user` 路由基础上，增加了 Cookie 认证支持，解决 Threads 登录墙导致只能获取 4-5 条公开帖子的限制。

**路由地址：**

```
/threads/:user
```

**参数说明：**

| 参数                           | 说明                                                  | 默认值  |
| ------------------------------ | ----------------------------------------------------- | ------- |
| `showAuthorInTitle`            | 在标题中显示作者                                      | `true`  |
| `showAuthorInDesc`             | 在描述中显示作者                                      | `true`  |
| `showAuthorAvatarInDesc`       | 在描述中显示作者头像                                  | `false` |
| `showQuotedAuthorAvatarInDesc` | 在描述中显示引用作者头像                              | `false` |
| `showEmojiForQuotesAndReply`   | 使用 🔁↩️ 代替 QT/Re                                  | `true`  |
| `showQuotedInTitle`            | 在标题中显示引用内容                                  | `true`  |
| `replies`                      | 显示回复                                              | `true`  |
| `cookie`                       | sessionid 值，绕过 Threads 登录墙（**覆盖环境变量**） | 空      |

**环境变量：**

| 变量             | 说明                                      | 示例值                          |
| ---------------- | ----------------------------------------- | ------------------------------- |
| `THREADS_COOKIE` | Threads 登录 Cookie（完整 Cookie 字符串） | `sessionid=xxx; ds_user_id=xxx` |

**Cookie 优先级：**

1. 路由参数 `?cookie=xxx`（最高优先级）
2. 环境变量 `THREADS_COOKIE`
3. 无 Cookie（仅公开帖子）

**完整示例：**

```
# 通过环境变量（推荐）
THREADS_COOKIE="sessionid=xxx; ds_user_id=xxx" docker run ...

# 通过路由参数临时覆盖
http://localhost:12005/threads/mensennnnna?cookie=your_sessionid_here
```

---

### 2. CodeBuddy WorkBuddy 更新日志

> 抓取腾讯云代码助手 CodeBuddy 旗下 WorkBuddy 桌面客户端的官方更新日志页面，生成 RSS feed。

**路由地址：**

```
/codebuddy/workbuddy/changelog
```

**参数说明：**

| 参数    | 说明       | 默认值 |
| ------- | ---------- | ------ |
| `limit` | 返回条目数 | `50`   |

**来源页面：** https://www.codebuddy.cn/docs/workbuddy/Changelog

**完整示例：**

```
# 获取最新 10 条更新
http://localhost:12005/codebuddy/workbuddy/changelog?limit=10

# 获取全部更新
http://localhost:12005/codebuddy/workbuddy/changelog
```

---

## 🏗️ 部署

### Docker / Docker Compose

使用阿里云 ACR 镜像：

```yaml
services:
    rsshub:
        image: registry.cn-heyuan.aliyuncs.com/daily_images/rsshub:latest
        container_name: rsshub
        ports:
            - '12005:1200'
        environment:
            THREADS_COOKIE: 'sessionid=xxx; ds_user_id=xxx'
        restart: unless-stopped
```

### 手动构建

```bash
# 克隆
git clone https://github.com/kaiklife/RSSHub.git
cd RSSHub

# 安装依赖
npm install

# 启动
THREADS_COOKIE="sessionid=xxx; ds_user_id=xxx" npm run dev
```

### 阿里云 ACR 自动构建

打 tag 推送即可触发 ACR 自动构建：

```bash
git tag release-v0.1.2 -f
git tag latest -f
git push origin --tags -f
```

构建规则：`release-v$version` 格式 tag → 镜像标签 `$version`

---

## 📋 版本记录

### v0.1.2（当前）

**新增：**

- `CodeBuddy WorkBuddy 更新日志` 路由：`/codebuddy/workbuddy/changelog`
- 通过 `got` + `cheerio` 抓取 VitePress 预渲染页面
- 支持 `?limit=N` 参数控制条目数
- 支持 FreshRSS Radar 自动发现

**文件：**

- `lib/routes/codebuddy/` — 新增命名空间
    - `namespace.ts` — 命名空间配置
    - `index.ts` — 路由处理 + route 导出
    - `README.md` — 路由文档

### v0.1.1

**新增：**

- Threads 路由 Cookie 认证支持（`THREADS_COOKIE` 环境变量）
- 支持通过路由参数 `cookie` 临时覆盖 Cookie

**修复：**

- 修复 TDZ（Temporal Dead Zone）变量声明顺序错误

**文件变更：**

- `lib/routes/threads/utils.ts` — 新增 `authHeaders` Cookie 注入
- `lib/routes/threads/index.ts` — 新增 Cookie 参数支持和优先级逻辑

---

## 🔗 相关链接

- 上游项目：[DIYgod/RSSHub](https://github.com/DIYgod/RSSHub)
- 官方文档：https://docs.rsshub.app
- Fork 仓库：https://github.com/kaiklife/RSSHub
