#! /usr/local/bin/node

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const writeOut = (...str) => process.stdout.write(str.join(' '));

const hookDir = path.resolve(__dirname, './hooks');
const prompts = ['applypatch-msg', 'post-update', 'pre-commit','pre-rebase','prepare-commit-msg', 'commit-msg','pre-applypatch','pre-push','pre-receive','update']
console.log(prompts.join(' '));
const initOvercommit = (dirname = __dirname) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  let resultingOptions = {};
  let results = [];
  writeOut('Creating overcommit parameters...', '\n');
  fs.access(dirname + '/overcommit.json', (err, data) => {
    if (err && err.errno === -2) {
      writeOut('Writing to', __dirname + '/overcommit.json...', '\n');
      writeOut('Type [exit] to quit...', '\n');
      startProcessing();
    } else if (data) {
      return writeOut('overcommit.json already exists', '\n');
    }
  });
  const log = () => writeOut('Include', prompts[results.length], 'hook? [y/n] ');
  const startProcessing = () => {
    log();
    rl.on('line', line =>{
      if (line === 'exit') {e
        process.exit(0);
      } else if (line === 'y') {
        results.push(true);
      } else if (line === 'n') {
        results.push(false);
      } else {
        writeOut('Only accepted values are y & n', '\n');
      }
      if (results.length === prompts.length) {
        writeOut("\x1b[1m",'Cool.', '\n');
        finishProcessing();
      } else {
        log();
      }
    });
  }
  const finishProcessing = () => {
    const userChoices = prompts.map((hook, i) => ({
      hook, include: results[i]
    }));
    userChoices.forEach(choice => {
      let hookOptions = {
        hookFiles: []
      };
      if (choice.include) {
        const hookPath = path.resolve(hookDir, choice.hook);
        hookOptions.hookFiles = fs.readdirSync(hookPath).map(fileName => path.resolve(hookPath, fileName));
      }
      resultingOptions[choice.hook] = hookOptions;
    });
  }
}

initOvercommit();