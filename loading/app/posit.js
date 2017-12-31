const url = 'https://positivebet.com/en/user/login';
const node =  '.grid-view > table';

const loginField = '#UserLogin_username';
const passField = '#UserLogin_password';
const loginBtn = '#login-form > div.form-actions > button';
const live = '#yw0 > li:nth-child(2) > a';
const autoReload = '#formPanel > #btnAutoRefresh';
const resultsNum = '#ddlPerPage';

exports.name = 'posit';

exports.load = async function (page, login, password) {
    await page.goto(url);
    console.log("goto");

    await page.focus(loginField);
    await page.keyboard.type(login);
    console.log('login');

    await page.focus(passField);
    await page.keyboard.type(password);
    console.log('pass');

    await page.click(loginBtn);
    await page.waitForNavigation();
    console.log('loginBtn');

    await page.click(live);
    await page.waitForNavigation();
    console.log('live');

    await page.click(autoReload);
    console.log('auto reload');
    await page.select(resultsNum, '30');
    console.log('results num');
};

exports.load_events = async function (page) {
    await page.screenshot({path: exports.name + '.png'});
    return page.$eval(node, e => e.outerHTML);
};