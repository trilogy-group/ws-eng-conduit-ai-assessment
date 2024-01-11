#!/bin/bash

# Stage and commit all changes (including untracked files)
git add --all
git commit --allow-empty -am "chore(conduit): Generates patch."

# Generate the diff
NAME=$(git config user.name | sed s/[^[:alnum:]+._-]//g)
git diff origin/master...HEAD -- . ':!*.patch' ':!yarn.lock' ':!package-lock.json' ':!**/tsconfig*.json' > "submission_${NAME:-code}.patch"
