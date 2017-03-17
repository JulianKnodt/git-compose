#!/usr/bin/env bash

# "${@:2}"
if [ -n "$1" ]
  then
    "$1" "${@:2}"
fi