var express = require('express');
var app = express();

const http_port = 80;

app.get('/', (req, res) => res.send('Nothing here! Wrong context!'));

app.get('/api/semen/monthly/:year/:month', function (req, res) {
    console.log('   Serving montly')
    res.send(req.params)
});

app.get('/api/semen/yearly/:year', function (req, res) {
    console.log('   Serving yearly')
    res.send(req.params)
});

app.get('/api/semen/monthlystatistics/:historical', function (req, res) {
    console.log('   Serving statistics')
    res.send(req.params)
});


app.listen(http_port, () => console.log(`I am listening on port ${http_port}!`));
