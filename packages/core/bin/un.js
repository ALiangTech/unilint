#!/usr/bin/env node
const config = require('./json/config.json');
const { init } = require('./../dist/index.cjs');

init({ config })