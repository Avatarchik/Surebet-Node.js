const url = 'https://www.fonbet.com/live/?locale=en';
const node = '#lineTable';
const expand = '#lineTableHeaderButton';
const expand_all = '#lineHeaderViewActionMenu > .popupMenuItem:nth-child(6)';
const closed_event = 'span[style="display: inline-block;"].detailArrowClose';

exports.name = 'fonbet';

exports.load = async function (page) {
    await page.goto(url);
    await page.waitForNavigation({waitUntil: 'networkidle'});
    console.log('goto');

    await page.click(expand);
    console.log('expand');

    await page.click(expand_all);
    await page.waitForNavigation({waitUntil: 'networkidle'});
    console.log('expand all');
};

exports.load_events = async function (page) {
    const closed_events = await page.$$(closed_event);
    for (const event of closed_events) {
        page.evaluateHandle(e => e.click(), event)
    }
    console.log('events opened');

    await page.screenshot({path: exports.name + '.png'});
    return page.$eval(node, e => e.outerHTML);
};