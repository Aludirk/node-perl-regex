# Perl regex engine for node.js

Binding Perl to enrich the regular expression from [node.js](https://nodejs.org/), such as look behind assertion.

# Requirements

* [Perl 5](https://www.perl.org/) is needed.

# Installation

```bash
npm install perl-regex
```

# Examples

* Match using regular expression in string:

```javascript
let pregex = require('node-perl-regex');

console.log(pregex.match('EMAIL: test@example.com',
                         '^email: [a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$',
                         'i'));

// output:
// true
```

* Match using `RegExp` object:

```javascript
let pregex = require('node-perl-regex');

console.log(pregex.match('EMAIL: test@example.com',
                         /^email: [a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i));

// output:
// true
```

* Exec regular expression in string:

```javascript
let pregex = require('node-perl-regex');

console.log(pregex.exec('Great responsibility comes with great power',
                        '(?<=great )\\w+',
                        'gi'));

// output:
// [ 'power', 'responsibility', 'power' ]
```

* Exec `RegExp` object:

```javascript
let pregex = require('node-perl-regex');

console.log(pregex.exec('https://127.0.0.1:1314/index.html',
                        /(https?):\/\/(\d+\.\d+\.\d+\.\d+):(\d+)\/([a-zA-z.]+)/));

// output:
// [ 'https://127.0.0.1:1314/index.html',
//   'https',
//   '127.0.0.1',
//   '1314',
//   'index.html' ]
```
