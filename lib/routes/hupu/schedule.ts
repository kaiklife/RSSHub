import type { Data, DataItem, Route } from '@/types';
import ofetch from '@/utils/ofetch';
import { parseDate } from '@/utils/parse-date';
import timezone from '@/utils/timezone';

const GAMES = {
    kog: {
        title: '王者荣耀',
        businessId: 'kog',
    },
    lol: {
        title: '英雄联盟',
        businessId: 'lol',
    },
} as const;

type GameId = keyof typeof GAMES;

interface MemberInfo {
    memberName: string;
    memberLogo: string;
    memberBaseScore: string | null;
    memberExtraScore: string | null;
    memberBigScore: string | null;
    memberId: string;
    memberType: string;
}

interface AgainstInfo {
    memberInfos: [MemberInfo, MemberInfo];
    winnerMemberId: string;
}

interface MatchItem {
    matchId: string;
    matchStatus: string;
    matchStatusDesc: string;
    matchStartTimeStamp: string;
    matchStartDate: string;
    matchIntroduction: string;
    matchName: string;
    matchDesc: string | null;
    scoreCountText: string | null;
    againstInfo: AgainstInfo;
    liveRoomLink: string;
    matchType: string;
    midGameStageInfo: any;
    scoreItemInfo: any;
}

interface DayGameData {
    dayTime: string;
    dateBlock: string;
    matchData: MatchItem[];
}

interface ScheduleResult {
    anchorMatchId: string;
    dayGameData: DayGameData[];
}

interface ScheduleApiResponse {
    errorCode: string;
    errorMsg: string;
    result: ScheduleResult;
}

function getMatchStatusEmoji(status: string, statusDesc: string): string {
    switch (status) {
        case 'COMPLETED':
            return '✅';
        case 'LIVING':
            return '🔴';
        case 'NOT_STARTED':
            return '⏳';
        default:
            return statusDesc === '进行中' ? '🔴' : statusDesc === '未开始' ? '⏳' : '✅';
    }
}

function formatScore(score: string | null): string {
    return score ?? '-';
}

function buildMatchTitle(match: MatchItem): string {
    const { againstInfo, matchIntroduction, matchStatus, matchStatusDesc } = match;
    const emoji = getMatchStatusEmoji(matchStatus, matchStatusDesc);
    const team1 = againstInfo.memberInfos[0].memberName;
    const team2 = againstInfo.memberInfos[1].memberName;
    const score1 = formatScore(againstInfo.memberInfos[0].memberBaseScore);
    const score2 = formatScore(againstInfo.memberInfos[1].memberBaseScore);
    return `${emoji} ${matchIntroduction} ${team1} ${score1} - ${score2} ${team2} [${matchStatusDesc}]`;
}

