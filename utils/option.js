const tokenize = s => s.split(' ');
const stripStartingDashes = s => {
  if(s === '--') { return '-' }
  let i = 0;
  while(s[i] === '-' && ++i); 
  return s.slice(i);
};
const reporter = require('./report.js');
module.exports = (bashStr, optionsMap={}) => {
  let parts = tokenize(bashStr);
  let options = {};
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].startsWith('-')) {
      let param = optionsMap[stripStartingDashes(parts[i])];
      if (param) {
        options[param.alias || stripStartingDashes(parts[i])] = param;
        param.alias && delete param.alias;
        if (param.expecting) {
          let args = [];
          for (let x = 0; x < param.expecting; x ++) {
            args.push(parts[++i]);
          }
          param.argument = args;
          delete param.expecting;
        } else {
          param.argument = true;
          delete param.expecting;
        }
      } else {
        reporter.warning(`no option ${parts[parts[i]]}`);
      }
    }
  }
  return options;
};
