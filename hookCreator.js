const qs = require('querystring');
class HookCreator {
  constructor (hookType) {
    this.data = ['#!/usr/bin/env bash', ''];
    hookType && this.data.push(`echo running ${hookType} hook with "$@".`);
    this.wrappers = {};
  }
  write(wrapper, test, options='null') {
    this.wrappers[wrapper] = this.wrappers[wrapper] || {hooks: []};
    this.wrappers[wrapper].hooks.push("'" + qs.stringify({test, options}, null, null, {encodeURIComponent:x=>x}) + "'");
  }
  eval() {
    let clone = [...this.data];
    for (let wrapper in this.wrappers) {
      clone.push(wrapper + ' ' + this.wrappers[wrapper].hooks.join(' ') + ' --args $@');
    }
    return clone.join('\n');
  }
}

module.exports = HookCreator;
