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

### 3. 虎扑赛程比分

> 通过虎扑官方 `match-api.hupu.com` 接口，获取英雄联盟和王者荣耀的赛程与比分数据。每条 RSS 包含赛事名称、对阵双方、比分、状态（已结束/进行中/未开始）和虎扑直播间链接。

**路由地址：**

```
/hupu/schedule/:game
```

**参数说明：**

| 参数   | 说明                                           | 默认值 |
| ------ | ---------------------------------------------- | ------ |
| `game` | 游戏类型：`lol`（英雄联盟）、`kog`（王者荣耀） | `lol`  |

**查询参数（可选）：**

| 参数   | 说明                                       | 示例                                  |
| ------ | ------------------------------------------ | ------------------------------------- |
| `team` | 按队伍名过滤（不区分大小写，支持中文队名） | `?team=T1` `?team=成都AG` `?team=blg` |

**完整示例：**

```
# 英雄联盟全量赛程（LPL / LCK / MSI / EWC 等）
/hupu/schedule/lol

# 王者荣耀全量赛程（KPL / 挑战者杯 等）
/hupu/schedule/kog

# 按队伍筛选：只看 T1 的比赛
/hupu/schedule/lol?team=T1

# 按队伍筛选：只看 成都AG超玩会 的比赛
/hupu/schedule/kog?team=成都AG

# 按队伍筛选：模糊匹配
/hupu/schedule/lol?team=blg
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
                                {
                                    "memberName": "成都AG超玩会",
                                    "memberLogo": "https://...png",
                                    "memberBaseScore": "3"
                                },
                                {
                                    "memberName": "重庆狼队",
                                    "memberLogo": "https://...png",
                                    "memberBaseScore": "1"
                                }
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

**完整示例：**

```
# 英雄联盟赛程（LPL / LCK / MSI / EWC 等）
http://localhost:12005/hupu/schedule/lol

# 王者荣耀赛程（KPL / 挑战者杯 等）
http://localhost:12005/hupu/schedule/kog
```

**环境变量：**

无（无需 Cookie / Token，虎扑公开接口）

---

## 📋 全部虎扑路由速查

以下为 Fork 中所有虎扑（hupu）命名空间下的可用路由，涵盖新闻、论坛和赛程数据：

| 路由                     | 说明                                   | 来源        |
| ------------------------ | -------------------------------------- | ----------- |
| `/hupu/nba`              | 🏀 NBA 新闻                            | 上游原生    |
| `/hupu/cba`              | 🏀 CBA 新闻                            | 上游原生    |
| `/hupu/soccer`           | ⚽ 足球新闻                            | 上游原生    |
| `/hupu/news/:team`       | 🏀 特定球队新闻（如 `spurs` `lakers`） | 上游原生    |
| `/hupu/all/:id?`         | 📢 热帖（默认步行街每日话题）          | 上游原生    |
| `/hupu/bbs/:id?/:order?` | 💬 社区帖子（含战报数据）              | 上游原生    |
| `/hupu/bxj/:id?/:order?` | 🚶 步行街帖子                          | 上游原生    |
| **`/hupu/schedule/lol`** | 🎮 **英雄联盟赛程比分（新增）**        | **本 Fork** |
| **`/hupu/schedule/kog`** | 🏆 **王者荣耀赛程比分（新增）**        | **本 Fork** |

> 💡 所有虎捕路由均可通过 RSSHub 标准参数（`?limit=20`、`?format=json` 等）控制输出。

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
git tag release-v0.1.3 -f
git tag latest -f
git push origin --tags -f
```

构建规则：`release-v$version` 格式 tag → 镜像标签 `$version`

---

## 📋 版本记录

### v0.1.3（当前）

**新增：**

- 虎捕赛程比分路由：`/hupu/schedule/lol`（英雄联盟）和 `/hupu/schedule/kog`（王者荣耀）
- 通过虎捕官方 `match-api.hupu.com` 接口获取全量赛程和实时比分
- 每条 RSS 包含：赛事名称、对阵双方队名+Logo、比分、状态标签（✅已结束/🔴进行中/⏳未开始）、评分人数、直播间链接

**文件：**

- `lib/routes/hupu/schedule.ts` — 路由处理 + 数据格式化 + HTML 模板渲染

### v0.1.2

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
