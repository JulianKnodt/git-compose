#! /usr/local/bin/node

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const writeOut = (...str) => process.stdout.write(str.join(' '));

const wrappers = {
  languages: {
    javascript: path.resolve(__dirname, './wrappers/nodeWrapper.js')
  }
};

const hookDir = path.resolve(__dirname, './hooks');
const prompts = ['applypatch-msg', 'post-update', 'pre-commit','pre-rebase','prepare-commit-msg', 'commit-msg','pre-applypatch','pre-push','pre-receive','update'];
const initOvercommit = (dirname = __dirname) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  let resultingOptions = {wrappers, hooks:{}};
  let results = [];
  writeOut('Creating overcommit parameters...', '\n');
  fs.access(path.resolve(dirname, 'overcommit.json'), (err, data) => {
    writeOut('Type [exit] to quit...', '\n');
    if (err && err.errno === -2) {
      writeOut('Writing to', __dirname + '/overcommit.json...', '\n');
      startProcessing();
    } else {
      writeOut('Will delete overcommit on complete.', '\n');
    }
  });
  const log = () => writeOut('Include', prompts[results.length], 'hook? [y/n] ');
  const startProcessing = () => {
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
        writeOut('\n', 'Cool.', '\n\n');
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
      resultingOptions.hooks[choice.hook] = hookOptions;
    });
    fs.writeFile(path.resolve(__dirname, 'overcommit.json'), JSON.stringify(resultingOptions, null, 2), (err, result) => {
      if (err) {
        writeOut(err.toString());
        process.exitCode = 1;
      } else {
        writeOut('Completed initialization of overcommit.', '\n');
        process.exit(0);
      }
    });
  }
  setTimeout(() => {
    startProcessing();
  }, 500);
}

// initOvercommit();
module.exports = initOvercommit;