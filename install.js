const read = require('fs-readdir-recursive');
const fs = require('fs');
let ignored = ['.git', 'node_modules'];
var detect = require('language-detect');
const path = require('path');
const HookCreator = require('./hookCreator');
module.exports = {
  // "--default": {
  //   expecting: 0,
  //   execute: () => {
      // let files = read(__dirname, fileName => {
      //   return fileName[0] !== '.' && !ignored.includes(fileName);
      // });
      // const languages = files.reduce((all, next) => {
      //   const filetype = detect.filename(next);
      //   if (!all.includes(filetype.toLowerCase())) {
      //     all.push(filetype.toLowerCase());
      //   }
      //   return all;
      // }, []);
  //   }
  // },
  command: {
    expecting: 1,
    execute: ({filePath=path.resolve(__dirname,'git-compose.json'), hookPath=path.resolve(__dirname, './.git/hooks')}) => {
      fs.readFile(path.resolve(__dirname, 'git-compose.json'), (err, data) => {
        if (err) {
          throw err;
        }
        let options = JSON.parse(data);
        for (let language in options.wrappers.languages) {
          let wrapperPath = options.wrappers.languages[language]
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
                outputFile.write(wrapper, path.isAbsolute(hook.path) ? hook.path : path.resolve(__dirname, hook.path), '"$@"');
              }
            }
          });
          let writePath = path.resolve(hookPath, hook);
          fs.writeFile(writePath, outputFile.toString(), (err, data) => {
            if (!err) {
              console.log(`Created ${hook} with ${hookOptions.hooks.length} hooks.`);
              fs.chmod(writePath, 0755, (err, data) => {
                console.log(`${hook} is now runnable.`)
              });
            }
          });
        }
      });
    }
  },
  defaultParams: {
    filePath: path.resolve(__dirname, 'git-compose.json'),
    hooksPath: path.resolve(__dirname, './.git/hooks')
  }
}

module.exports.command.execute(module.exports.defaultParams);














