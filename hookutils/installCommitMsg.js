const fs = require('fs');

const prewrite = (dirname) => {
  fs.access(dirname, (err, data) => {
    console.log(err, data);
  });
}

const postwrite = (dirname) => {
  
}

module.exports = (dirname = '../.git/hooks/commit-msg', macros=['singleLine']) => {
  prewrite(dirname);
  let count = 0;
  macros.forEach(macro => {
    fs.readFile('../hooks/commit-msg/' + macro + '.js', (err, file) => {
      if (err) {
        throw err;
      } else {
        fs.appendFile(dirname, file.toString(), err => {
          if (err) {
            throw err;
          }
        });
      }
    });
  });

}

module.exports();