var superagent = require('superagent');
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');

var url = require('url');
var cnodeUrl = 'https://cnodejs.org/';

superagent.get(cnodeUrl)
    .end(function (err, res) {
        if (err) {
            return console.error(err);
        }
        var totalUrls = [];
        var $ = cheerio.load(res.text);
        $('#topic_list .topic_title').each(function (idx, element) {
            var $element = $(element);
            // $element.attr('href') 本来的样子是 /topic/542acd7d5d28233425538b04
            // 我们用 url.resolve 来自动推断出完整 url，变成
            // https://cnodejs.org/topic/542acd7d5d28233425538b04 的形式
            var href = url.resolve(cnodeUrl, $element.attr('href'));
            totalUrls.push(href);
        })
        console.log(totalUrls);

        var ep = eventproxy();

        ep.after('topic_html', totalUrls.length, function (topics) {
            topics = topics.map(function (topicPair) {
                var topicUrl = topicPair[0],
                    topicHtml = topicPair[1];
                var $ = cheerio.load(topicHtml);
                return ({
                    title: $('.topic_full_title').text().trim(),
                    href: topicUrl,
                    comment1: $('.reply_content').eq(0).text().trim()
                });
            })
            console.log('final:');
            console.log(topics);
        })

        totalUrls.forEach(function (topicUrl) {
            superagent.get(topicUrl)
                .end(function (err, res) {
                    console.log('fetch ' + topicUrl + ' successful');
                    ep.emit('topic_html', [topicUrl, res.text]);
                })
        })
    })

/*
eventproxy最常见的用法
1. 先 var ep = new eventproxy(); 得到一个 eventproxy 实例。
2. 告诉它你要监听哪些事件，并给它一个回调函数。ep.all('event1', 'event2', function (result1, result2) {})。
3. 在适当的时候 ep.emit('event_name', eventData)。
*/

