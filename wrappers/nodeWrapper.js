#! /usr/local/bin/node

const path = require('path');
const fs = require('fs');
const qs = require('querystring');
const optionParser = require('../utils/option.js');
let args = process.argv;
let i = args.length;
while(i >= 0 && args[--i] !== '--args');
module.exports=()=>{};
let passed = [];
let hooks = args.slice(2);
if (i !== -1) {
	passed = args.slice(i+1)
	hooks = args.slice(2, i);
}
hooks = hooks.map(hookQS => qs.parse(hookQS));

passed = passed.reduce((args, nextArg) => {
  args = args.concat(nextArg);
	if(nextArg !== path.basename(nextArg)) {
    args = args.concat(fs.readFileSync(nextArg));
  }
  return args;
}, []);
let testValues = hooks.map(hook => {
  let test = require(hook.test);
  console.log(hook, 'Hook');
  // console.log(test, hook.options, 'OPTIONS');
  test(optionParser(hook.options, test.options), ...passed)
});
