# taskkill [![Build status](https://ci.appveyor.com/api/projects/status/3nbck5l209huf4mn/branch/master?svg=true)](https://ci.appveyor.com/project/sindresorhus/taskkill/branch/master)

> Wrapper for the Windows [`taskkill`](https://technet.microsoft.com/en-us/library/bb491009.aspx) command. Ends one or more tasks or processes.


## Install

```
$ npm install --save taskkill
```


## Usage

```js
var taskkill = require('taskkill');

var input = [4970, 4512];

taskkill(input, function (err) {
	if (!err) {
		console.log('Successfully terminated ' + input.join(', '));
	}
});
```


## API

See the [`taskkill` docs](https://technet.microsoft.com/en-us/library/bb491009.aspx) for more.

### taskkill(input, [options], [callback])

#### input

Type: `string`, `array`

One or more process IDs or image names, but not mixed.

#### options

The `system`, `username`, `password` options are mutually inclusive.

##### system

Type: `string`

Name or IP address of a remote computer (do not use backslashes). The default is the local computer.

##### username

Type: `string`

User specified by User or Domain\User. The default is the permissions of the current logged on user on the computer issuing the command.

##### password

Type: `string`

Password of the user account for the specified `username`.

##### filter

Type: `string`

Types of processes to include or exclude from termination.

See the [`taskkill` docs](https://technet.microsoft.com/en-us/library/bb491009.aspx) for supported filters.

##### force

Type: `boolean`

Forcefully terminate processes. Ignored for remote processes as all remote processes are forcefully terminated.

##### tree

Type: `boolean`

Terminate all child processes along with the parent process, commonly known as a tree kill.

#### callback(error)


## Related

- [tasklist](https://github.com/sindresorhus/tasklist) - Wrapper for the Windows `tasklist` command.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
