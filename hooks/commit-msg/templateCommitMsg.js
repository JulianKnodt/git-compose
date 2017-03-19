const reporter = require('../../utils/report.js');
const fs = require('fs');
const runTest = commitMsg => {
  let test;
  if (test) {
    reporter.success('success');
    reporter.warning('warn');
    reporter.error('error');
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
