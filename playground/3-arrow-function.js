//
// Goal: Create method to get incomplete tasks
//
// 1. Define getTasksToDo method
// 2. Use filter to to return just the incompleted tasks (arrow function)
// 3. Test your work by running the script

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