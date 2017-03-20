const read = require('fs-readdir-recursive');
const fs = require('fs');
var detect = require('language-detect');
const path = require('path');
const chalk = require('chalk');
const HookCreator = require('./hookCreator');
module.exports = ({filePath, hooksPath}) => {
  fs.accessSync(hooksPath);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      throw err;
    }
    let options = JSON.parse(data);
    for (let language in options.wrappers.languages) {
      let wrapperPath = options.wrappers.languages[language];
      options.wrappers.languages[language] = path.isAbsolute(wrapperPath) ? wrapperPath : path.resolve(wrapperPath);
    }
    for (let hook in options.hooks) {
      let outputFile = new HookCreator(hook);
      const hookOptions = options.hooks[hook];
      hookOptions.hooks.forEach(hook => {
        if (hook.include) {
          const languageType = detect.filename(hook.path).toLowerCase();
          let wrapper = options.wrappers.languages[languageType];
          if (wrapper) {
            outputFile.write(wrapper, path.isAbsolute(hook.path) ? hook.path : path.resolve(hook.path), hook.options);
          }
        }
      });
      let writePath = path.resolve(hooksPath, hook);
      fs.writeFile(writePath, outputFile.eval(), (err, data) => {
        if (!err) {
          hookOptions.hooks.length && console.log(`${chalk.bold(hook)}: ${hookOptions.hooks.length} hooks`);
          fs.chmod(writePath, 0755, (err, data) => {
            err && console.log(chalk.red(err));
          });
        }
      });
    }
  });
}
module.exports.options = {
  f: {
    alias: 'filePath',
  },
  h: {
    alias: 'hooksPath',
  },
  filePath: {
    expecting: 1,
    default: () => path.resolve('git-compose.json'),
    singular: true
  },
  hooksPath: {
    expecting: 1,
    default: () => path.resolve('./.git/hooks'),
    singular: true
  }
};


