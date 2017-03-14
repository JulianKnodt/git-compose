#!/usr/bin/env ruby
require 'shellwords'

args = ARGV
file = args.first
# require_relative file
if file != nil
  cmd = Shellwords.join(['ruby', file] + args.drop(1));
  result = `#{cmd}`
  p result
else
  p 'No File passed'
end