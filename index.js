#! /usr/local/bin/node


if (!(require.main === module)) {
  module.exports = {
    reporter: require('./utils/report.'),
    optionParser: require('./utils/option')
  };
} else {
  const optionParser = require('./utils/option');
  let args = process.argv.slice(2);

  let path = './default';
  if (args[0] === 'install') {
    path = './install';
    args = args.slice(1);
  } else if (args[0] === 'uninstall') {
    path = './uninstall';
    args = args.slice(1);
  } else if (args[0] === 'init') {
    path = './init';
    args = args.slice(1);
    return require(path)(__dirname);
  } else if (args[0] === 'port') {
    path = './port';
    args = args.slice(1);
  }

  const command = require(path);

  if (args.length === 0 && path === './default') {
    args.push('-h');
  }

  let options = optionParser(args.join(' '), command.options);
  for (let option in options) {
    options[option] = options[option].arguments[0]
  }
  command(options);
}