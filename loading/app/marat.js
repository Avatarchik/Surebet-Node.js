const url = 'https://www.marathonbet.co.uk/en/live/favorites';
const expand = 'td[id*="event-more-view"]';
const cookie = {name: "SESSION_KEY", value: "0b27ae50ca964a93b286357bd0b3be28", url: "https://www.marathonbet.co.uk"};
const details = 'div > table > tbody > tr[class*="market-details"]';

exports.name = 'marat';

exports.load = async function (page) {
    await page.setCookie(cookie);
    console.log('cookie');

    await page.goto(url);
    await page.waitForNavigation({waitUntil: 'networkidle'});
    console.log('goto');

    await page.screenshot({path: exports.name + '-before.png'});

    await page.click(expand);
    console.log('expand');
    console.log(await page.url());

    await page.waitForSelector(details);
    console.log('wait for details');
};

exports.load_events = async function (page) {
    await page.screenshot({path: exports.name + '.png'});
    return page.content();
};
