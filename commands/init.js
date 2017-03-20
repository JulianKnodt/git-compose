#! /usr/local/bin/node

const readline = require('readline');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const writeOut = (...str) => process.stdout.write(str.join(' '));
const wrappers = {
  languages: {
    javascript: path.relative('./', './wrappers/nodeWrapper.js'),
    ruby: path.relative('./', './wrappers/rubyWrapper.rb')
  }
};
console.log(wrappers);

const yn = '[' + chalk.green('y') + '/' + chalk.red('n') + ']';

const prompts = [
'applypatch-msg', 
'pre-applypatch', 
'post-applypatch', 
'pre-commit', 
'prepare-commit-msg', 
'commit-msg', 
'post-commit', 
'pre-rebase', 
'post-checkout', 
'post-merge', 
'pre-receive', 
'update', 
'post-update', 
'pre-auto-gc', 
'post-rewrite',
'pre-push'];
const initOvercommit = (currentDir) => {
  hookDir = path.resolve(__dirname, '../hooks');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  let resultingOptions = {wrappers, hooks:{}};
  let results = [];
  writeOut('Creating git-compose parameters...', '\n');
  fs.access(path.resolve(currentDir, 'git-compose.json'), (err, data) => {
    writeOut('Type [exit] to quit...', '\n');
    if (err && err.errno === -2) {
      writeOut('Writing to', currentDir + '/git-compose.json...', '\n');
    } else {
      writeOut('Will overwrite git-compose on complete.', '\n');
    }
  });

  //START USER INPUT
  const processAll = (currentDir) => {
    writeOut(chalk.inverse('Include all hooks?'), yn);
    rl.on('line', line => {
      if (line === 'exit') {
        process.exit(0);
      } else if (line === 'y' || ' ') {
        for (let i = 0; i < prompts.length; i++) {
          results.push(true);
        }
        writeOut('\n', chalk.inverse.bold('Cool.'), '\n\n');
        finishProcessing(currentDir);
      } else {
        startProcessing(currentDir);
      }
    });
  }
  const log = () => writeOut('Include', chalk.inverse(prompts[results.length]), 'hook? ' + yn);
  const startProcessing = (dirname) => {
    log();
    rl.on('line', line =>{
      if (line === 'exit') {
        process.exit(0);
      } else if (line === 'y' || ' ') {
        results.push(true);
      } else if (line === 'n') {
        results.push(false);
      } else {
        writeOut('Only accepted values are y & n', '\n');
      }
      if (results.length === prompts.length) {
        writeOut('\n', chalk.inverse.bold('Cool.'), '\n\n');
        finishProcessing(currentDir);
      } else {
        log();
      }
    });
  }

  //FINISHED USER INPUT

  const finishProcessing = (currentDir) => {
    const userChoices = prompts.map((hook, i) => ({
      hook, include: results[i]
    }));
    userChoices.forEach(choice => {
      let hookOptions = {
        hooks: []
      };
      if (choice.include) {
        const hookPath = path.resolve(hookDir, choice.hook);
        hookOptions.hooks = fs.readdirSync(hookPath)
        .filter(fileName => !fileName.startsWith('.'))
        .map(fileName => './' + path.relative('', path.resolve(hookPath, fileName)))
        .map(path => ({include: true, path, options: ''}));
      }
      resultingOptions.hooks[choice.hook] = hookOptions;
    });
    fs.writeFile(path.resolve(currentDir, 'git-compose.json'), JSON.stringify(resultingOptions, null, 2), (err, result) => {
      if (err) {
        writeOut(err.toString());
        process.exitCode = 1;
      } else {
        writeOut('Completed initialization of git-compose.', '\n');
        process.exit(0);
      }
    });
  }
  setTimeout(() => {
    processAll(currentDir);
  }, 500);
}


// initOvercommit();
module.exports = initOvercommit;