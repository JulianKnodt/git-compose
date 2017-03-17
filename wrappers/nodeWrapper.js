#! /usr/local/bin/node

const path = require('path');

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
let testValues = hooks.map(hook => require(hook)(...passed));