const path = require('path');
const fs = require('fs');
const reporter = require('../utils/report');
module.exports = ({hooksPath=path.resolve('.git/hooks')}) => {
  let hooks = fs.readdirSync(hooksPath);
  hooks.forEach(hook => {
    fs.unlinkSync(path.resolve(hooksPath, hook));
  });
  fs.rmdirSync(hooksPath);
  fs.mkdir(hooksPath, (err, res) => {
    if (err) return reporter.error(err);
    reporter.success(`Emptied ${hooksPath}`);
  });
}
module.exports.options = {
  h: {
    alias: 'hooksPath'
  },
  hooksPath: {
    expecting: 1,
    default: () => path.resolve('.git/hooks'),
    singular: true
  }
}