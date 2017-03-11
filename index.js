#! /usr/local/bin/node

const args = process.argv.slice(2);

const YAML = require('yamljs');

const paramMap = require('./params');

for (let i = 0; i < args.length; i ++) {
	arg = args[i];
	if (arg.startsWith('-')) {
		const required = paramMap[arg].expecting;
		if (required > 0) {
      let params = [];
			for (let n = 0; n < required; n ++) {
        let nextParam = args[++i];
        if(nextParam) {
  				params.push(nextParam);
        } else {
          throw new Error(`Missing parameter for ${arg} option, expecting ${paramMap[arg].expectingMessage}`);
        }
			}
      if (params)
			paramMap[arg].execute(...params);
		} else {
			paramMap[arg].execute();
		}
	}
}

console.log(YAML.load('default.yaml'));