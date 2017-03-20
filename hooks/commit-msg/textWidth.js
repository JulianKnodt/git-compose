const reporter = require('../../utils/report.js');
const fs = require('fs');
const runTest = (commitMsg, options) => {
  let test = commitMsg.toString().split('\n');
  if (test.every(line => line.length < options.length)) {
    reporter.success(`every line is under ${options.length} characters`);
  } else {
    reporter.error(`one or more lines is above ${options.length} characters`);
  }
}
module.exports = (options, filePath, fileData) => {
  if (fileData) {
    runTest(fileData, options);
  } else {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reporter.error(err)
      } else {
        runTest(data, options);
      }
    });
  }
}
module.exports.options = {
  length: {
    expecting: 1,
    default: 80,
    singular: true
  }
}