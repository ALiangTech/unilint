#!/usr/bin/env node
const config = require('./json/config.json');
console.log(config, "ss");
const { init } = require('./../dist/index.cjs');

init({ config })