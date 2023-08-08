const func = new Promise((resolve,reject)=>{
    setTimeout(() => {
        // resolve([1,2,3])
        reject(" THING GOSE WRONGE")
    }, 2000);
})
func.then((result)=>{
    console.log("SUCCESS!",result)
}).catch((error)=>{
    console.log("OPPS!",error)
})

//change order
const func2 = new Promise((reject,resolve)=>{
    setTimeout(() => {
        // resolve([1,2,3])
        reject(" THING GOSE WRONGE")
    }, 2000);
})
func2.then((result)=>{
    console.log("SUCCESS!",result)
}).catch((error)=>{
    console.log("OPPS!",error)
})

//return at the first order
const func3 = new Promise((resolve,reject)=>{
    setTimeout(() => {
        reject(" THING GOSE WRONGE")//return from here
        reject("ERRRRRR")//ignore
        resolve("YEEE")//ignore
    }, 2000);
})
func3.then((result)=>{
    console.log("SUCCESS!",result)
}).catch((error)=>{
    console.log("OPPS!",error)
})

//                      FULLFILL
//                     /
// promise ---   panding
//                     \
//                      REJECT