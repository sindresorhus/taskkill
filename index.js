'use strict';
var arrify = require('arrify');
var execa = require('execa');
var Promise = require('pinkie-promise');

module.exports = function (input, opts) {
	opts = opts || {};

	if (process.platform !== 'win32') {
		return Promise.reject(new Error('Windows only'));
	}

	if (input == null) {
		return Promise.reject(new Error('PID or image name required'));
	}

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

	return execa('taskkill', args);
};
