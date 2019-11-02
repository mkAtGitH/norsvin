var fs = require('fs');
var http = require('http');
var https = require('https');
//var privateKey = fs.readFileSync('certs/gcpnorsvin.key');
//var certificate = fs.readFileSync('certs/gcpnorsvin.pem');
var privateKey = fs.readFileSync('certs/gcp_san.key');
var certificate = fs.readFileSync('certs/gcp_san.pem');

var options = {
	key: privateKey,
	cert: certificate,
	ca: fs.readFileSync('certs/centGPCA.pem'),
	requestCert: true,
	rejectUnauthorized: true
};
var express = require('express');
var app = express();

const http_port = 80;
const https_port = 443;

app.get('/', (req, res) => res.send('Nothing here! Wrong context!'));

app.get('/api/semen/monthly/:year/:month', function (req, res) {
    console.log('   Serving montly')
    res.send(req.params)
});

app.get('/api/semen/yearly/:year', function (req, res) {
    console.log('   Serving yearly '+
            new Date()+" "+
            req.socket.getPeerCertificate().subject.CN+' '+
            req.method+' '+req.url);

    res.send(req.params)
});

app.get('/api/semen/monthlystatistics/:historical', function (req, res) {
    console.log('   Serving statistics')
    res.send(req.params)
});

var httpServer = http.createServer(app);
var httpsServer = https.createServer(options, app);

//httpServer.listen(http_port, () => console.log(`I am listening on port ${http_port} unsecurely!`));
httpsServer.listen(https_port, () => console.log(`I am listening on port ${https_port} securely!`));

