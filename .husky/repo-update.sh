#! /bin/bash

git config --global user.name "Tanishq Singh"
git config --global user.email "tanishq-singh-2301@users.noreply.github.com"
git add .

clean=$(git commit -m "CI: Updated data.json and README.md")

if [[ ${clean} == *"nothing to commit"* ]]; then
    echo "README.md already up to date."
else
    git push
fi
