#!/usr/bin/env node
'use strict'

const fs = require('fs');
const path = require('path');

var commandDir = process.cwd();
var packagePath = './package.json';
var publishPath = './dist/package.json';

// TODO: add command options to enable log
var print = () => {}; // console.log;
var omitList = ['scripts', 'devDependencies', 'jest'];

run();

function run() {
  // loading package.json
  print(`Reading content from ${packagePath}`);
  var content = require(path.resolve(commandDir, packagePath));

  // clearing package info not used by dist version
  omitList.forEach(key => delete content[key]);

  print('Writing dist package');

  const distPackage = JSON.stringify(content, null, 2) + '\n';
  fs.writeFileSync(path.resolve(commandDir, publishPath), distPackage, 'utf8');

  print('Done writing dist package');
}
