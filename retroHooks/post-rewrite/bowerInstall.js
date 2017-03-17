module.exports = () => {
  try {
    const bower = require('bower');
  } catch (e) {
    console.log('Bower is not installed');
    process.exitCode = 1;
  }
  try {
    bower.commands.install();
  } catch (e) {
    console.log(e);
  }
}