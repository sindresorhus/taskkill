import process from 'node:process';
import arrify from 'arrify';
import execa from 'execa';

export default async function taskkill(input, options = {}) {
	if (process.platform !== 'win32') {
		throw new Error('Windows only');
	}

	input = arrify(input);

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

	await execa('taskkill', arguments_);
}
