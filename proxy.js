var zutils = require('./zutils');

var httpProxy = require('http-proxy');
var subdomain = require('express-subdomain');
var proxy = httpProxy.createProxyServer({});

proxy.on('proxyReq', function (proxyReq, req, res, options) {
//    console.log(proxyReq);
//    proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
});

proxy.on('proxyRes', function (proxyRes, req, res) {
    console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
});


var proxySubdomain = subdomain('*.proxy', function (req, res, next) {
    var hostname = req['headers']['host'];
    var fiddleName = zutils.getSubStringBeforeFirst(hostname, '.');

    //lookup fiddle by name

//    console.log(req);
    proxy.web(req, res, {
        target: 'http://www.addictingwordgames.com'
    });

});
module.exports = proxySubdomain;
