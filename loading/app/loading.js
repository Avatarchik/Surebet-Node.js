const util = require("util");
const fs = require('fs');

exports.site_loaded = (site_name) => {
    console.log(util.format(`%s: loaded`, site_name));
};

exports.events_loaded = (site_name) => {
    console.log(util.format(`%s: events loaded`, site_name));
};

exports.node_html = async (page, node) => {
    return page.$eval(node, e => e.outerHTML);
};

exports.save_html = async (site, html) => {
    await fs.writeFile(site.name + '.html', html, (err) => {
        if (err) throw err;
    });
    console.log('HTML has been saved!');
};

exports.save_json = async (site, obj) => {
    const json = JSON.stringify(obj);
    await fs.writeFile(site.name + '_.json', json, (err) => {
        if (err) throw err;
    });
    console.log('JSON has been saved!');
};