#! /usr/local/bin/node

const args = process.argv.pop();
const fs = require('fs');

fs.readFile(args, (err, data) => {
  if (err) {
    console.log(err);
    process.exitCode = 1;
  } else {
    let test = data.toString().split('\n');
    if (test.length > 1) {
      if (test[1] === '') {
        console.log('✓ Single Line Commit Message');
        process.exitCode = 0;
      } else {
        console.log('Subject should be one line and followed by a blank line');
        process.exitCode = 1;
      }
    } else {
      process.exitCode = 0;
    }
  }
});
