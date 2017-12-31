const url = 'https://olimp.com?action=setlang&id=2';
const node = '#champ_container_ > table > tbody';

const live = 'body > header > b > div.mid-line.clearfix > div.mid-menu-block > div > ul > li.live-link > a';
const select_all = '#submitLiveMatches > td > input:nth-child(3)';
const next = '#submitLiveMatches > td > input:nth-child(5)';

exports.name = 'olimp';

exports.load = async function (page) {
    await page.goto(url);
    console.log("goto");
};

exports.load_events = async function (page) {
    await page.click(live);
    console.log("live");
    await page.waitForNavigation();
    console.log("waitForNav");
    await page.click(select_all);
    console.log("select all");
    await page.click(next);
    console.log("next");
    await page.waitForNavigation();
    console.log("waitForNav");

    await page.screenshot({path: exports.name + '.png'});
    return page.$eval(node, e => e.outerHTML);
};