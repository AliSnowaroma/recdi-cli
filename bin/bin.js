#!/usr/bin/env node
require('babel-core/register');
const CommandSet = require("../lib/clis/command.js");
new CommandSet().run()
