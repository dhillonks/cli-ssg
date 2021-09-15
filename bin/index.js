#!/usr/bin/env node

const yargs = require("yargs");
const package = require("../package");
const generateHtml = require("../generateHtml");

//Setup yargs
var argv = require('yargs/yargs')(process.argv.slice(2))
  .usage('ssg: Tool to generate HTML web sites using txt\n\nUsage: $0 [options]')
  .help('help').alias('help', 'h')
  .example('$0 -i file.txt -> generates a file.html by processing file.txt')
  .showHelpOnFail(false, "Use --help for available options")
  .version('version', 'ssg ' + package.version).alias('version', 'v')
  .options({
    input: {
      alias: 'i',
      description: 'Input file/folder to be processed',
      type: 'string',
      requiresArg: true,
      required: true
    }
  })
  .argv;

try {
    generateHtml(argv.input);
  } catch (err) {
    console.error(err)
  }
