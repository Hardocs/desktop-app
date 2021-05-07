#! /bin/bash
git submodule update --init --recursive
rm -rf ./node_modules/hardocs-fs
cd hardocs-fs
yarn
yarn build
cd ..
yarn