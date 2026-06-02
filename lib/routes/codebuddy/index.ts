import { load } from 'cheerio';

import type { Route } from '@/types';
import got from '@/utils/got';
import { parseDate } from '@/utils/parse-date';

export const handler = async (ctx) => {
    const rootUrl = 'https://www.codebuddy.cn/docs/workbuddy/Changelog';
    const limit = ctx.req.query('limit') ? Number.parseInt(ctx.req.query('limit'), 10) : 50;

    const { data: response } = await got(rootUrl);
    const $ = load(response);

    const items: any[] = [];

    // Collect all h2 elements inside main
    const h2s = $('main h2');

    h2s.each((i, heading) => {
        const $heading = $(heading);
        const title = $heading.clone().children('a.header-anchor').remove().end().text().trim();
        const id = $heading.attr('id');

        const dateMatch = title.match(/\(?(\d{4}-\d{2}-\d{2})\)?/);
        const pubDate = dateMatch ? parseDate(dateMatch[1]) : undefined;

        // Build unique link so each entry is independent
        const link = `${rootUrl}#${id}`;

        items.push({
            title,
            link,
            pubDate,
            guid: `codebuddy-changelog-${id}`,
            description: '', // filled below
        });
    });

    // Now collect content for each h2 by walking siblings between h2s
    // Since the DOM structure has h2s at different nesting levels,
    // we use a simple approach: find the content wrapper and iterate children
    const contentDiv = $('main .vp-doc').children('div').first();
    if (contentDiv.length) {
        let itemIdx = -1;
        contentDiv.contents().each((_, el) => {
            if (el.type === 'tag') {
                const tag = el.tagName;
                if (tag === 'h2') {
                    itemIdx++;
                } else if (itemIdx >= 0 && (tag === 'ul' || tag === 'p' || tag === 'div' || tag === 'blockquote' || tag === 'pre' || tag === 'hr')) {
                    const html = $(el).html() || '';
                    if (items[itemIdx]) {
                        items[itemIdx].description += html;
                    }
                }
            }
        });
    }

    return {
        title: 'WorkBuddy 更新日志 - CodeBuddy',
        description: '腾讯云代码助手 CodeBuddy WorkBuddy 更新日志',
        link: rootUrl,
        language: 'zh-CN' as const,
        item: items.slice(0, limit),
        allowEmpty: true,
    };
};

export const route: Route = {
    path: '/workbuddy/changelog',
    name: 'WorkBuddy Changelog',
    url: 'www.codebuddy.cn',
    maintainers: ['kai'],
    handler,
    example: '/codebuddy/workbuddy/changelog',
    parameters: {},
    description: 'WorkBuddy 桌面助手更新日志',
    categories: ['program-update'],
    features: {
        requireConfig: false,
        requirePuppeteer: false,
        antiCrawler: false,
        supportRadar: true,
        supportBT: false,
        supportPodcast: false,
        supportScihub: false,
    },
    radar: [
        {
            source: ['www.codebuddy.cn/docs/workbuddy/Changelog'],
            target: '/codebuddy/workbuddy/changelog',
        },
    ],
};
