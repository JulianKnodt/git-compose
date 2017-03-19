const reporter = require('../../utils/report.js');
const fs = require('fs');
const runTest = (commitMsg, options) => {
  let test = commitMsg.toString().split('\n')[0];
  if (!test.endsWith('.')) {
    reporter.success('No trailing period');
  } else {
    let msg = `Commit message ends with trailing period`
    options.error ? reporter.error(msg) : reporter.warning(msg);
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
  error: {
    expecting: 0,
    default: false
  }
}