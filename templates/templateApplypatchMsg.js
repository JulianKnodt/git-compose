const reporter = require('../utils/report.js');
const fs = require('fs');
const runTest = (commitMsg, options) => {
  let test;
  if (test) {
    reporter.success('success');
    options.error ? reporter.error('error') : reporter.warning('warn');
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
  example: {
    expecting: 0,
    alias: 'exampleOption',
    default: 'default will be wrapped in array'
  }, 
  error: {
    expecting: 0,
    default: false
  }
}
