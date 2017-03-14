#! /usr/local/bin/node

const path = require('path');

let args = process.argv.slice(2);
module.exports=()=>{};
return require(args[0] || path.resolve(__dirname, __filename))(args.slice(1));