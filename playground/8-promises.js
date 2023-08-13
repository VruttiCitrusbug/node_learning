const add = (a,b) => {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            if(a<=0 || b<=0){
                reject("NOT <= 0 is consider")
            }
            resolve(a+b)
        }, 2000);
    })
}

//complex code modre execution time
// add(1,2).then((sum)=>{
//     console.log(sum)
//     add(sum,5).then((sum)=>{
//         console.log(sum)
//     }).catch((e)=>{
//         console.log(e)
//     })
// }).catch((e)=>{
//     console.log(e)
// })

//can modfy by this
// add(1,1).then((sum)=>{
//             console.log(sum)
//             return add(sum,4)
//         }).then((sum2)=>{
//             console.log(sum2)
//         }).catch((e)=>{
//             console.log(e)
//         })

const dowork = async () =>{
    const sum = await add(0,0)
    const sum2 = await add(sum,50)
    const sum3 = await add(sum2,3)
    return sum3
}

dowork().then((response)=>{
    console.log(response) 
}).catch((err)=>{
    console.log(err)// result delay 6 sec
})
