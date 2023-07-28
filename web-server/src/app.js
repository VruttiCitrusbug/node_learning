const express = require('express');
const path = require('path');
const hbs = require('hbs');

// console.log(typeof(express))//function
// console.log(typeof(path))//object
//console.log(typeof(hbs))//object

const apikey = require("../../weather-app/api-func");
console.log(apikey)

const app = express();//create an instance 

const publicDirectoryPath = path.join(__dirname, '../public/static');
app.use(express.static(publicDirectoryPath));
// console.log(express.static(publicDirectoryPath)) return function that serve statics

app.set('view engine','hbs') // set view port as hbs file
const viewpath = path.join(__dirname, '../templates/views');
app.set('views',viewpath)

const partialpath = path.join(__dirname, '../templates/partials');
// to add the sub html template
hbs.registerPartials(partialpath)
// we just have to write {{>hbs_template_name}} at the another html


app.get('', (req, res) => {
    res.render("index",{name: "vrutti",age: 24,title:"HOME",path:"/about",name:"about"}); 
});

app.get('/about', (req, res) => {
    res.render("about",{about: "about",title:"ABOUT",path:"/",name:"home"}); 
});

app.get('/json', (req, res) => {
    //http://localhost:3000/json?name=srushti&surname=patel
    console.log(req.query)//{ name: 'srushti', surname: 'patel' }
    // we can access as req.query.name
    
    if(!req.query.name){
        return res.send({
            error: "provide search string"
        });
    }
    res.send({
        name: "vrutti",
        age: 24
    });
});

app.get("/temperature",(req,res)=>{
    if(req.query.loc){
        apikey("9d9bf5997ac8147126085a56f8374d9d",req.query.loc,(error,data)=>{

            if(error){
                res.send(
                    {error:error}
                )
            }
            else{
                res.send(
                    {temp:data}
                )
            }
        })
    }
    else{
        return res.send({
            error: "provide location string"
        });
    }
})

app.get('/about/*', (req, res) => {// sub page of any about url 
    res.send("About artical sub page not found")
});

app.get('*', (req, res) => {//put at the last from top to bottom shows the url if not match then executes
    res.send("MY 404 PAGE")
});
app.listen(3000, () => {
    console.log("Server on port 3000.");
});

//http://localhost:3000/
// console.log(__dirname) --> C:\Users\Vrutti\Desktop\node_learning\web-server\src
// console.log(__filename) --> C:\Users\Vrutti\Desktop\node_learning\web-server\src\app.js
// console.log(path.join(__dirname,"../public/index.html"))
// C:\Users\Vrutti\Desktop\node_learning\web-server\public\index.html