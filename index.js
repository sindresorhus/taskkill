import process from 'node:process';
import {execa, execaSync} from 'execa';

function parseArgs(input, options) {
	if (process.platform !== 'win32') {
		throw new Error('Windows only');
	}

	input = [input].flat();

	if (input.length === 0) {
		throw new Error('PID or image name required');
	}

	const arguments_ = [];

	if (options.system && options.username && options.password) {
		arguments_.push('/s', options.system, '/u', options.username, '/p', options.password);
	}

	if (options.filter) {
		arguments_.push('/fi', options.filter);
	}

	if (options.force) {
		arguments_.push('/f');
	}

	if (options.tree) {
		arguments_.push('/t');
	}

	for (const element of input) {
		arguments_.push(typeof element === 'number' ? '/pid' : '/im', element);
	}

	return arguments_;
}

export async function taskkill(input, options = {}) {
	await execa('taskkill', parseArgs(input, options));
}

export function taskkillSync(input, options = {}) {
	execaSync('taskkill', parseArgs(input, options));
}
