#! /usr/local/bin/node

const args = process.argv.slice(2);

const YAML = require('yamljs');

const commands = ['install', 'uninstall'];

let path = './default';
if (args[0] === 'install') {
  path = './install';
  args = args.slice(1);
} else if (args[0] === 'uninstall') {
  path = './uninstall';
  args = args.slice(1);
}

const paramsMap = require(path);

if (args.length === 0) {
  args.push('-h');
}

for (let i = 0; i < args.length; i ++) {
	arg = args[i];
	if (arg.startsWith('-')) {
		const required = paramsMap[arg].expecting;
		if (required > 0) {
      let params = [];
			for (let n = 0; n < required; n ++) {
        let nextParam = args[++i];
        if(nextParam) {
  				params.push(nextParam);
        } else {
          throw new Error(`Missing parameter for ${arg} option, expecting ${paramsMap[arg].expectingMessage}`);
        }
			}
      if (params)
			paramsMap[arg].execute(...params);
		} else {
			paramsMap[arg].execute();
		}
	}
}