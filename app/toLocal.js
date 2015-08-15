var path = require("path");
var fs = require("fs");

var schedule = require('node-schedule');

var _ = require("../util/utils");
var log = require("../util/log");
var kDate = require("../util/kDate");


var config = require("../config");
var output = _.realpathSafe(config.output); // 看看内部的输出
var charset = config.charset;
var ext = config.ext;

function toLocal() {};

toLocal.add = function(config, callback) {

    var user = config.user,
        info = this.infoFilter(config.info),
        day = config.day;

    _.write(getPath(day, user), info, charset, true);


    callback && callback();

}

toLocal.get = function(user, day) {
    var p = getPath(day, user);
    return _.read(p);
}

toLocal.clearOld = function() {

}

//信息过滤
toLocal.infoFilter = function(info) {
    return "<p>" + info.toString() + "</p>";
}

function getPath(day, user) {

    var dir = path.resolve(output, day),
        filename = user + ext, //以txt格式为文件后缀名
        finalPath = path.resolve(dir, filename);
    return finalPath;
}

//每天的0点定时清理数据
var rule = new schedule.RecurrenceRule();
rule.hour = 0;
rule.minute = 0;

var j = schedule.scheduleJob(rule, function() {
    fs.readdirSync(output).forEach(function(p) {
        if (_.isDir(path.resolve(output, p))) { // 如果是目录
            var result = new kDate(p).compare(kDate.TODAY.jump(0, 0, -1 * config.cache));
            // 删除cache时间段之外的目录
            if (result == "<") {
                _.del(path.resolve(output, p));
            }

        }
    });
});

module.exports = toLocal;
