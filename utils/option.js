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
      let stripped = stripStartingDashes(parts[i]);
      let param = optionsMap[stripped];
      if (param) {
        options[param.alias || stripped] = param;
        if (param.expecting) {
          let args = [];
          for (let x = 0; x < param.expecting; x ++) {
            let next = parts[++i];
            if (!next.startsWith('-')) {
              args.push(next);
            } else {
              throw new Error(
                `Missing argument for ${param.alias || stripped},
                expected: ${param.expecting}
                found: ${next}
                If it was intentional to include an element
                that starts with '-' wrap it in a string.
                `);
            }
          }
          param.arguments = args;
          delete param.expecting;
        } else {
          param.arguments = true;
          delete param.expecting;
        }
      } else {
        reporter.warning(`no option ${parts[i]}`);
      }
    }
  }
  for (let option in optionsMap) {
    if (optionsMap[option].default && options[optionsMap[option].alias] === undefined && options[option] === undefined) {
      let def = optionsMap[option].default;
      let param = optionsMap[option].alias || option;
      if (Array.isArray(def)) {
        options[param] = {arguments: def};
      } else {
        options[param] = {arguments: [def]};
      }
    }
  }
  for (let option in options) {
    let o = options[option];
    console.log(o);
    o.alias && (delete options[option].alias);
    o.default && (delete options[option].default);
    if (o.singular && o.arguments.length === 1) {
      options[option].arguments = o.arguments[0];
    }
  }
  return options;
};
