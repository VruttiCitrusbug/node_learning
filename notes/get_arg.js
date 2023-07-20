// npm i yargs@12.0.2
const yargs = require('yargs')

// console.log(process.argv)
// console.log(yargs.argv)


//customise yarge version
yargs.version('1.1.0')
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
            demandOption: true, //default = false
            type:'string'
        }
    },
    handler: function(argv){
        console.log("Title ",argv.title)
        //node get_arg.js add --title="VRUTTI"
        console.log("Body ",argv.body)
        //node get_arg.js add --title="VRUTTI"  require body error
    }
})

console.log(yargs.argv)