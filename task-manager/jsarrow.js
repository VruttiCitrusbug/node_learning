const func = (callback) => {
setTimeout(() => {
    // callback("success",undefined)
    callback(undefined,[1,2,3])
}, 2000);
}
func((err,result)=>{
    if(err){console.log(err)}
    console.log(result)
})