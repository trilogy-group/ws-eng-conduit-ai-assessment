#!/bin/bash

if [[ $(git diff --stat) != '' ]]; then
  echo 'Your repository is dirty! Please commit all your changes before creating the patch.'
else
  NAME=$(git config user.name | sed s/[^[:alnum:]+._-]//g)
  git format-patch origin/master --stdout > submission_${NAME:-code}.patch
fi
