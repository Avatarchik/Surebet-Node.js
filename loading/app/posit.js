const loading = require('./loading');

const url = 'https://positivebet.com/en/user/login';
const node = '.grid-view > table';

const loginField = '#UserLogin_username';
const passField = '#UserLogin_password';
const loginBtn = '#login-form > div.form-actions > button';
const live = '#yw0 > li:nth-child(2) > a';
const autoReload = '#formPanel > #btnAutoRefresh';
const resultsNum = '#ddlPerPage';

exports.name = 'posit';

exports.load = async (page, login, password) => {
    await page.goto(url);

    await page.focus(loginField);
    await page.keyboard.type(login);

    await page.focus(passField);
    await page.keyboard.type(password);

    await page.click(loginBtn);
    await page.waitForNavigation();

    await page.click(live);
    await page.waitForSelector(node);

    await page.click(autoReload);
    await page.select(resultsNum, '30');

    loading.site_loaded(exports.name)
};

exports.load_events = async (page) => {
    loading.events_loaded(exports.name);
    return loading.node_html(page, node);
};