const puppeteer = require('puppeteer');
const testing = require('./testing');

load_site = async (load_func) => {
    const browser = await puppeteer.launch({
        ignoreHTTPSErrors: true
    });

    console.log("Start");

    const page = await browser.newPage();

    await load_func(page);

    console.log("Done");

    await browser.close();
};

(async () => {
    await load_site(testing.test_marat);
    await load_site(testing.test_olimp);
    await load_site(testing.test_posit);
    await load_site(testing.test_fonbet);
})();