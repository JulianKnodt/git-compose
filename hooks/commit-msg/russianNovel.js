const reporter = require('../../utils/report.js');
const fs = require('fs');
const runTest = commitMsg => {
  console.log(commitMsg.toString().split('\n'));
  if(commitMsg.toString().split('\n').length > 10) {
    reporter.warn('Looks like you wrote a russian novel...');
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
