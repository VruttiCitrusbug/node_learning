const tasks = {
    tasks: [{
        text: 'Grocery shopping',
        completed: true
    },{
        text: 'Clean yard',
        completed: false
    }, {
        text: 'Film course',
        completed: false
    }],
    getTasksToDo(){
        return this.tasks.filter((task)=>task.completed === false)
    }
}

console.log(tasks.getTasksToDo())

//same as
// yargs.command({
//     command: 'remove',
//     describe: 'Remove',
//     builder: {
//         title: {
//             describe: 'First Title',  
//             demandOption: true, //default = false
//             type:'string'
//         },
//         body: {
//             describe: 'Body Title',  
//             demandOption: true, //default = false
//             type:'string'
//         }
//     },
//     you can define just handler(argv){}
//     handler(argv){ 
//         notes.removenote(argv.title)
//         // node app.js add --title="vrutti" --body="patel"
//     }
// })