var stringify = require('streaming-json-stringify')

if (process.env.HACK_BROWSERIFY_BUILD) {
// actualy that code does nothing, just puts a wrapper function on top of the write function, that shouldn't affect anything
// and yet, it does.
    var Writable = require('stream').Writable;
    var oldWrite = Writable.prototype.write;

    Writable.prototype.write = function (chunk, encoding, cb) {
            oldWrite.apply(this, arguments);
    };
}

var browserify = require('browserify');
var fs = require('fs');

var factorBundleOpts = {
    o: [ './dist/main.js', './dist/one_module.js', './dist/two_module.js', './dist/three_module.js']
};

var b = browserify();

b.add("./entry.js");
b.require('./lib/modules/one.js');
b.require('./lib/modules/two.js');
b.require('./lib/modules/three.js');

b.plugin('factor-bundle', factorBundleOpts);

var len = b.pipeline.length;
for (var i = 0; i < len; i ++) {
    var cur = b.pipeline.get(i),
        file;

    console.log('i was ' + i);
    if (!cur.label) throw 'no label!!! ARgghghhh!!!';
    file = fs.createWriteStream('./logs/' + i + '-' + cur.label + '.js');
    cur.pipe(stringify()).pipe(file);
}

b.bundle().pipe(fs.createWriteStream("./dist/modules_shared.js"));