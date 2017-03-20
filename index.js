#! /usr/local/bin/node

if (!(require.main === module)) {
  module.exports = {
    reporter: require('./utils/report'),
    optionParser: require('./utils/option'),
    commands: {
      install: require('./commands/install'),
      uninstall: require('./commands/uninstall'),
      port: require('./commands/port'),
      gitCompose: require('./commands/default'),
      init: require('./commands/init')
    }
  };
} else {
  const path = require('path');
  const reporter = require('./utils/report');
  const optionParser = require('./utils/option');
  let args = process.argv.slice(2);
  let commandPath = './commands/default';
  if (args[0] === 'install') {
    commandPath = './commands/install';
    args = args.slice(1);
  } else if (args[0] === 'uninstall') {
    commandPath = './commands/uninstall';
    args = args.slice(1);
  } else if (args[0] === 'init') {
    commandPath = './commands/init';
    args = args.slice(1);
    return require(commandPath)(path.resolve('./'));
  } else if (args[0] === 'port') {
    commandPath = './commands/port';
    args = args.slice(1);
  } else if (args[0] === 'create') {
    commandPath = './commands/create';
    let type = args[1];
    let command = require(commandPath);
    return command(type, optionParser(args.slice(2).join(' '), command.options));
  }

  const command = require(commandPath);

  if (args.length === 0 && commandPath === './commands/default') {
    reporter.warn('no arguments passed, defaulting to help');
    args.push('-h');
  }
  let options = optionParser(args.join(' '), command.options);
  command(options);
}