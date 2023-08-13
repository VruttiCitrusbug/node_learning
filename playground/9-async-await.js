const dowork = () =>{ //not async
    
}
console.log(dowork()) //undefined 


const dowork1 = async () =>{ 
    
}
console.log(dowork1()) //Promise { undefined } async always return promise 

const dowork2 = async () =>{ 
    return 'Vrutti'
}
console.log(dowork2()) //Promise { 'Vrutti' } async always return promise 


const dowork3 = async () =>{ 
    throw new Error('WRONG')
        // Error: WRONG
        // at dowork3 (C:\Users\Administrator\Desktop\node_learning\playground\9-async-await.js:19:11)
        // at Object.<anonymous> (C:\Users\Administrator\Desktop\node_learning\playground\9-async-await.js:22:1)
        // at Module._compile (node:internal/modules/cjs/loader:1256:14)
        // at Module._extensions..js (node:internal/modules/cjs/loader:1310:10)
        // at Module.load (node:internal/modules/cjs/loader:1119:32)
        // at Module._load (node:internal/modules/cjs/loader:960:12)
        // at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
        // at node:internal/main/run_main_module:23:47
    return 'Vrutti'
}
dowork3().then((response)=>{
    console.log(response) //Vrutti async always return promise 
}).catch((err)=>{
    console.log(err)
})