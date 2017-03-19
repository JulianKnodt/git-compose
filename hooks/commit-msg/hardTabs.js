const reporter = require('../../utils/report.js');
const fs = require('fs');
const runTest = (commitMsg, options) => {
  console.log(options);
  if (commitMsg.indexOf('\t') === -1) {
    reporter.success('No hard tabs in commit message');
  } else {
    const msg = 'Don\'t include hard tabs in commit message';
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
};
module.exports.options = {
  error: {
    expecting: 0
  }
};
