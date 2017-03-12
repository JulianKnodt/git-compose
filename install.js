const read = require('fs-readdir-recursive');
let ignored = ['.git', 'node_modules'];
var detect = require('language-detect');
module.exports = {
  "--default": {
    expecting: 0,
    execute: () => {
      let files = read(__dirname, fileName => {
        return fileName[0] !== '.' && !ignored.includes(fileName);
      });
      console.log(files);
      const languages = files.reduce((all, next) => {
        const filetype = detect.filename(next);
        if (!all.includes(filetype.toLowerCase())) {
          all.push(filetype.toLowerCase());
        }
        return all;
      }, []);
    }
    
  }
}
module.exports["--default"].execute();