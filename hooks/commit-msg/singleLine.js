const fs = require('fs');
module.exports = (args) => {
  fs.readFile(args, (err, data) => {
    if (err) {
      console.log(err);
      process.exitCode = 1;
    } else {
      let test = data.toString().split('\n').filter(line => !line.startsWith('#'));
      if (test.length > 2) {
        if (test[1] === '') {
          console.log('✓ Single Line Commit Message');
          process.exitCode = 0;
        } else {
          console.log('Commit Failed:')
          console.log('✕ Subject should be one line and followed by a blank line');
          process.exitCode = 1;
        }
      } else {
        process.exitCode = 0;
      }
    }
  });
}
