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
    execute: ({filePath=path.resolve(__dirname,'overcommit.json'), hookPath=path.resolve(__dirname, './.git/hooks')}) => {
      fs.readFile(path.resolve(__dirname, 'overcommit.json'), (err, data) => {
        if (err) {
          throw err;
        }
        let options = JSON.parse(data);
        for (let hook in options.hooks) {
          let outputFile = new HookCreator(hook);
          const hookOptions = options.hooks[hook];
          hookOptions.hooks.forEach(hook => {
            const languageType = detect.filename(hook).toLowerCase();
            let wrapper = options.wrappers.languages[languageType];
            if (wrapper) {
              console.log(path.resolve(__dirname, hook));
              outputFile.write(wrapper, path.isAbsolute(hook) ? path : path.resolve(__dirname, hook), '"$@"');
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
    filePath: path.resolve(__dirname, 'overcommit.json'),
    hooksPath: path.resolve(__dirname, './.git/hooks')
  }
}

module.exports.command.execute(module.exports.defaultParams);














