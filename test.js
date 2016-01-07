'use strict';
var childProcess = require('child_process');
var test = require('ava');
var taskkill = require('./');

test(function (t) {
	t.plan(1);

	var pid = childProcess.spawn(process.execPath).pid;

	taskkill(pid, {force: true}).then(function () {
		// check if the process exists
		try {
			process.kill(pid);
			t.assert(false);
		} catch (err) {
			t.assert(true);
		}
	});
});
