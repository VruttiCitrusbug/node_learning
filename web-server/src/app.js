const express = require('express');
const path = require('path');
const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewpath = path.join(__dirname, '../views');

app.set('view engine','hbs')
app.set('views',viewpath)

app.get('', (req, res) => {
    // This route will be triggered when accessing the root URL
    res.render("index",{name: "vrutti",age: 24}); 
});

app.get('/about', (req, res) => {
    // This route will be triggered when accessing the root URL
    res.render("about",{about: "about"}); 
});

app.listen(3000, () => {
    console.log("Server on port 3000.");
});

//http://localhost:3000/
// console.log(__dirname) --> C:\Users\Vrutti\Desktop\node_learning\web-server\src
// console.log(__filename) --> C:\Users\Vrutti\Desktop\node_learning\web-server\src\app.js
// console.log(path.join(__dirname,"../public/index.html"))
// C:\Users\Vrutti\Desktop\node_learning\web-server\public\index.html