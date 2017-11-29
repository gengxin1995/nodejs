var fs = require('fs');

//home.html
function home(req, res) {
    console.log('Request handler "home" was called.');

    var content = fs.readFileSync('./views/home.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(content);
    res.end();
}

//about.html
function about(req, res) {
    console.log('Request handler "about" was called.');

    var content = fs.readFileSync('./views/about.html');
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.write(content);
    res.end();
}

exports.home = home;
exports.about = about;