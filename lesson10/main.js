var Benchmark = require('benchmark');

var suite = new Benchmark.Suite;

var int1 = function (str) {
    return +str;
};

var int2 = function (str) {
    return parseInt(str, 10);
};

var int3 = function (str) {
    return Number(str);
};

var number = '100';

//add tests
suite
    .add('+', function () {
        int1(number);
    })
    .add('parseInt', function () {
        int2(number);
    })
    .add('Number', function () {
        int3(number);
    })
    //add listener
    .on('cycle', function (e) {
        console.log(String(e.target));
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    //run async
    .run({'async': true});
