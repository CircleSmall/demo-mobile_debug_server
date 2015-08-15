/**
 * 扩展现有 Date 对象
 * @author: wulj
 * @date: 11-7-13
 * @version: 1.0
 */
var KDate = function() {
    this.init.apply(this, arguments);
};
KDate.template = {
    '-': 'y%-m%-d%',
    '-0': 'y%-m%-d%'
};

var i18n = {
    months: {
        'num': {
            '0': '1',
            '1': '2',
            '2': '3',
            '3': '4',
            '4': '5',
            '5': '6',
            '6': '7',
            '7': '8',
            '8': '9',
            '9': '10',
            '10': '11',
            '11': '12'
        },
        'en': {
            '0': 'January',
            '1': 'February',
            '2': 'March',
            '3': 'April',
            '4': 'May',
            '5': 'June',
            '6': 'July',
            '7': 'August',
            '8': 'September',
            '9': 'October',
            '10': 'November',
            '11': 'December'
        },
        'ch': {
            '0': '一月',
            '1': '二月',
            '2': '三月',
            '3': '四月',
            '4': '五月',
            '5': '六月',
            '6': '七月',
            '7': '八月',
            '8': '九月',
            '9': '十月',
            '10': '十一月',
            '11': '十二月'
        }
    },

    weeks: {
        'num': {
            '0': '7',
            '1': '1',
            '2': '2',
            '3': '3',
            '4': '4',
            '5': '5',
            '6': '6'
        },
        'en': {
            '0': 'Sunday',
            '1': 'Monday',
            '2': 'Tuesday',
            '3': 'Wednesday',
            '4': 'Thursday',
            '5': 'Friday',
            '6': 'Saturday'
        },
        'ch': {
            '0': '周日',
            '1': '周一',
            '2': '周二',
            '3': '周三',
            '4': '周四',
            '5': '周五',
            '6': '周六'
        }
    }
};

KDate.prototype = {
    constructor: KDate,
    /**
     * 初始化日期对象
     */
    init: function() {
        var date = {};
        if (arguments.length > 1) {
            date = eval('new Date(' + $.makeArray(arguments).join(',') + ')');
        } else if (arguments.length === 0) {
            date = new Date();
        } else if (arguments.length === 1 && typeof arguments[0] === 'string' && arguments[0].indexOf('-') >= 0) {
            date = arguments[0].replace(/\-|\-0/g, '/');
            date = new Date(date);
        } else {
            date = arguments[0];
        }
        this.date = date;
    },
    /**
     * 创建日期对象
     * @param days 向前或向后几天
     */
    create: function(years, months, days) {
        return new Date(this.date.getFullYear() + years, this.date.getMonth() + months, this.date.getDate() + days);
    },

    getDate: function(years, months, days) {
        this.date = this.create(years, months, days);
        return this;
    },
    /**
     * 得到后一天
     */
    getNextDay: function() {
        return this.getDate(0, 0, 1);
    },
    /**
     * 得到前一天
     */
    getPreDay: function() {
        return this.getDate(0, 0, -1);
    },
    jumpTo: function(years, months, days) {
        this.date = this.create(years, months, days);
        return this.date;
    },
    jump: function(years, months, days) {
        return new this.constructor(this.create(years, months, days));
    },
    /**
     * 得到后一天
     */
    nextDay: function() {
        return this.jump(0, 0, 1);
    },
    /**
     * 得到前一天
     */
    preDay: function() {
        return this.jump(0, 0, -1);
    },
    /**
     * 获取今天的日期对象
     */
    inSameMonthWith: function(dateB) {
        return this.date.getMonth() === dateB.date.getMonth();
    },

    /**
     * 对象日期是否早于{dateB}  精确到毫秒
     * @param dateB
     */
    earlyThan: function(dateB) {
        return this.date < dateB.date;
    },

    /**
     * 对象与dateB的比较  精确到天数
     * @param dateB
     */
    compare: function(dateB) {
        var　 a = this.date;
        var　 b = dateB.date;
        var result;
        if (a.getFullYear() !== b.getFullYear()) {
            result = a.getFullYear() - b.getFullYear();
        } else if (a.getMonth() !== b.getMonth()) {
            result = a.getMonth() - b.getMonth();
        } else {
            result = a.getDate() - b.getDate();
        };
        if (result < 0) {
            return "<"
        } else if (result > 0) {
            return ">"
        } else {
            return "="
        }
    },

    /**
     * 判断当前日期是否处于{a}--->{b}日期区间内
     * @param a 日期 a
     * @param b 日期 b
     */
    isBetween: function(a, b) {
        return a.date <= this.date && this.date <= b.date;
    },
    /**
     * 当前日期所处周的第一天
     * @param location 中，美国
     */
    getWeekFirstDate: function(location) {
        return this.create(0, 0, -this.date.getDay() + ({
            'ch': 1,
            'en': 0
        })[location || 'en']);
    },
    /**
     * 当前日期所处周的最后一天
     * @param location 中，美国
     */
    getWeekLastDate: function(location) {
        return this.create(0, 0, -this.date.getDay() + ({
            'ch': 1,
            'en': 0
        })[location || 'en'] + 6);
    },
    /**
     * 是否等于 {dateB}
     * @param dateB
     */
    equals: function(dateB) {
        return this.toString('-') === dateB.toString('-');
    },
    /**
     * 获取完整字符串，小于 10 的，补 0
     */
    fullStr: function(num) {
        return (parseInt(num, 10) < 10) ? ('0' + num) : num + '';
    },
    /**
     * 国际化
     * @param type
     * @param lang
     * @param str
     */
    internationalization: function(type, lang, str) {
        var i18nObj = i18n;
        if (typeof lang !== 'string') {
            i18nObj = lang;
        }
        return i18nObj[type][lang][str];
    },
    /**
     * 根据模板，输出日期
     * @param template
     * @param lang
     * @param full
     */
    toString: function(template, lang, full) {
        if (!template) {
            template = '-';
        }
        if (!lang) {
            lang = 'num';
        }
        if (template === '-0') {
            full = true;
        } else if (template === '-') {
            full = false;
        }
        if (KDate.template[template] !== undefined) {
            template = KDate.template[template];
        }
        var date = this.date;
        var year = date.getFullYear();
        var month = this.internationalization('months', lang, date.getMonth());
        if (full) {
            month = this.fullStr(month);
        }
        var day = full ? this.fullStr(date.getDate()) : date.getDate();
        var hour = full ? this.fullStr(date.getHours()) : date.getHours();
        var minute = full ? this.fullStr(date.getMinutes()) : date.getMinutes();
        var second = full ? this.fullStr(date.getSeconds()) : date.getSeconds();
        var week = this.internationalization('weeks', lang, date.getDay());
        var replace = function(all, str, reStr) {
            if (all.indexOf(str) >= 0) {
                return all.replace(str, reStr);
            }
            return all;
        };
        template = replace(template, 'y%', year);
        template = replace(template, 'm%', month);
        template = replace(template, 'd%', day);
        template = replace(template, 'h%', hour);
        template = replace(template, 'm%', minute);
        template = replace(template, 's%', second);
        template = replace(template, 'w%', week);
        return template;
    }
};

KDate.TODAY = new KDate();

module.exports =  KDate;
