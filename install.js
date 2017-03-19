const read = require('fs-readdir-recursive');
const fs = require('fs');
let ignored = ['.git', 'node_modules'];
var detect = require('language-detect');
const path = require('path');
const HookCreator = require('./hookCreator');
module.exports = ({filePath=path.resolve(__dirname,'git-compose.json'), hookPath=path.resolve(__dirname, './.git/hooks')}) => {
  fs.readFile(path.resolve(__dirname, 'git-compose.json'), (err, data) => {
    if (err) {
      throw err;
    }
    let options = JSON.parse(data);
    for (let language in options.wrappers.languages) {
      let wrapperPath = options.wrappers.languages[language];
      options.wrappers.languages[language] = path.isAbsolute(wrapperPath) ? wrapperPath : path.resolve(__dirname, wrapperPath);
    }
    for (let hook in options.hooks) {
      let outputFile = new HookCreator(hook);
      const hookOptions = options.hooks[hook];
      hookOptions.hooks.forEach(hook => {
        if (hook.include) {
          const languageType = detect.filename(hook.path).toLowerCase();
          let wrapper = options.wrappers.languages[languageType];
          if (wrapper) {
            outputFile.write(wrapper, path.isAbsolute(hook.path) ? hook.path : path.resolve(__dirname, hook.path), hook.options);
          }
        }
      });
      let writePath = path.resolve(hookPath, hook);
      fs.writeFile(writePath, outputFile.eval(), (err, data) => {
        if (!err) {
          console.log(`Created ${hook} with ${hookOptions.hooks.length} hooks.`);
          fs.chmod(writePath, 0755, (err, data) => {
            // console.log(`${hook} is now runnable.`);
          });
        }
      });
    }
  });
}
module.exports.options = {
  f: {
    alias: 'filePath',
    expecting: 1,
    default: path.resolve(__dirname, 'git-compose.json')
  },
  h: {
    alias: 'hooksPath',
    expecting: 1,
    default: path.resolve(__dirname, './.git/hooks')
  },
  filePath: {
    expecting: 1,
    default: path.resolve(__dirname, 'git-compose.json')
  },
  hooksPath: {
    expecting: 1,
    default: path.resolve(__dirname, './.git/hooks')
  }
};


