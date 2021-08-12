import childProcess from 'node:child_process';
import process from 'node:process';
import test from 'ava';
import taskkill from './index.js';

test('kills a process', async t => {
	const {pid} = childProcess.spawn(process.execPath);
	await taskkill(pid, {force: true});

	// Check if the process exists
	t.throws(() => {
		process.kill(pid);
	});
});

test('throws on not found', async t => {
	await t.throwsAsync(taskkill('not-running.exe'));
});
