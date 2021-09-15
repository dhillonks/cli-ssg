const fs = require('fs');
const path = require('path');
const outputDir = './dist';

const convertFileToHtml = (filePath) => {
    const data = parseFile(filePath);

    const lines = data.split(/\r?\n/);

    let body = '', title = '';
    
    //Check for title - 2nd and 3rd line blank
    if(!lines[1] && !lines[2]){
        title = lines[0];
        lines.splice(0,3);
    }

    //Populate body
    lines.forEach(line => {        
        if(line){
            body+=`<p>${line}</p>`;
        }
    })

    const html = encloseInHtml(title, body);

    const outputFilePath = path.join(outputDir, path.basename(filePath, '.txt') + '.html')
    fs.writeFileSync(outputFilePath, html);
}

/**
 * Parses a file and returns data
 * @param {string} path
 */
const parseFile = (path) => {
    try {
        const data = fs.readFileSync(path, 'utf8')
        return data;
      } catch (err) {
        console.error(err)
      }
}

/**
 * Returns a HTML5 string using the following args
 * @param {string} body
 * @param {string} title
 * @returns valid HTML containing the body
 */
 const encloseInHtml = (title, body) => {
    return `<!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
      <h1>${title}</h1>
      ${body}
    </body>
    </html>`
}

const main =  async (input) => {

    //Create empty directory for output
    if (!fs.existsSync(outputDir)){
        fs.mkdirSync(outputDir, {recursive: true});
    }
    else{
        fs.rmdirSync(outputDir, { recursive: true });
        fs.mkdirSync(outputDir, {recursive: true});
    }
    
    //Check if input points to a file or a folder
    var stats = fs.statSync(input);

    if(stats.isFile()){
        convertFileToHtml(input);
    }
    else{
        fs.readdir(input, (err, files) => {
            if (err) {
                return console.error(err);
            } 
                        
            files.forEach((file) => {
                const filePath = path.join(input, file);
                convertFileToHtml(filePath);
            });
        });
    }

    return;
}

module.exports = main;