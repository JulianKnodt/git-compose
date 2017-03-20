const npm = require('npm');
const fs = require('fs');
const path = require('path');

const reporter = require('../../utils/report.js');
module.exports = (options, firstRef, secondRef, checkoutFlag) => {
  npm.load(options.package, (err, config) => {
    if (err) return reporter.warn(err);
    config.install((err, installed, extra) => {
      if (err) return reporter.warn(err);
      if (installed.length) {
        reporter.success('installed' + installed.map(x => x[0]).join(' '))
      } else {
        reporter.success('No new modules installed');
      }
      if (options.verbose) {
        console.log(extra);
      }
    });
  });
}
module.exports.options = {
  error: {
    expecting: 0
  },
  p: {
    alias: 'package'
  },
  package: {
    expecting: 1,
    singular: true,
    default: path.resolve(__dirname, './package.json')
  },
  v: {
    alias: 'verbose'
  },
  verbose: {
    expecting: 0,
    singular: true,
    default: false
  }
};