'use strict';

let cp = require('child_process');
let sprintf = require("sprintf-js").sprintf;

let pregex = {}

const perlMatchCommand =
	'perl -nle ' +
	'\'@res = m/%s/%s; ' +
	'print ($& ne "")\'';

/**
 * Simulate the match() function using perl regular expression engine instead of javascript regular
 * expression engine.
 *
 * @param {string} string				The string to match.
 * @param {string|RegExp} regex			The regular expression for execution, see
 *										http://perldoc.perl.org/perlre.html#Regular-Expressions
 * @param {string} options				The options of the regular expression, if \c regex is \c
 *										RegExp type, this parameter will be ignored, see
 *										http://perldoc.perl.org/perlre.html#Modifiers
 * @return {boolean}					\c true when the string is matched.
 */
pregex.match = function(string, regex, options) {
	try {
		if ((typeof(options) === 'undefined') || (options === null)) {
			options = ''; // default option
		}

		if (regex instanceof RegExp) {
			let regexStr = regex.toString();
			regex = regexStr.match(/^\/(.*)\/\w*$/)[1];
			options = regexStr.match(/^\/.*\/(\w*)$/)[1];
		}

		let escapedString = string.toString().replace(/\\/g, '\\\\').replace(/"/g, '\\"');
		escapedString = escapedString.replace(/\n/g, '\xff');
		// Escape the $ sign here
		escapedString = escapedString.replace(/\$/g, '\\$');
		regex = regex.toString().replace(/'/g, '\\\'');
		regex = regex.replace(/\\n/g, '\xff');
		let matchCommand = sprintf(perlMatchCommand, regex, options);
		let match = cp.execSync(sprintf('echo "%s"|%s', escapedString, matchCommand));

		match = match.toString('utf8').replace(/\\/g, '\\\\').replace(/"/g, '\\"');
		if (match == "1\n") {
			return true;
		}

		return false;
	} catch (exception) {
		return false;
	}
}

const perlExecCommand =
	'perl -nle ' +
	'\'@res = m/%s/%s; ' +
	'$,="\n"; ' +
	'if ($& ne "") { ' +
		'print $&; ' +
		'if ((scalar(@res) > 1) || ($1 ne "")) { print @res } ' +
	'}\'';

/**
 * Simulate the exec() function using perl regular expression engine instead of javascript regular
 * expression engine.
 *
 * @param {string} string				The string to execute regex.
 * @param {string|RegExp} regex			The regular expression for execution, see
 *										http://perldoc.perl.org/perlre.html#Regular-Expressions
 * @param {string} options				The options of the regular expression, if \c regex is \c
 *										RegExp type, this parameter will be ignored, see
 *										http://perldoc.perl.org/perlre.html#Modifiers
 * @return {array|null}					An Array containing the entire match result and any
 *										parentheses-captured matched results; null if there were no
 *										matches.
 */
pregex.exec = function(string, regex, options) {
	try {
		if ((typeof(options) === 'undefined') || (options === null)) {
			options = ''; // default option
		}

		if (regex instanceof RegExp) {
			let regexStr = regex.toString();
			regex = regexStr.match(/^\/(.*)\/\w*$/)[1];
			options = regexStr.match(/^\/.*\/(\w*)$/)[1];
		}

		let escapedString = string.toString().replace(/\\/g, '\\\\').replace(/"/g, '\\"');
		escapedString = escapedString.replace(/\n/g, '\xff');
		// Escape the $ sign here
		escapedString = escapedString.replace(/\$/g, '\\$');
		regex = regex.toString().replace(/'/g, '\\\'');
		regex = regex.replace(/\\n/g, '\xff');
		let execCommand = sprintf(perlExecCommand, regex, options);
		let match = cp.execSync(sprintf('echo "%s"|%s', escapedString, execCommand));

		match = match.toString('utf8').replace(/\\/g, '\\\\').replace(/"/g, '\\"');
		match = match.split("\n");
		match.pop(); // remove the last newline character.

		if (match.length == 0) {
			return null;
		}

		for (let index=0;index<match.length;++index) {
			match[index] = match[index].toString().replace(/\xff/g, "\n");
		}

		return match;
	} catch (exception) {
		return null;
	}
}

module.exports = pregex;
