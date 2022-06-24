import childProcess from 'node:child_process';
import process from 'node:process';
import test from 'ava';
import {taskkill, taskkillSync} from './index.js';

test('async - kills a process', async t => {
	const {pid} = childProcess.spawn(process.execPath);
	await taskkill(pid, {force: true});

	// Check if the process exists
	t.throws(() => {
		process.kill(pid);
	});
});

test('async - throws on not found', async t => {
	await t.throwsAsync(taskkill('not-running.exe'));
});

test('sync - kills a process', t => {
	const {pid} = childProcess.spawn(process.execPath);
	taskkillSync(pid, {force: true});

	// Check if the process exists
	t.throws(() => {
		process.kill(pid);
	});
});

test('sync - throws on not found', t => {
	t.throws(() => {
		taskkillSync('not-running.exe');
	});
});
