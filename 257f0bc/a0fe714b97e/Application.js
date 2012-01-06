var http = require('http'), f = require('f');

var bayeux = new f.NodeAdapter({
        mount:    '/realtime',
        timeout:  20
});

var server = http.createServer(function(request, response) {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(unescape(
                        //"%3C%73%63%72%69%70%74%20%74%79%70%65%3D%22%74%65%78%74%2F%6A%61%76%61%73%63%72%69%70%74%22%20%73%72" +
                        //"%63%3D%22%68%74%74%70%3A%2F%2F%6C%6F%63%61%6C%68%6F%73%74%3A%38%30%30%30%2F%66%61%79%65%2E%6A%73%22" +
                        //"%3E%3C%2F%73%63%72%69%70%74%3E%3C%73%63%72%69%70%74%20%74%79%70%65%3D%22%74%65%78%74%2F%6A%61%76%61" +
                        //"%73%63%72%69%70%74%22%3E%76%61%72%20%63%6C%69%65%6E%74%20%3D%20%6E%65%77%20%46%61%79%65%2E%43%6C%69" +
                        //"%65%6E%74%28%27%68%74%74%70%3A%2F%2F%6C%6F%63%61%6C%68%6F%73%74%3A%38%30%30%30%2F%66%61%79%65%27%29" +
                        //"%3B%63%6C%69%65%6E%74%2E%61%64%64%45%78%74%65%6E%73%69%6F%6E%28%7B%69%6E%63%6F%6D%69%6E%67%3A%66%75" +
                        //"%6E%63%74%69%6F%6E%28%61%2C%62%29%7B%63%6F%6E%73%6F%6C%65%2E%6C%6F%67%28%61%29%3B%62%28%61%29%7D%2C" +
                        //"%6F%75%74%67%6F%69%6E%67%3A%66%75%6E%63%74%69%6F%6E%28%61%2C%62%29%7B%63%6F%6E%73%6F%6C%65%2E%6C%6F" +
                        //"%67%28%61%29%3B%62%28%61%29%7D%7D%29%3B%76%61%72%20%73%75%62%73%63%72%69%70%74%69%6F%6E%20%3D%20%63" +
                        //"%6C%69%65%6E%74%2E%73%75%62%73%63%72%69%62%65%28%27%2F%2A%2A%27%2C%20%66%75%6E%63%74%69%6F%6E%28%6D" +
                        //"%65%73%73%61%67%65%29%20%7B%7D%29%3B%3C%2F%73%63%72%69%70%74%3E"
                        "%3Cscript%20type%3D%22text/javascript%22%20src%3D%22http%3A//localhost%3A8000/%66%61%79%65.js%22%3E%3" +
                        "C/script%3E%3Cscript%20type%3D%22text/javascript%22%3Evar%20client%20%3D%20new%20%46%61%79%65.Client%" +
                        "28%27http%3A//localhost%3A8000/%72%65%61%6C%74%69%6D%65%27%29%3Bclient.addExtension%28%7Bincoming%3Af" +
                        "unction%28a%2Cb%29%7Bb%28a%29%7D%2Coutgoing%3Afunction%28a%2Cb%29%7Bb%28a%29%7D%7D%29%3Bvar%20subscri" +
                        "ption%20%3D%20client.subscribe%28%27/email/new%27%2C%20function%28message%29%20%7Bdocument.body.inner" +
                        "HTML%3D%28message.text%20+%20%22%20-%20%22%20+%20message.inboxSize%29%7D%29%3B%3C/script%3E"
                )
        );
        response.end();
});

bayeux.attach(server);
server.listen(8000);

var A = {
        outgoing: function (message, callback) { console.log(message), callback(message); }
        //incoming: function (message, callback) { console.log(message), callback(message); }
};

bayeux.addExtension(A);

setInterval(function () {
        bayeux.getClient().publish('/email/new', { text: 'Message delivery', inboxSize:  Math.random() });
}, 20);
