const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const process = require('process');

class Options {
  constructor(input, output, stylesheet, lang) {
    this.input = input;
    this.output = output;
    this.stylesheet = stylesheet;
    this.lang = lang;
  }
  static get DEFAULT_OUTPUT() {
    return './dist';
  }
  static get DEFAULT_LANG() {
    return 'en-CA';
  }

  //Returns true if the input path is validated, otherwise throws an error
  validateInput() {
    if (!fs.existsSync(this.input)) {
      throw new Error(
        `${this.input} does not exist. Input path must be a file or directory`
      );
    }
    return true;
  }

  //Returns true if the output path is validated, otherwise throws an error
  validateOutput() {
    if (this.output != Options.DEFAULT_OUTPUT) {
      if (fs.existsSync(this.output)) {
        if (!fs.lstatSync(this.output).isDirectory()) {
          throw new Error(
            'Output path points to a file. Output directory must be valid'
          );
        }
      } else
        throw new Error(
          `${this.output} does not exist. Output directory must be valid`
        );
    }
    return true;
  }

  /**
   * Parses options using a file path
   * @param {string} filePath
   * @return {Boolean} true if the options were parsed
   */
  parseConfig(filePath) {
    if (fs.existsSync(filePath)) {
      if (path.extname(filePath).toLocaleLowerCase() == '.json') {
        let fileContents = fs.readFileSync(filePath);
        let configData;

        try {
          configData = JSON.parse(fileContents);
        } catch (err) {
          console.log('Error while parsing JSON: ', err);
          process.exit(-1);
        }

        this.input = configData.input;
        this.output = configData.output
          ? configData.output
          : Options.DEFAULT_OUTPUT;
        this.lang = configData.lang ? configData.lang : Options.DEFAULT_LANG;
        this.stylesheet = configData.s;
      } else {
        console.log('Config file must be JSON!', path.extname(filePath));
        process.exit(-1);
      }
    } else {
      console.log(`${filePath} not found! A JSON config file must be supplied`);
      process.exit(-1);
    }

    console.log(chalk.green(`Options successfully retrieved from ${filePath}`));
    return true;
  }
}

module.exports.Options = Options;
