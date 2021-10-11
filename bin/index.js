#!/usr/bin/env node

const package = require("../package");
const generateHtml = require("../generateHtml");
const fs = require("fs");
const figlet = require("figlet");
const path = require("path");
const { exit } = require("process");

const outputDir = './dist';
const defaultLang = 'en-CA';

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
    },
    lang: {
      alias: 'l',
      description: 'Lang attribute for html element',
      type: 'string',
      default: defaultLang
    },
    config: {
      alias: 'c',
      description: 'Specify all of the SSG options in a JSON formatted configuration file',
      type: 'string',
      requiresArg: true
    }
  })
  .check((argv) => {

    if(argv.i){

      //Input
      if(!fs.existsSync(argv.i)){
        throw new Error("Input path must be a file or directory");
      }
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


    if(argv.c){

      if(isJSON(process.argv[3])){

        //Config
        if(!fs.existsSync(argv.c)){
          throw new Error("JSON file path does not exist");
        }
        var data = JSON.parse(fs.readFileSync(argv.c));

        if(data.input)      argv.i = data.input
        if(data.output)     argv.o = data.output
        if(data.stylesheet) argv.s = data.stylesheet
        if(data.lang)       argv.l = data.lang
        
      }else{
        throw new Error("The passed file should be of JSON format")
      }
    }
    
    return true;
  })
  .argv;

try {
    generateHtml(argv.i, argv.o, argv.s, argv.l);
  } catch (err) {
    console.error(err)
  }

  function isJSON(stats){
    if(path.extname(stats) == ".json") 
      return true
    else 
      return false
  }