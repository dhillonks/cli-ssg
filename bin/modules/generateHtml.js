const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const md = require('markdown-it')();

let outputDir = './dist';

/**
 * Uses a txt file path to create an html file
 * @param {string} filePath
 * @param {string} stylesheet
 * @param {string} lang
 */
const convertFileToHtml = (filePath, stylesheet, lang) => {
  const data = parseFile(filePath);

  const lines = data.split(/\r?\n/);

  let body = '',
    title = '';

  //Check for title - 2nd and 3rd line blank
  if (!lines[1] && !lines[2]) {
    title = lines[0];
    lines.splice(0, 3);
  }

  //Populate body
  lines.forEach((line) => {
    if (line) {
      body += `<p>${line}</p>`;
    }
  });

  const html = encloseInHtml(title, body, stylesheet, lang);

  const outputFilePath = path.join(
    outputDir,
    path.basename(filePath, '.txt') + '.html'
  );
  fs.writeFileSync(outputFilePath, html);

  return html;
};

/**
 * Uses a md file path to create an html file
 * @param {string} filePath
 * @param {string} stylesheet
 */
const convertMdFileToHtml = (filePath, stylesheet, lang) => {
  const data = parseFile(filePath);
  const title = data.match(/^# (.*$)/gim);

  const body = md.render(data);

  const html = encloseInHtml(title[0].slice(2), body.trim(), stylesheet, lang);
  const outputFilePath = path.join(
    outputDir,
    path.basename(filePath, '.md') + '.html'
  );
  fs.writeFileSync(outputFilePath, html);
};

/**
 * Parses a file and returns data
 * @param {string} path
 */
const parseFile = (path) => {
  try {
    const data = fs.readFileSync(path, 'utf8');
    return data;
  } catch (err) {
    console.log(err);
  }
};

/**
 * Returns a HTML5 string using the following args
 * @param {string} body
 * @param {string} title
 * @param {string} stylesheet
 * @param {string} lang
 * @returns valid HTML containing the body
 */
const encloseInHtml = (title, body, stylesheet, lang) => {
  return `<!doctype html>
    <html lang="${lang}">
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link href="${stylesheet}" rel="stylesheet">
    </head>
    <body>
      <h1>${title}</h1>
      ${body}
    </body>
    </html>`;
};

/**
 * Recursively checks a directory and returns paths for all .txt files
 * @param {string} dirPath
 * @returns {Array<String>} Array containing file paths
 */
const checkDirForTxt = (dirPath) => {
  let txtPaths = [];

  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullFilePath = path.join(dirPath, file);

    if (fs.lstatSync(fullFilePath).isDirectory()) {
      txtPaths = [...txtPaths, ...checkDirForTxt(fullFilePath)];
    } else if (path.extname(file) === '.txt') {
      txtPaths.push(fullFilePath);
    } else if (path.extname(file) === '.md') {
      txtPaths.push(fullFilePath);
    }
  });

  return txtPaths;
};

/**
 * Main function to handle cli
 * @param {string} input - input file/dir path
 * @param {string} output - output directory path
 * @param {string} stylesheet - optional stylesheet
 * @param {string} stylesheet - optional language attribute for html element
 */
const main = (input, output, stylesheet, lang) => {
  outputDir = output;

  //Create empty directory for output
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  } else {
    fs.rmdirSync(outputDir, { recursive: true });
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('Input directory: ' + input);

  //Check if input points to a file or a folder
  var stats = fs.statSync(input);

  if (stats.isFile()) {
    if (path.extname(input) === '.txt') {
      console.log(chalk.green(`Converting ${path.basename(input)} to HTML`));
      convertFileToHtml(input, stylesheet, lang);
    } else if (path.extname(input) === '.md') {
      //add condition for .md
      console.log(chalk.green(`Converting ${path.basename(input)} to HTML`));
      convertMdFileToHtml(input, stylesheet, lang);
    } else console.log(chalk.red('File must be either .txt or .md'));
  } else {
    const filePaths = checkDirForTxt(input);
    let indexFileBody = '';

    filePaths.forEach((file) => {
      console.log(chalk.green(`Converting ${path.basename(file)} to HTML`));
      if (path.extname(file) === '.txt') {
        convertFileToHtml(file, stylesheet, lang);
        indexFileBody += `<a href="./${encodeURI(
          path.basename(file, '.txt')
        )}.html">${path.basename(file, '.txt')}</a><br>`;
      } else if (path.extname(file) === '.md') {
        convertMdFileToHtml(file, stylesheet, lang);
        indexFileBody += `<a href="./${encodeURI(
          path.basename(file, '.md')
        )}.html">${path.basename(file, '.md')}</a><br>`;
      }
    });

    //Generate an index.html with relative links to each HTML file
    const html = encloseInHtml('Index File', indexFileBody, stylesheet, lang);
    const outputFilePath = path.join(outputDir, 'index.html');
    fs.writeFileSync(outputFilePath, html);
  }
};

module.exports.main = main;
module.exports.convertFileToHtml = convertFileToHtml;
