const add = require('./file2')
const validator = require('validator')
const chalk = require('chalk')

console.log(add(1,2))
//same as other isURL 

if(validator.isEmail('abc.example.com')){
    console.log(chalk.green('abc.example.com'))
}
else{
    console.log(chalk.blue('abc.example.com'))
}
//npm i chalk@5.3.0