#!/usr/bin/env node

const yargs = require("yargs");
const package = require("../package");
const generateHtml = require("../generateHtml");
const fs = require("fs");
const path = require("path");
const figlet = require("figlet");

const outputDir = './dist';

const decoratedHeader = figlet.textSync(package.name, {horizontalLayout: 'full'});
console.log(decoratedHeader);

//Setup yargs
var argv = require('yargs/yargs')(process.argv.slice(2))
  .usage('ssg-cli: Tool to generate HTML web sites using txt\n\nUsage: $0 [options]')
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
    },
    output: {
      alias: 'o',
      default: outputDir,
      description: 'Output directory',
      type: 'string'
    },
    stylesheet: {
      alias: 's',
      description: 'CSS Stylesheet for the website',
      type: 'string'
    }
  })
  .check((argv) => {

    //Input
    if(!fs.existsSync(argv.i)){
      throw new Error("Input path must be a file or directory");
    }

    //Output
    if(argv.o != outputDir){
      if(fs.existsSync(argv.o)){
        if(!fs.lstatSync(argv.o).isDirectory()){
          throw new Error("Output path points to a file. Output directory must be valid")
        }
      }
      else throw new Error("Output directory must be valid");
    }
    
    return true;
  })
  .argv;

try {
    generateHtml(argv.i, argv.o, argv.s);
  } catch (err) {
    console.error(err)
  }
