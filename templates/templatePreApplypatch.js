const reporter = require('../utils/report.js');
module.exports = (options) => {
  reporter.success;
  options.error ? reporter.error : reporter.warn;
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
