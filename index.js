#! /usr/local/bin/node

let args = process.argv.slice(2);

let path = './default';
if (args[0] === 'install') {
  path = './install';
  args = args.slice(1);
} else if (args[0] === 'uninstall') {
  path = './uninstall';
  args = args.slice(1);
} else if (args[0] === 'init') {
  path = './init';
  args = args.slice(1);
  return require(path)(__dirname);
} else if (args[0] === 'port') {
  path = './port';
  args = args.slice(1);
}

const paramsMap = require(path);

if (args.length === 0 && path === './default') {
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

if (!(require.main === module)) {
  module.exports = {
    reporter: require('./utils/report.js')
  };
}