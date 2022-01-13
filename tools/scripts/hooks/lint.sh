#!/bin/bash
#==================================================
# Licensed Materials - Property of HCL Technologies
#
# HCL Commerce
#
# (C) Copyright HCL Technologies Limited 2021
#==================================================
echo "Checking lint..."

stg=`git diff --name-only --diff-filter=ACMR --staged | grep -Ev "^((assets|build|dist|public|tools|master|bvt|docs)\/)|mocks\/|\.scss$|\.json$|\.sh$|\.gitignore$|\.eslintrc\b|\bsetupProxy.js\b|\bREADME.md\b|\/__tests__\/|\/apis\/mock\/"`
lint=`git rev-parse --show-toplevel`/node_modules/.bin/eslint

if [[ "$stg" == "" ]]; then
  exit 0
fi

if [[ ! -x "$lint" ]]; then
  echo "eslint is not installed -- please run \"npm install\""
  exit 1
fi

"$lint" --max-warnings 0 $stg

if [[ "$?" != 0 ]]; then
  echo "Please run \"npm run lint\" before delivery and ensure cleanliness"
  echo ""
  exit 1
else
  exit 0
fi