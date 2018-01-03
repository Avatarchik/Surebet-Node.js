const util = require("util");

const url = "https://www.marathonbet.co.uk/en/live";
const node = "#liveEventsContent";

const fav_btn = "#leftMenuPanel > div > div > div.live-events-menu > ul > ul:nth-child(1) > li > div.submenu-header > div.label-container > a";
const sports = ["45356", "26418", "43658", "22723", "23690"];
const sport_star = `#leftMenuPanel > div > div > div.live-events-menu > ul > li.submenu > div > ul > li[data-reactid*="%s"] > div.submenu-header > div.label-container > div[class*=" unchecked"]`;

const expand_event_btns = `td[id*="event-more-view"]`;
const event_details = `div > table > tbody > tr[class*="market-details"]`;

exports.name = 'marat';

exports.load = async function (page) {
    await page.goto(url);
    await page.waitForNavigation({waitUntil: 'networkidle'});

    await click_fav_sports(page);
    await page.click(fav_btn).then(() => page.waitForNavigation({waitUntil: 'networkidle'}));

    console.log(`${exports.name}: loaded`);
};

async function click_fav_sports(page) {
    for (const curSport of sports) {
        const sel = util.format(sport_star, curSport);
        const node = await page.$(sel);
        if (node !== null) {
            await node.click().then(() => page.waitForNavigation({waitUntil: 'networkidle'}));
        }
    }
}

exports.load_events = async function (page) {
    await click_fav_sports(page);

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
