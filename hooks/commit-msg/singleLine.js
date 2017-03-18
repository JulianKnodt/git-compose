const reporter = require('../../report/report.js');
const fs = require('fs');
const runTest = commitMsg => {
  let test = commitMsg.toString().split('\n').filter(line => !line.startsWith('#'));
  if (test.length > 2) {
    if (test[1] === '') {
      reporter.success('single line commit message');
    } else {
      reporter.error('commit message should be followed by an empty line');
    }
  } else {
    reporter.success('only one line in commit');
  }
}
module.exports = (args, fileData) => {
  if (fileData) {
    runTest(fileData);
  } else {
    fs.readFile(args, (err, data) => {
      if (err) {
        reporter.error(err)
      } else {
        runTest(data);
      }
    });
  }
}
