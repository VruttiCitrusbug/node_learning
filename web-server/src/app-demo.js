const express = require('express');
const path = require('path');
const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
//here statics are collected jut like python manage.py collectstatic, now to get any static path we have to write path after public folder 
//current path of staTIC SET AS C:\Users\Vrutti\Desktop\node_learning\web-server\public
app.use(express.static(publicDirectoryPath));
// http://localhost:3000/about.html to work 
// http://localhost:3000/  --> render index.html
//no longer work after above statement 


app.get('', (req, res) => {
    // This route will be triggered when accessing the root URL
    res.send("<h1>HELLO EXPRESS!</h1>");
});

app.get('/json', (req, res) => {
    // This route will be triggered when accessing the /json URL
    res.send({
        name: "vrutti",
        age: 24
    });
});

app.listen(3000, () => {
    console.log("Server on port 3000.");
});

//http://localhost:3000/
// console.log(__dirname) --> C:\Users\Vrutti\Desktop\node_learning\web-server\src
// console.log(__filename) --> C:\Users\Vrutti\Desktop\node_learning\web-server\src\app.js
// console.log(path.join(__dirname,"../public/index.html"))
// C:\Users\Vrutti\Desktop\node_learning\web-server\public\index.html 
// current directory and file name by __dirname __filename