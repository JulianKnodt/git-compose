const fs = require('fs');
const path = require('path');

const reporter = require('../utils/report');
const types = [
'applypatch-msg',
'commit-msg',
'post-applypatch',
'post-checkout',
'post-commit',
'post-merge',
'post-rewrite',
'post-update',
'pre-applypatch',
'pre-auto-gc',
'pre-commit',
'pre-push',
'pre-rebase',
'pre-receive',
'prepare-commit-msg',
'update'];
const camelCaps = str => str.split('-').map((s, i) => i ? (s[0].toUpperCase() + s.slice(1)) : s).join('');
const changeToTemplateName = str => camelCaps('template-'+str)+'.js';
module.exports = (type, options) => {
  if (types.includes(type)) {
    let templateName = changeToTemplateName(type);
    let readStream = fs.createReadStream(path.resolve(__dirname, '../templates/', templateName));
    let writeStream = fs.createWriteStream(path.resolve('./', camelCaps(type)+'.js'))
    readStream.pipe(writeStream);
    writeStream.on('close', () => {
      reporter.success(`new hook at ${path.resolve('./', camelCaps(type)+'.js')}`);
    });
  } else {
    reporter.error(`type not found
found: ${type},
expected: one of ${types.join(' ')}`);
  }
};
module.exports.options = {};