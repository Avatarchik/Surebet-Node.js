const util = require("util");

exports.site_loaded = (site) => {
    console.log(util.format(`%s: loaded`, site));
};

exports.events_loaded = (site) => {
    console.log(util.format(`%s: events loaded`, site));
};

exports.node_html = async (page, node) => {
    return page.$eval(node, e => e.outerHTML);
};