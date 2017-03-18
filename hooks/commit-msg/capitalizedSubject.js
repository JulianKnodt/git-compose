const reporter = require('../../report/report.js');
const fs = require('fs');
const runTest = commitMsg => {
  let test = commitMsg.toString().split('\n').filter(line => !line.startsWith('#'));
  if (test[0][0] === test[0][0].toUpperCase()) {
    reporter.success('capital subject');
  } else {
    reporter.warn('subject should be capitalized')
  }
}
module.exports = (args, fileData) => {
  if (fileData) {
    runTest(fileData);
  } else 
  fs.readFile(args, (err, data) => {
    if (err) {
      reporter.error(err)
    } else {
      runTest(data);
    }
  });
}
