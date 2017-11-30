'use strict';

let pregex = require('../lib/regex.js');

exports['pregex:match'] = function(test) {
	test.expect(23);

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
	test.equal(pregex.match(multiLines, /[a-z]*?\n(.*)/i), true);
	test.equal(pregex.match(multiLines, '[a-z]*?\\n(.*)', 'i'), true);

	// match 4
	test.equal(pregex.match('192.168.0.1', /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/), true);
	test.equal(pregex.match('127.0.0.1', /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/), true);
	test.equal(pregex.match('256.0.0.1', /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/), false);
	test.equal(pregex.match('255.0.0.y', /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/), false);
	test.equal(pregex.match('192.168.0.1', '^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'), true);
	test.equal(pregex.match('127.0.0.1', '^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'), true);
	test.equal(pregex.match('256.0.0.1', '^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'), false);
	test.equal(pregex.match('255.0.0.y', '^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'), false);

	// match 5
	test.equal(pregex.match('My name is <$test>.', '^.+<(.+)>.+'), true);

	// options
	test.equal(pregex.match('HellohelloHELLO', /(?:hello){3}/i), true);
	test.equal(pregex.match('HellohelloHELLO', '(?:hello){3}', 'i'), true);

	// error handling
	test.equal(pregex.match('test', '(test'), false);
	test.equal(pregex.match('test', 'test', 'e'), false);

	test.done();
};

exports['pregex:exec'] = function(test) {
	test.expect(28);

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

	// exec 3
	let multiLines=`Multi
		foo
		bar`;
	test.deepEqual(pregex.exec(multiLines, /[a-z]*?\n(.*)/i), ["Multi\n\t\tfoo\n\t\tbar", "\t\tfoo\n\t\tbar"]);
	test.deepEqual(pregex.exec(multiLines, '[a-z]*?\\n(.*)', 'i'), ["Multi\n\t\tfoo\n\t\tbar", "\t\tfoo\n\t\tbar"]);

	// exec 4
	test.deepEqual(pregex.exec('192.168.0.1', /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/), ['192.168.0.1', '192', '168', '0', '1']);
	test.deepEqual(pregex.exec('127.0.0.1', /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/), ['127.0.0.1', '127', '0', '0', '1']);
	test.deepEqual(pregex.exec('256.0.0.1', /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/), null);
	test.deepEqual(pregex.exec('255.0.0.y', /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/), null);
	test.deepEqual(pregex.exec('192.168.0.1', '^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'), ['192.168.0.1', '192', '168', '0', '1']);
	test.deepEqual(pregex.exec('127.0.0.1', '^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'), ['127.0.0.1', '127', '0', '0', '1']);
	test.deepEqual(pregex.exec('256.0.0.1', '^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'), null);
	test.deepEqual(pregex.exec('255.0.0.y', '^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'), null);

	// exec 5
	test.deepEqual(pregex.exec('My name is <$test>.', '^.+<(.+)>.+'), ['My name is <$test>.', '$test']);
	
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
