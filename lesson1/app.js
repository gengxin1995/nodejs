//引入依赖
var express = require('express');
//建立express实例
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('app is listening at port 3000');
})