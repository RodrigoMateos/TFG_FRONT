#!/bin/bash

git init
git add .
echo "Git se ha inicializado y se va a hacer el siguite commit $1"
git commit -m $1
echo "commit"
git remote add local https://github.com/RodrigoMateos/TFG_FRONT.git
echo "push"
git push
