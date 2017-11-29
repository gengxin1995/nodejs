var net = require('net');

process.stdin.resume();
process.stdin.setEncoding('utf8');

//连接服务器
var client = net.connect({port: 8080}, function () {
    console.log('Connected to server');

    //获取输入的字符串
    console.log('input:');
    process.stdin.on('data', function (data) {
        console.log('input:');
        client.write(data);

        if (data === 'close\n') {
            client.end();
        }
    });
});

//接收服务端的数据
client.on('data', function (data) {
    console.log('Other user\'s input', data.toString());
});

//断开连接
client.on('end', function () {
    console.log('Disconnected from server');
    process.exit();
});