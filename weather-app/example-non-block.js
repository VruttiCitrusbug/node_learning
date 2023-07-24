// async program non blocking program

console.log("start") //execute 1

setTimeout(()=>{
console.log("2 sec") //execute 4
},2000)

setTimeout(()=>{
    console.log("0 sec") //execute 3
    },0)

console.log("end")//execute 2