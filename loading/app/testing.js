const loading = require('./loading');

function check_res(res) {
    const size = res.length;
    if (size === 0) {
        console.log('empty result!!!')
    }
    else {
        console.log(`result size: ${size}`);
    }
}

async function test_events_html(page, site, test_num) {
    for (let i = 0; i < test_num; i++) {
        console.log(`test: ${i + 1}`);

        const html = await site.load_events(page);
        check_res(html);
        await loading.save_html(site, html);
    }
}

exports.test_posit = async (page) => {
    const login = 'lester0578@gmail.com';
    const pass = '1q1w1e1r';

    const site = require('./posit');
    await site.load(page, login, pass);

    await test_events_html(page, site, 40);
};

exports.test_olimp = async (page) => {
    const site = require('./olimp');
    await site.load(page);

    await test_events_html(page, site, 7);
};

exports.test_fonbet = async (page) => {
    const site = require('./fonbet');
    await site.load(page);

    await test_events_html(page, site, 40);
};

exports.test_marat = async (page) => {
    const site = require('./marat');
    await site.load(page);

    for (let i = 0; i < 7; i++) {
        console.log(`test: ${i + 1}`);

        const res = await site.load_events(page);
        if (res == null) {
            return
        }
        check_res(JSON.stringify(res.events));
        await loading.save_json(site, res.events)
    }
};