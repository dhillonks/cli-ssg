#!/usr/bin/env node

const package = require("../package");
const generateHtml = require("./modules/generateHtml");
const figlet = require("figlet");
const { Options } = require("./modules/configOptions");

const outputDir = './dist';
const defaultLang = 'en-CA';
let options;

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
    options = new Options(argv.i, argv.o, argv.s, argv.l);

    if(argv.c){
      //Parse and use options from the config file
      options.parseConfig(argv.c);
    }

    //Validate the options
    return options.validateInput() && options.validateOutput();
  })
  .argv;

try {
  generateHtml(options.input, options.output, options.stylesheet, options.lang);
} catch (err) {
  console.error(err)
}