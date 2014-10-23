When building with browserify with factor-bundle plugin, the dist/main.js is missing the ending chunk and the entry point postfix (i.e. [1]}); )

The difference from the good build to bad build is only:
========================================================
```
if (process.env.HACK_BROWSERIFY_BUILD) {
	// actualy that code does nothing, just puts a wrapper function on top of the write function, that shouldn't affect anything
	// and yet, it does.
        var Writable = require('stream').Writable;
        var oldWrite = Writable.prototype.write;

        Writable.prototype.write = function (chunk, encoding, cb) {
                oldWrite.apply(this, arguments);
        };
}
```

good build:
===========
HACK_BROWSERIFY_BUILD=yes ./build.sh

result:
-rw-r--r--  1 Yury.Michurin  staff  29215 Oct 23 11:47 dist/main.js

bad build:
==========
./build

result:
-rw-r--r--  1 Yury.Michurin  staff  25980 Oct 23 11:47 dist/main.js

