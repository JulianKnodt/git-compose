const reporter = require('../../utils/report.js');
const fs = require('fs');
const runTest = commitMsg => {
  commitMsg = commitMsg.toString().split('\n')[0];
  if (commitMsg.length === 0) {
    reporter.error(`cannot have empty commit message`);
  } else {
    reporter.success('Non-empty commit message');
  }
}
module.exports = (options, filePath, fileData) => {
  if (fileData) {
    runTest(fileData);
  } else {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reporter.error(err)
      } else {
        runTest(data);
      }
    });
  }
}
