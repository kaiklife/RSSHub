# kaiklife/RSSHub — 自定义 Fork

本项目是 [DIYgod/RSSHub](https://github.com/DIYgod/RSSHub) 的定制 Fork，基于上游 v2026.06+ 版本。
保留全部 5000+ 原生路由，以下仅列出**本 Fork 涉及的所有路由**（含上游原生相关路由），方便查阅。

---

## 📱 社交 / 自媒体

### Threads 用户时间线（增强版）

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

## 🛠️ 开发工具

### CodeBuddy WorkBuddy 更新日志

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

## 🎮 游戏电竞 / 虎扑

> 虎扑（hupu）命名空间下涵盖 NBA、CBA、足球、英雄联盟、王者荣耀等赛事。
> 以下路由均以 `hupu` 为前缀，例如 `/hupu/nba`。

### 🏀 篮球

#### NBA / CBA / 足球 新闻

```
/hupu/nba          → NBA 新闻
/hupu/cba          → CBA 新闻
/hupu/soccer       → 足球新闻
/hupu              → 首页
```

#### 球队新闻

```
/hupu/news/:team
```

| 参数   | 说明               | 示例                        |
| ------ | ------------------ | --------------------------- |
| `team` | 英文队名（全小写） | `spurs` `lakers` `warriors` |

**支持球队列表：**

`pistons` `knicks` `raptors` `heat` `celtics` `magic` `76ers` `cavaliers` `hawks` `bucks` `bulls` `hornets` `nets` `pacers` `wizards` `thunder` `lakers` `rockets` `spurs` `nuggets` `timberwolves` `suns` `warriors` `grizzlies` `trailblazers` `jazz` `mavericks` `clippers` `kings` `pelicans`

**示例：**

```
GET /hupu/news/spurs      → 马刺新闻
GET /hupu/news/lakers     → 湖人新闻
GET /hupu/news/warriors   → 勇士新闻
```

### 📢 论坛 / 热帖

#### 热帖版面

```
/hupu/all/:id?
```

| 参数 | 说明                     | 默认值        |
| ---- | ------------------------ | ------------- |
| `id` | 版面编号，见虎扑论坛 URL | `topic-daily` |

**常用版面：**

| 版面 id       | 说明           |
| ------------- | -------------- |
| `topic-daily` | 步行街每日话题 |
| `love`        | 恋爱区         |
| `history`     | 历史区         |
| `stock`       | 股票区         |
| `all-gg`      | 游戏热帖       |

**示例：**

```
GET /hupu/all            → 步行街每日话题
GET /hupu/all/love       → 恋爱区
GET /hupu/all/all-gg     → 游戏热帖
```

#### 社区帖子

```
/hupu/bbs/:id?/:order?
/hupu/bxj/:id?/:order?
```

| 参数    | 说明                       | 默认值 |
| ------- | -------------------------- | ------ |
| `id`    | 社区编号，见虎扑社区 URL   | `34`   |
| `order` | `0`=最新回复，`1`=最新发布 | `1`    |

> 💡 `bbs` 路由在帖子包含 `matchId` 时会自动拉取比赛战报（球员数据、球队比分、数据对比）。

**示例：**

```
GET /hupu/bbs/34          → 步行街主干道
GET /hupu/bbs/502         → 篮球资讯
GET /hupu/bbs/85          → 英雄联盟
GET /hupu/bbs/kog         → 王者荣耀
```

### 🆕 赛程比分（本 Fork 新增）

> 通过虎扑官方 `match-api.hupu.com` 接口获取赛程与实时比分。
> 支持按队伍筛选。

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

**每条 RSS 条目包含：**

- ✅/🔴/⏳ 状态标签（已结束 / 进行中 / 未开始）
- 赛事名称（如 KPL夏季赛、LPL第二赛段淘汰赛、季中冠军赛入围赛）
- 对阵双方队名 + Logo
- 比分（如 3-1）
- 评分人数（如 "4.4万人评分"）
- 虎扑直播间链接

**示例：**

```
# 英雄联盟全量赛程（LPL / LCK / MSI / EWC 等）
GET /hupu/schedule/lol

# 王者荣耀全量赛程（KPL / 挑战者杯 等）
GET /hupu/schedule/kog

# 按队伍筛选
GET /hupu/schedule/lol?team=T1
GET /hupu/schedule/kog?team=成都AG
GET /hupu/schedule/lol?team=blg
GET /hupu/schedule/lol?team=jdg
```

**数据来源：**

```
GET https://match-api.hupu.com/1/8.2.10/matchallapi/bff/standard/getScheduleListByTagForH5
    ?businessType=common
    &businessId={lol|kog}
    &datasource=navigation
```

**返回数据结构：**

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
                        "matchName": "电竞常规赛 第三轮",
                        "scoreCountText": "4.4万人评分",
                        "againstInfo": {
                            "memberInfos": [
                                { "memberName": "成都AG超玩会", "memberLogo": "https://...", "memberBaseScore": "3" },
                                { "memberName": "重庆狼队", "memberLogo": "https://...", "memberBaseScore": "1" }
                            ],
                            "winnerMemberId": "xxx"
                        },
                        "liveRoomLink": "huputiyu://general/live?..."
                    }
                ]
            }
        ]
    }
}
```

**环境变量：**

无（虎扑公开接口，无需认证）

---

## 📋 路由速查表

| 路由                             | 分类      | 说明                              | 来源     |
| -------------------------------- | --------- | --------------------------------- | -------- |
| `/threads/:user`                 | 社交      | Threads 时间线（**增强 Cookie**） | **增强** |
| `/codebuddy/workbuddy/changelog` | 开发工具  | WorkBuddy 更新日志                | **新增** |
| `/hupu/nba`                      | 游戏/篮球 | NBA 新闻                          | 上游原生 |
| `/hupu/cba`                      | 游戏/篮球 | CBA 新闻                          | 上游原生 |
| `/hupu/soccer`                   | 游戏/足球 | 足球新闻                          | 上游原生 |
| `/hupu/news/:team`               | 游戏/篮球 | 球队新闻                          | 上游原生 |
| `/hupu/all/:id?`                 | 游戏/论坛 | 热帖                              | 上游原生 |
| `/hupu/bbs/:id?/:order?`         | 游戏/论坛 | 社区帖子（含战报）                | 上游原生 |
| `/hupu/bxj/:id?/:order?`         | 游戏/论坛 | 步行街                            | 上游原生 |
| **`/hupu/schedule/:game`**       | 游戏/电竞 | **赛程比分（英雄联盟/王者荣耀）** | **新增** |

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

# 或启动（仅基础功能）
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
- 每条 RSS 包含：赛事名称、对阵双方队名+Logo、比分、状态标签、评分人数、直播间链接

**文件：**

- `lib/routes/hupu/schedule.ts` — 路由处理 + 数据格式化 + HTML 模板渲染

### v0.1.2

**新增：**

- CodeBuddy WorkBuddy 更新日志路由：`/codebuddy/workbuddy/changelog`
- 支持 `?limit=N` 参数控制条目数
- 通过 `got` + `cheerio` 抓取 VitePress 预渲染页面

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
