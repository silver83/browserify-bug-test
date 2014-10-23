if (process.env.HACK_BROWSERIFY_BUILD) {
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
b.require('./lib/modules/one.js', { expose: "../modules/one" });
b.require('./lib/modules/two.js', { expose: "../modules/two" });
b.require('./lib/modules/three.js', { expose: "../modules/three" });

b.plugin('factor-bundle', factorBundleOpts);

b.bundle().pipe(fs.createWriteStream("./dist/modules_shared.js"));

