import childProcess from 'child_process';
import test from 'ava';
import m from './';

test(async t => {
	const pid = childProcess.spawn(process.execPath).pid;
	await m(pid, {force: true});

	// check if the process exists
	t.throws(() => process.kill(pid));
});
