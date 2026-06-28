# kaiklife/RSSHub — 自定义 Fork

本项目是 [DIYgod/RSSHub](https://github.com/DIYgod/RSSHub) 的定制 Fork。

- ✅ **保留上游全部 5000+ 路由**，功能与原版一致
- ✨ **额外新增 / 增强**了部分路由（见下方）

---

## 📖 全部路由分类索引

本 Fork 支持上游 RSSHub 的所有路由。
完整路由列表请访问官方文档：**[docs.rsshub.app/zh/routes/](https://docs.rsshub.app/zh/routes/)**
以下为按分类整理的常用路由索引，点击链接查看对应路由的详细参数。

### 社交媒体

| 分类             | 官方文档                                                | 支持站点（部分）                           |
| :--------------- | :------------------------------------------------------ | :----------------------------------------- |
| 💬 Bilibili      | [文档 →](https://docs.rsshub.app/zh/routes/bilibili)    | 视频、番剧、用户动态、直播、排行榜         |
| 💬 微博          | [文档 →](https://docs.rsshub.app/zh/routes/weibo)       | 用户时间线、热搜、关键词搜索、超话         |
| 💬 知乎          | [文档 →](https://docs.rsshub.app/zh/routes/zhihu)       | 热榜、专栏、用户动态、收藏夹               |
| 💬 Twitter / X   | [文档 →](https://docs.rsshub.app/zh/routes/twitter)     | 用户时间线、关键词搜索、列表               |
| 💬 Instagram     | [文档 →](https://docs.rsshub.app/zh/routes/picnob)      | 用户帖子、标签                             |
| 💬 Threads       | [文档 →](https://docs.rsshub.app/zh/routes/threads)     | 用户时间线（**本 Fork 增强 Cookie 支持**） |
| 💬 小红书        | [文档 →](https://docs.rsshub.app/zh/routes/xiaohongshu) | 用户笔记、笔记详情                         |
| 💬 抖音 / TikTok | [文档 →](https://docs.rsshub.app/zh/routes/douyin)      | 用户视频、热搜                             |
| 💬 微信公众号    | [文档 →](https://docs.rsshub.app/zh/routes/wechat)      | 文章搜索                                   |
| 💬 Telegram      | [文档 →](https://docs.rsshub.app/zh/routes/telegram)    | 频道、贴纸包                               |
| 💬 Discord       | [文档 →](https://docs.rsshub.app/zh/routes/discord)     | 频道消息                                   |
| 💬 其他          | [文档 →](https://docs.rsshub.app/zh/routes/)            | Medium、Reddit、YouTube、Niconico 等       |

### 新闻 / 新媒体

| 分类                           | 官方文档                                             | 支持站点（部分）           |
| :----------------------------- | :--------------------------------------------------- | :------------------------- |
| 📰 36氪                        | [文档 →](https://docs.rsshub.app/zh/routes/36kr)     | 快讯、文章                 |
| 📰 爱范儿                      | [文档 →](https://docs.rsshub.app/zh/routes/ifanr)    | 快讯                       |
| 📰 少数派                      | [文档 →](https://docs.rsshub.app/zh/routes/sspai)    | 热榜、分类                 |
| 📰 虎嗅                        | [文档 →](https://docs.rsshub.app/zh/routes/huxiu)    | 文章                       |
| 📰 澎湃新闻                    | [文档 →](https://docs.rsshub.app/zh/routes/thepaper) | 热榜                       |
| 📰 BBC / 纽约时报 / 华尔街日报 | [文档 →](https://docs.rsshub.app/zh/routes/)         | 分类新闻                   |
| 📰 其他                        | [文档 →](https://docs.rsshub.app/zh/routes/)         | 品玩、极客公园、界面新闻等 |

### 论坛 / 社区

| 分类            | 官方文档                                          | 支持站点（部分）                                     |
| :-------------- | :------------------------------------------------ | :--------------------------------------------------- |
| 💬 虎扑         | [文档 →](https://docs.rsshub.app/zh/routes/hupu)  | **NBA/CBA/足球新闻、球队新闻、热帖、社区、赛程比分** |
| 💬 V2EX         | [文档 →](https://docs.rsshub.app/zh/routes/v2ex)  | 主题、节点                                           |
| 💬 贴吧         | [文档 →](https://docs.rsshub.app/zh/routes/tieba) | 帖子                                                 |
| 💬 NGA          | [文档 →](https://docs.rsshub.app/zh/routes/nga)   | 论坛、帖子                                           |
| 💬 1point3acres | [文档 →](https://docs.rsshub.app/zh/routes/)      | 论坛                                                 |
| 💬 其他         | [文档 →](https://docs.rsshub.app/zh/routes/)      | Chiphell、HiPDA、saraba1st 等                        |

### 编程 / 开发

| 分类          | 官方文档                                              | 支持站点（部分）                            |
| :------------ | :---------------------------------------------------- | :------------------------------------------ |
| 💻 GitHub     | [文档 →](https://docs.rsshub.app/zh/routes/github)    | 仓库 Issues、PR、Release、Commits、Trending |
| 💻 GitLab     | [文档 →](https://docs.rsshub.app/zh/routes/gitlab)    | 仓库活动                                    |
| 💻 Docker Hub | [文档 →](https://docs.rsshub.app/zh/routes/dockerhub) | 镜像更新                                    |
| 💻 npm        | [文档 →](https://docs.rsshub.app/zh/routes/npm)       | 包更新                                      |
| 💻 掘金       | [文档 →](https://docs.rsshub.app/zh/routes/juejin)    | 文章                                        |
| 💻 其他       | [文档 →](https://docs.rsshub.app/zh/routes/)          | Hacker News、InfoQ、Stack Overflow 等       |

### 游戏

| 分类           | 官方文档                                                | 支持站点（部分）        |
| :------------- | :------------------------------------------------------ | :---------------------- |
| 🎮 王者荣耀    | [文档 →](https://docs.rsshub.app/zh/routes/kingofglory) | **赛程比分**、英雄强度  |
| 🎮 英雄联盟    | [文档 →](https://docs.rsshub.app/zh/routes/lol)         | **赛程比分**、新闻      |
| 🎮 Steam       | [文档 →](https://docs.rsshub.app/zh/routes/steam)       | 游戏新闻、更新          |
| 🎮 PlayStation | [文档 →](https://docs.rsshub.app/zh/routes/ps)          | 商店                    |
| 🎮 Nintendo    | [文档 →](https://docs.rsshub.app/zh/routes/nintendo)    | 商店                    |
| 🎮 其他        | [文档 →](https://docs.rsshub.app/zh/routes/)            | TapTap、3DM、游民星空等 |

### 其他分类

| 分类        | 官方文档                                     | 说明                       |
| :---------- | :------------------------------------------- | :------------------------- |
| 🎓 大学通知 | [文档 →](https://docs.rsshub.app/zh/routes/) | 国内外高校                 |
| 📚 阅读     | [文档 →](https://docs.rsshub.app/zh/routes/) | 起点、微信读书、豆瓣       |
| 🎵 音视频   | [文档 →](https://docs.rsshub.app/zh/routes/) | 哔哩哔哩、YouTube、Spotify |
| 🖼️ 图片     | [文档 →](https://docs.rsshub.app/zh/routes/) | 壁纸、摄影                 |
| 🛍️ 购物     | [文档 →](https://docs.rsshub.app/zh/routes/) | 什么值得买、京东           |
| 🛫 出行     | [文档 →](https://docs.rsshub.app/zh/routes/) | 12306、航班                |
| 💰 金融     | [文档 →](https://docs.rsshub.app/zh/routes/) | 股票、基金                 |
| 🔬 科学期刊 | [文档 →](https://docs.rsshub.app/zh/routes/) | 学术论文                   |
| 📢 政务     | [文档 →](https://docs.rsshub.app/zh/routes/) | 政府公告                   |
| 🔍 其他     | [文档 →](https://docs.rsshub.app/zh/routes/) | 天气、热搜、排行榜         |

> 📌 **完整路由列表**请访问 [docs.rsshub.app/zh/routes](https://docs.rsshub.app/zh/routes)

---

## ✨ 本 Fork 新增 / 增强的路由

以下路由为上游所无或在本 Fork 中做了功能增强。

---

### 📱 Threads 用户时间线（增强版）

> 上游路由 `/threads/:user` 默认只能获取 4-5 条公开帖子。
> 本 Fork 增加了 Cookie 认证支持，可拉取完整时间线。

**路由地址：**

```
/threads/:user
```

**路径参数：**

| 参数   | 说明           | 示例          |
| ------ | -------------- | ------------- |
| `user` | Threads 用户名 | `mensennnnna` |

**查询参数：**

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
GET /threads/mensennnnna?cookie=your_sessionid_here

# 关闭头像显示
GET /threads/mensennnnna?showAuthorAvatarInDesc=false
```

---

### 🛠️ CodeBuddy WorkBuddy 更新日志

> 抓取腾讯云代码助手 CodeBuddy 旗下 WorkBuddy 桌面客户端的官方更新日志。

**路由地址：**

```
/codebuddy/workbuddy/changelog
```

**查询参数：**

| 参数    | 说明       | 默认值 |
| ------- | ---------- | ------ |
| `limit` | 返回条目数 | `50`   |

**数据来源：** https://www.codebuddy.cn/docs/workbuddy/Changelog

**完整示例：**

```
# 获取最新 10 条更新
GET /codebuddy/workbuddy/changelog?limit=10

# 获取全部更新
GET /codebuddy/workbuddy/changelog
```

---

### 🎮 虎扑赛程比分

> 通过虎扑官方 API 获取英雄联盟和王者荣耀的赛程与比分数据。

**路由地址：**

```
/hupu/schedule/:game
```

**路径参数：**

| 参数   | 说明                                           | 默认值 |
| ------ | ---------------------------------------------- | ------ |
| `game` | 游戏类型：`lol`（英雄联盟）、`kog`（王者荣耀） | `lol`  |

**查询参数：**

| 参数   | 说明                                       | 示例                                  |
| ------ | ------------------------------------------ | ------------------------------------- |
| `team` | 按队伍名过滤（不区分大小写，支持中文队名） | `?team=T1` `?team=成都AG` `?team=blg` |

**数据结构：**

```json
{
    "result": {
        "dayGameData": [
            {
                "dayTime": "2026-06-28",
                "dateBlock": "今天 周日",
                "matchData": [
                    {
                        "matchId": "1527692939886592",
                        "matchStatus": "COMPLETED | LIVING | NOT_STARTED",
                        "matchStatusDesc": "已结束 | 进行中 | 未开始",
                        "matchStartTimeStamp": "1777968000000",
                        "matchIntroduction": "KPL夏季赛",
                        "scoreCountText": "4.4万人评分",
                        "againstInfo": {
                            "memberInfos": [
                                { "memberName": "成都AG超玩会", "memberLogo": "https://...", "memberBaseScore": "3" },
                                { "memberName": "重庆狼队", "memberLogo": "https://...", "memberBaseScore": "1" }
                            ]
                        },
                        "liveRoomLink": "huputiyu://general/live?..."
                    }
                ]
            }
        ]
    }
}
```

**虎扑原生路由速查：**

| 路由                     | 说明               |
| ------------------------ | ------------------ |
| `/hupu/nba`              | NBA 新闻           |
| `/hupu/cba`              | CBA 新闻           |
| `/hupu/soccer`           | 足球新闻           |
| `/hupu/news/:team`       | 球队新闻           |
| `/hupu/all/:id?`         | 热帖               |
| `/hupu/bbs/:id?/:order?` | 社区帖子（含战报） |
| `/hupu/bxj/:id?/:order?` | 步行街             |

**示例：**

```
# 英雄联盟全量赛程
GET /hupu/schedule/lol

# 王者荣耀全量赛程
GET /hupu/schedule/kog

# 按队伍筛选
GET /hupu/schedule/lol?team=T1
GET /hupu/schedule/kog?team=成都AG
GET /hupu/schedule/lol?team=blg
```

---

## 🏗️ 部署

### Docker / Docker Compose

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
git clone https://github.com/kaiklife/RSSHub.git
cd RSSHub
npm install

# 启动（带 Threads Cookie）
THREADS_COOKIE="sessionid=xxx; ds_user_id=xxx" npm run dev

# 启动（仅基础功能）
npm run dev
```

### 阿里云 ACR 自动构建

打 tag 推送即可触发 ACR 自动构建：

```bash
git tag release-v0.1.3 -f
git tag latest -f
git push origin --tags -f
```

构建规则：`release-v$version` 格式 tag → 镜像标签 `$version`

---

## 📋 版本记录

### v0.1.3（当前）

**新增：**

- 虎扑赛程比分路由：`/hupu/schedule/lol`（英雄联盟）和 `/hupu/schedule/kog`（王者荣耀）
- 支持 `?team=xxx` 按队伍名过滤
- 通过虎扑官方 `match-api.hupu.com` 接口获取全量赛程和实时比分

**文件：**

- `lib/routes/hupu/schedule.ts` — 路由处理 + 数据格式化 + HTML 模板渲染

### v0.1.2

**新增：**

- CodeBuddy WorkBuddy 更新日志路由：`/codebuddy/workbuddy/changelog`
- 支持 `?limit=N` 参数控制条目数

**文件：**

- `lib/routes/codebuddy/` — 新增命名空间

### v0.1.1

**新增：**

- Threads 路由 Cookie 认证支持（`THREADS_COOKIE` 环境变量）
- 支持通过路由参数 `cookie` 临时覆盖 Cookie

**文件变更：**

- `lib/routes/threads/utils.ts` — 新增 `authHeaders` Cookie 注入
- `lib/routes/threads/index.ts` — 新增 Cookie 参数支持和优先级逻辑

---

## 🔗 相关链接

- **上游项目：** [DIYgod/RSSHub](https://github.com/DIYgod/RSSHub)
- **官方文档（完整路由列表）：** https://docs.rsshub.app/zh/routes
- **Fork 仓库：** https://github.com/kaiklife/RSSHub