function buildMatchDescription(match: MatchItem): string {
    const { againstInfo, matchIntroduction, matchName, matchDesc, scoreCountText, matchStatusDesc } = match;
    const team1 = againstInfo.memberInfos[0];
    const team2 = againstInfo.memberInfos[1];
    const score1 = formatScore(team1.memberBaseScore);
    const score2 = formatScore(team2.memberBaseScore);
    const statusBadge =
        matchStatusDesc === '已结束'
            ? '<span style="background:#52c41a;color:#fff;padding:2px 8px;border-radius:4px;font-size:12px">已结束</span>'
            : matchStatusDesc === '进行中'
              ? '<span style="background:#f5222d;color:#fff;padding:2px 8px;border-radius:4px;font-size:12px">🔴 进行中</span>'
              : '<span style="background:#8c8c8c;color:#fff;padding:2px 8px;border-radius:4px;font-size:12px">⏳ 未开始</span>';

    return `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto">
  <div style="text-align:center;margin-bottom:12px">
    <div style="font-size:14px;color:#666;margin-bottom:4px">${matchIntroduction}</div>
    ${matchName ? `<div style="font-size:12px;color:#999;margin-bottom:8px">${matchName}</div>` : ''}
    ${statusBadge}
  </div>
  <div style="display:flex;align-items:center;justify-content:center;gap:16px;padding:16px;background:#f5f5f5;border-radius:8px">
    <div style="text-align:center;flex:1">
      <img src="${team1.memberLogo}" style="width:48px;height:48px;border-radius:50%;object-fit:contain" onerror="this.style.display='none'" />
      <div style="font-size:14px;font-weight:600;margin-top:6px">${team1.memberName}</div>
    </div>
    <div style="font-size:32px;font-weight:700;color:#333;min-width:80px;text-align:center">
      ${score1} - ${score2}
    </div>
    <div style="text-align:center;flex:1">
      <img src="${team2.memberLogo}" style="width:48px;height:48px;border-radius:50%;object-fit:contain" onerror="this.style.display='none'" />
      <div style="font-size:14px;font-weight:600;margin-top:6px">${team2.memberName}</div>
    </div>
  </div>
  ${matchDesc ? `<div style="margin-top:8px;font-size:12px;color:#999;text-align:center">${matchDesc}</div>` : ''}
  ${scoreCountText ? `<div style="margin-top:8px;font-size:12px;color:#999;text-align:center">⭐ ${scoreCountText}</div>` : ''}
  <div style="margin-top:12px;text-align:center">
    <a href="${match.liveRoomLink}" style="display:inline-block;padding:6px 16px;background:#e74c3c;color:#fff;border-radius:4px;text-decoration:none;font-size:13px">进入直播间</a>
  </div>
</div>`;
}

export const route: Route = {
    path: '/schedule/:game',
    name: '赛程比分',
    url: 'hupu.com',
    maintainers: ['fwk000'],
    example: '/hupu/schedule/lol',
    parameters: {
        game: {
            description: '游戏类型：lol（英雄联盟）、kog（王者荣耀）',
            default: 'lol',
            options: Object.entries(GAMES).map(([key, value]) => ({
                label: value.title,
                value: key,
            })),
        },
    },
    categories: ['game'],
    handler: async (ctx): Promise<Data> => {
        const game = (ctx.req.param('game') || 'lol') as GameId;
        if (!(game in GAMES)) {
            throw new Error(`Invalid game. Valid options: ${Object.keys(GAMES).join(', ')}`);
        }

        const gameConfig = GAMES[game];

        // 可选：按队伍名过滤（不区分大小写，支持中文队名）
        const teamFilter = ctx.req.query('team')?.trim();

        const data = await ofetch<ScheduleApiResponse>('https://match-api.hupu.com/1/8.2.10/matchallapi/bff/standard/getScheduleListByTagForH5', {
            query: {
                businessType: 'common',
                businessId: gameConfig.businessId,
                datasource: 'navigation',
            },
        });

        const dayGameData = data.result?.dayGameData ?? [];

        const items: DataItem[] = [];
        for (const day of dayGameData) {
            for (const match of day.matchData) {
                // 如果指定了队伍过滤，只保留包含该队伍的比赛
                if (teamFilter) {
                    const team1 = match.againstInfo.memberInfos[0].memberName;
                    const team2 = match.againstInfo.memberInfos[1].memberName;
                    if (!team1 || !team2) {
                        continue;
                    }
                    const matchTeam = (name: string) => name.toLowerCase().includes(teamFilter.toLowerCase());
                    if (!matchTeam(team1) && !matchTeam(team2)) {
                        continue;
                    }
                }
                items.push({
                    title: buildMatchTitle(match),
                    description: buildMatchDescription(match),
                    guid: match.matchId,
                    link: match.liveRoomLink,
                    pubDate: timezone(parseDate(Number.parseInt(match.matchStartTimeStamp)), +8),
                });
            }
        }

        const titleSuffix = teamFilter ? ` - ${teamFilter.toUpperCase()}` : '';
        return {
            title: `虎扑 - ${gameConfig.title} 赛程比分${titleSuffix}`,
            link: 'https://www.hupu.com',
            item: items,
            description: `虎扑 ${gameConfig.title} 赛程与比分数据${teamFilter ? `（筛选队伍：${teamFilter}）` : ''}`,
        } as Data;
    },
};
