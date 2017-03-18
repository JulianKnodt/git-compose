const reporter = require('../../report/report.js');
const fs = require('fs');
module.exports = (args, fileData) => {
  fs.readFile(args, (err, data) => {
    if (err) {
      reporter.error(err)
    } else {
      let test = data.toString().split('\n').filter(line => !line.startsWith('#'));
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
  });
}
