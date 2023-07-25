//scene 1
// setTimeout(()=>{
//     console.log("2 sec")
//     },2000)

// const length=['123','12345','12']
// const short_len = length.filter(len => len.length<=4)

// const geocode = (address,callback) => {
//     const data = {
//         latitude:0,
//         longitude:0
//     }
//     return data
// }
// const data = geocode('abc')
// console.log(data)

//out put 
// { latitude: 0, longitude: 0 }
// 2 sec

//scene 2

// const length=['123','12345','12']
// const short_len = length.filter(len => len.length<=4)//add in call stack 

// const geocode = (address,callback) => {
    
//     setTimeout(()=>{// go to the node api
//         const data = {
//             latitude:0,
//             longitude:0
//         }
//         return data
//         },2000)
//     //return null and pop from call stack
// }
// const data = geocode('abc') // go to the geocode and add to the call stack
// console.log(data) // result output is undefine cause geocode returns null
//while main pop from the call stack there is no method execute after main method pop

//scene 3
console.log("START")
                  //'abc'  //(data1)=>{ console.log(data1)}
const geocode1 = (address,callback) => {
    
    setTimeout(()=>{// go to the node api
        const data = {
            latitude:0,
            longitude:0
        }
        callback(data)//call the function and pass data (data1=data)=>{ console.log(data1)} 

        },2000)
    //return null and pop from call stack
}
const data1 = geocode1('abc',(data1)=>{
    console.log(data1)// after 2 second data printed
}) // go to the geocode and add to the call stack
console.log("end")
//output
//start
//end
//after 2 sec print { latitude: 0, longitude: 0 }