#!/usr/bin/env bash

COMMAND="prettier --single-quote --trailing-comma es5 --print-width 120 --write"

if [ "$1" ]
  then
    $COMMAND "$1"
elif [ -f ".gitignore" ]
  then
    git ls-files -- "*.js" | xargs $COMMAND
else
  $COMMAND "**/*.js"
fi
