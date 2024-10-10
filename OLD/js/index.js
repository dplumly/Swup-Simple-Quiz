console.log('init index.js');

const fs = require('fs/promises');

let filePath = "analytics/analytics.txt";
let data = "This is a test, \n";
// let buf = Buffer.from('This is from the buffer\n', 'utf8');

// Writing to file using fs.writeFile (callback style)
fs.appendFile(filePath, data, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});






