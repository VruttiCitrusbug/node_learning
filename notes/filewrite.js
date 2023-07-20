const fs = require('fs')
fs.writeFileSync('notes.txt'," js file text")
//over ride existing content 
//if filw nnot exist create new one
fs.appendFileSync('notes.txt', 'appand data')
// fs.readFileSync("notes.txt", "utf8");
fs.readFile('notes.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
  });