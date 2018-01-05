const loading = require('./loading');

const url = 'https://olimp.com?action=setlang&id=2';
const node = '#champ_container_ > table > tbody';

const live = 'body > header > b > div.mid-line.clearfix > div.mid-menu-block > div > ul > li.live-link > a';
const select_all = '#submitLiveMatches > td > input:nth-child(3)';
const next = '#submitLiveMatches > td > input:nth-child(5)';

exports.name = 'olimp';

exports.load = async (page) => {
    await page.goto(url);
    await page.waitForNavigation({waitUntil: 'networkidle'});

    loading.site_loaded(exports.name)
};

exports.load_events = async (page) => {
    await page.click(live);

    await page.waitForSelector(select_all);
    await page.click(select_all);

    await page.click(next);

    await page.waitForSelector(node);
    await page.waitForNavigation({waitUntil: 'networkidle'});

    const html = await loading.node_html(page, node);

    // await page.screenshot({path: exports.name + '.png'});

    loading.events_loaded(exports.name);
    return html;
};