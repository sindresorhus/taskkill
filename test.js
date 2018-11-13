import childProcess from 'child_process';
import test from 'ava';
import m from '.';

test('kills a process', async t => {
	const {pid} = childProcess.spawn(process.execPath);
	await m(pid, {force: true});

	// Check if the process exists
	t.throws(() => process.kill(pid));
});

test('throws on not found', async t => {
	await t.throws(m('not-running.exe'));
});
