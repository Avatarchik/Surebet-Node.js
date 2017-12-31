const puppeteer = require('puppeteer');
const fs = require('fs');
const site = require('./fonbet');

// const login = 'lester0578@gmail.com';
// const pass = '1q1w1e1r';

(async () => {
    const browser = await puppeteer.launch({
        ignoreHTTPSErrors: true
        // headless: false,
    });

    for (let i = 0; i < 5; i++) {
        const page = await browser.newPage();
        console.log("start");

        await site.load(page);
        const html = await site.load_events(page);

        await fs.writeFile(site.name + '.html', html, (err) => {
            if (err) throw err;
            console.log('HTML has been saved!');
        });
        await page.close();
    }

    await browser.close();
})();