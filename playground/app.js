// npm i yargs@12.0.2
const yargs = require('yargs')
const notes = require('./notes.js')
// console.log(process.argv)
// console.log(yargs.argv)


//customise yarge version
// yargs.version('1.1.0')
yargs.command({
    command: 'add',
    describe: 'Adds',
    builder: {
        title: {
            describe: 'First Title',  
            demandOption: true, //default = false
            type:'string'
        },
        body: {
            describe: 'Body Title',  
            demandOption: true, //default = false TRUE MEANS REQUIRED VARIABLE AND FALSE NOT GENERATE ANY ERROR REQUIRE=FALSE
            type:'string'
        }
    },
    handler: function(argv){
        debugger// by adding this we can track program
        notes.addnote(argv.title,argv.body)
        //node app.js add --title="vrutti" --body="patel"
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove',
    builder: {
        title: {
            describe: 'First Title',  
            demandOption: true, //default = false
            type:'string'
        },
        body: {
            describe: 'Body Title',  
            demandOption: true, //default = false
            type:'string'
        }
    },
    handler: function(argv){
        notes.removenote(argv.title)
        // node app.js add --title="vrutti" --body="patel"
    }
})
console.log(yargs.argv)