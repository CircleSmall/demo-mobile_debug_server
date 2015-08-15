var express = require('express');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var app = express();

var kDate = require("../util/kDate");
var toLocal = require("./toLocal");
var config = require("../config");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.set('views', __dirname + '/../views');
app.engine('html', require('ejs').renderFile);

//add log
app.post('/console_log', function(req, res) {
    var data = req.body;

    var user = data.user,
        info = data.info, //现在只有一行信息，稍后改成支持conosle.log的格式
        day = kDate.TODAY.toString();

    if (!user || !day) {
        res.send("fengshq : something wrong ! -_-!");
    }
    toLocal.add({
        user: user,
        info: info,
        day: day
    }, function(err) {
        if (err) {
            res.send("fengshq : something wrong ! -_-!");
        } else {
            res.sendStatus(200);
        }
    })
})

app.get('/console_log', function(req, res) {
    var data = req.query;

    var user = data.user,
        info = data.info, // 
        day = kDate.TODAY.toString();

    if (!user || !day) {
        res.send("fengshq : something wrong ! -_-!");
    }
    toLocal.add({
        user: user,
        info: info,
        day: day
    }, function(err) {
        if (err) {
            res.send("fengshq : something wrong ! -_-!");
        } else {
            res.sendStatus(200);
        }
    })
})

app.get('/console_log/get/:user', function(req, res) {
    res.render("show.html", {
        content: toLocal.get(req.params.user, kDate.TODAY.toString())
    });
});

module.exports = app;
