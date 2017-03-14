class HookCreator {
  constructor (hookType) {
    this.data = ['#!/usr/bin/env bash', ''];
    hookType && this.data.push(`echo running ${hookType} hook with "$@".`)
  }
  write(...test) {
    this.data.push(test.join(' '));
  }
  toString() {
    return this.data.join('\n');
  }
}

module.exports = HookCreator;