'use strict';

let pregex = require('../lib/regex.js');

exports['pregex:match'] = function(test) {
	test.expect(13);

	// match 1
	test.equal(pregex.match('Hello World !!!', /\w+ \w+ !{3}/), true);
	test.equal(pregex.match('Hello World !!!', /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/), false);
	test.equal(pregex.match('Hello World !!!', '\\w+ \\w+ !{3}'), true);
	test.equal(pregex.match('Hello World !!!', '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'), false);

	// match 2
	test.equal(pregex.match('test@example.com', /\w+ \w+ !{3}/), false);
	test.equal(pregex.match('test@example.com', /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/), true);
	test.equal(pregex.match('test@example.com', '\\w+ \\w+ !{3}'), false);
	test.equal(pregex.match('test@example.com', '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'), true);

	// match 3
	let multiLines=`Multi
		foo
		bar`;
	test.equal(pregex.match(multiLines, '[a-zA-Z]*?\\n(.*)', 'i'), true);

	// options
	test.equal(pregex.match('HellohelloHELLO', /(?:hello){3}/i), true);
	test.equal(pregex.match('HellohelloHELLO', '(?:hello){3}', 'i'), true);

	// error handling
	test.equal(pregex.match('test', '(test'), false);
	test.equal(pregex.match('test', 'test', 'e'), false);

	test.done();
};

exports['pregex:exec'] = function(test) {
	test.expect(18);

	// exec 1
	test.deepEqual(pregex.exec('Hello World !!!', /\d+/), null);
	test.deepEqual(pregex.exec('Hello World !!!', /\w+/), ['Hello']);
	test.deepEqual(pregex.exec('Hello World !!!', /\w+ (\w+)/), ['Hello World', 'World']);
	test.deepEqual(pregex.exec('Hello World !!!', '\\d+'), null);
	test.deepEqual(pregex.exec('Hello World !!!', '\\w+'), ['Hello']);
	test.deepEqual(pregex.exec('Hello World !!!', '\\w+ (\\w+)'), ['Hello World', 'World']);

	// exec 2
	test.deepEqual(pregex.exec('My email is testexample.com ^_^', /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/), null);
	test.deepEqual(pregex.exec('My email is test@example.com ^_^', /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/), ['test@example.com']);
	test.deepEqual(pregex.exec('My email is test@example.com ^_^', /([a-zA-Z0-9_.+-]+)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/), ['test@example.com', 'test']);
	test.deepEqual(pregex.exec('My email is testexample.com ^_^', '[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+'), null);
	test.deepEqual(pregex.exec('My email is test@example.com ^_^', '[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+'), ['test@example.com']);
	test.deepEqual(pregex.exec('My email is test@example.com ^_^', '([a-zA-Z0-9_.+-]+)@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+'), ['test@example.com', 'test']);

	// match 3
	let multiLines=`Multi
		foo
		bar`;
	test.deepEqual(pregex.exec(multiLines, '[a-zA-Z]*?\\n(.*)', 'i'), ["Multi\n\t\tfoo\n\t\tbar", "\t\tfoo\n\t\tbar"]);

	// options 1
	test.deepEqual(pregex.exec('Hello World !!!', /\w+/g), ['World', 'Hello', 'World']);
	test.deepEqual(pregex.exec('Hello World !!!', '\\w+', 'g'), ['World', 'Hello', 'World']);

	// options 2
	test.deepEqual(pregex.exec("tag list:\n\tabc\n\tdef", '^tag[^\\n]*\\n(.*)', 'ms'), ["tag list:\n\tabc\n\tdef", "\tabc\n\tdef"]);

	// error handling
	test.equal(pregex.exec('test', '(test'), null);
	test.equal(pregex.exec('test', 'test', 'e'), null);

	test.done();
};
