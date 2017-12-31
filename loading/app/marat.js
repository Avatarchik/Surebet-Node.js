const cookie = {name: "SESSION_KEY", value: "0b27ae50ca964a93b286357bd0b3be28", url: "https://www.marathonbet.co.uk"};

const url = "https://www.marathonbet.co.uk/en/live/favorites";
const node = "#liveEventsContent";

const expand_event_btns = `td[id*="event-more-view"]`;
const event_details = `div > table > tbody > tr[class*="market-details"]`;

exports.name = 'marat';

exports.load = async function (page) {
    await page.setCookie(cookie);
    await page.goto(url);
    await page.waitForNavigation({waitUntil: 'networkidle'});

    console.log(`${exports.name}: loaded`);
};

exports.load_events = async function (page) {
    const html = await page.$eval(node, el => el.outerHTML);
    const sport_tree = await page.evaluate(() => {
        return reactData.liveMenuEvents.childs
    });
    let events = [];

    const expand_btns = await page.$$(expand_event_btns);
    for (const cur_btn of expand_btns) {
        await page.evaluateHandle(e => e.click(), cur_btn)
            .then(() => page.waitForNavigation({waitUntil: 'networkidle', networkIdleTimeout: 50}));

        try {
            await page.waitForSelector(event_details, {timeout: 3000});
            const event = await page.$eval(event_details, el => el.outerHTML);
            events.push(event);

            await page.evaluateHandle(e => e.click(), cur_btn);
        } catch (err) {
            console.log(`timeout waiting for 'event_details'`)
        }
    }

    console.log(`${exports.name}: loaded events`);
    return {events: events, html: html, sport_tree: sport_tree}
};
