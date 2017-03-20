const reporter = require('../utils/report.js');
module.exports = (options) => {
  let test;
  if (test) {
    reporter.success('success');
    options.error ? reporter.error('error') : reporter.warning('warn');
  }
}
module.exports.options = {
  error: {
    expecting: 0,
    default: false
  }
}
