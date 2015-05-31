'use strict';
var childProcess = require('child_process');
var arrify = require('arrify');

module.exports = function (input, opts, cb) {
	if (process.platform !== 'win32') {
		throw new Error('Windows only');
	}

	if (input == null) {
		throw new Error('PID or image name required');
	}

	if (typeof opts !== 'object') {
		cb = opts;
		opts = {};
	}

	cb = cb || function () {}

	var args = [];

	if (opts.system && opts.username && opts.password) {
		args.push('/s', opts.system, '/u', opts.username, '/p', opts.password);
	}

	if (opts.filter) {
		args.push('/fi', opts.filter);
	}

	if (opts.force) {
		args.push('/f');
	}

	if (opts.tree) {
		args.push('/t');
	}

	arrify(input).forEach(function (el) {
		args.push(typeof el === 'number' ? '/pid' : '/im', el);
	});

	childProcess.execFile('taskkill', args, function (err) {
		cb(err);
	});
};
