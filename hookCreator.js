class HookCreator {
  constructor (hookType) {
    this.data = ['#!/usr/bin/env bash', ''];
    hookType && this.data.push(`echo running ${hookType} hook with "$@".`);
    this.wrappers = {};
  }
  write(wrapper, test) {
    this.wrappers[wrapper] = this.wrappers[wrapper] || {hooks: []};
    this.wrappers[wrapper].hooks.push(test);
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