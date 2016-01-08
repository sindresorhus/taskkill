'use strict';
const arrify = require('arrify');
const execa = require('execa');

module.exports = (input, opts) => {
	input = arrify(input);
	opts = opts || {};

	if (process.platform !== 'win32') {
		return Promise.reject(new Error('Windows only'));
	}

	if (input.length === 0) {
		return Promise.reject(new Error('PID or image name required'));
	}

	const args = [];

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

	input.forEach(x => args.push(typeof x === 'number' ? '/pid' : '/im', x));

	return execa('taskkill', args);
};
