const apikey = require("./api-func")
console.log(encodeURIComponent("access_key="))// encodes the special char such as %3D insted of = , %3F insted ?

apikey("9d9bf5997ac8147126085a56f8374d9d","ahmedabad",(error,data)=>{
    console.log("ERROR",error)
    console.log("DATA",data)
})