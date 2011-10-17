var sys = require("sys"), 
	http = require("http"),
	url = require("url"),
	path = require("path"),
	fs = require("fs");

var assert = function () {
        return console.log(arguments[0]);
};

global.x = {};

assert(typeof filecache == "object");


var http = require('http'),
    faye = require('faye');

bayeux = new faye.NodeAdapter({
	mount:    '/faye',
	timeout:  45,
})

bayeux.listen(32656);

var client = new faye.Client('http://0.0.0.0:8000/faye');

function getIP(req) {
        var ip_address = (req.connection.remoteAddress ? req.connection.remoteAddress : req.remoteAddress);
        //check for cloudflare if behind firewall or directly cloudflare'd
        try {
                if (req.headers['cf-connecting-ip']) {
                        var ipParts = ip_address.split(".");
                        var cloudFlare = false;
                        switch (parseInt(ipParts[0])) {
                        case 204:
                                //(204.93.177.0 - 204.93.177.255)
                                //(204.93.240.0 - 204.93.240.255)
                                if (parseInt(ipParts[1]) == 93 && (parseInt(ipParts[2]) == 240 || parseInt(ipParts[2]) == 177)) {
                                        cloudFlare = true;
                                }
                                break
                        case 199:
                                //(199.27.128.0 - 199.27.135.255)
                                if (parseInt(ipParts[1]) == 27 && (parseInt(ipParts[2]) < 136 || parseInt(ipParts[2]) > 127)) {
                                        cloudFlare = true;
                                }
                                break
                        case 173:
                                //(173.245.48.0 - 173.245.63.255)
                                if (parseInt(ipParts[1]) == 245 && (parseInt(ipParts[2]) < 64 || parseInt(ipParts[2]) > 47)) {
                                        cloudFlare = true;
                                }
                                break
                        }
                        if (cloudFlare) {
                                ip_address = req.headers['cf-connecting-ip'];
                        }
                }
        } catch (e) {}
        return ip_address;
}

var a,b,c,d,e;
var qs = require('querystring');

http.createServer(function (r, rr) {
        var u = url.parse(r.url).pathname;
        var f = path.join(process.cwd(), u);
        path.exists(f, function (exists) {
                if (u.substring(0, 2) == "/.") exists = false;

                //console.log([f, u]);
                if (u == "/uuid") {
                        rr.writeHead(200, {
                                "Content-Type": "text/javascript"
                        });
                        //x[a=require("crypto").createCipher('aes-256-cbc','InmbuvP6Z8').update(getIP(rr),'utf8','hex')]=getIP(rr);
                        x[a = require('crypto').
                        createHash('md5').
                        update("" + getIP(rr)).
                        digest("hex")] = getIP(rr);

                        console.log(getIP(rr) + " is now " + a);
                        console.log("Propagating new listener..");
                        client.publish('/strg', { text: [getIP(rr), a] , type: 'lbc' }); //listener broadcast
                        rr.write('window.uuid="' + a + '";');
                        return rr.end();
                }

                if (!exists) {
                        rr.writeHead(404, {
                                "Content-Type": "text/plain"
                        });
                        rr.write("404 Nothing Here\n");
                        return rr.end();
                }

                //if ( typeof global.x[f] == "undefined" )
                fs.readFile(f, "binary", function (err, fs) {
                        if (err) {
                                rr.writeHead(500, {
                                        "Content-Type": "text/plain"
                                });
                                rr.write(err + "\n");
                                return rr.end();
                        }
                        rr.writeHead(200);
                        global.x[f] = fs;
                        rr.write(fs, "binary");
                        return rr.end();
                });
//		else {
//			rr.writeHead(200);
//			rr.write(global.x[f], "binary");
//			rr.end();
//		}
		return false;
        });
}).listen(8963);

client.subscribe('/strg', function(message) { return console.log(message); });