var fs = require('fs');

function route(handle, pathname, req, res) {
    console.log('About to route request for ' + pathname);

    // 判断此url是否存在特定处理函数
    // 存在则调用handle处理
    // 不存在则返回404页面
    if (typeof handle[pathname] === 'function') {
        handle[pathname](req, res);
    } else {
        console.log('No request handle found for ' + pathname);

        var content = fs.readFileSync('./views/404.html');
        res.writeHead(404, { 'Content-type': 'text/html' });
        res.write(content);
        res.end();
    }

}

exports.route = route;