// node.js, the same, but with sugar:
var md = require('markdown-it')();
const fs = require('fs');

try {
    const data = fs.readFileSync('./README.md', 'utf8')
  
    
    var result = md.render(data);

    console.log(result);
} catch (err) {
    console.error(err)
  }

