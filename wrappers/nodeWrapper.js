#! /usr/local/bin/node

const path = require('path');
const fs = require('fs');

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
passed = passed.reduce((args, nextArg) => {
  args = args.concat(nextArg);
	if(nextArg !== path.basename(nextArg)) {
    args = args.concat(fs.readFileSync(nextArg));
  }
  return args;
}, []);
let testValues = hooks.map(hook => require(hook)(...passed));