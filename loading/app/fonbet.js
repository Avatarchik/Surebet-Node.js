const loading = require('./loading');

const url = 'https://www.fonbet.com/live/?locale=en';
const node = '#lineTable';
const expand = '#lineTableHeaderButton';
const expand_all = '#lineHeaderViewActionMenu > .popupMenuItem:nth-child(6)';
const closed_event = 'span[style="display: inline-block;"].detailArrowClose';

exports.name = 'fonbet';

exports.load = async (page) => {
    await page.goto(url);

    await page.waitForSelector(expand);
    await page.click(expand);

    await page.click(expand_all);
    await page.waitForNavigation({waitUntil: 'networkidle'});

    loading.site_loaded(exports.name)
};

exports.load_events = async (page) => {
    const closed_events = await page.$$(closed_event);
    for (const event of closed_events) {
        page.evaluateHandle(e => e.click(), event)
    }

    loading.events_loaded(exports.name);
    return loading.node_html(page, node);
};