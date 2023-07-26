// const http = require('http')// to make standared request
const https = require('https')// to make request only on secure servers
const url = "https://random-data-api.com/api/v2/users?size=0&is_xml=false"
const request = https.request(url,(response)=>{  
    let data = ''
    response.on('data',(chunk)=>{
        data = data+chunk.toString()
        //chunk = <Buffer 5b 7b 22 69 64 22 3a 32 30 37 38 2c 22 75 69 64 22 3a 22 38 31 34 31 32 62 31 38 2d 61 37 63 61 2d 34 63 33 36 2d 39 31 32 31 2d 33 65 39 65 35 36 36 ... 1696 more bytes>
    })
    
    response.on('end',()=>{
        console.log(JSON.parse(data))
    })
})
request.on('error',(error)=>{
    console.log(error,"An error")
//     Error: getaddrinfo ENOTFOUND random-data-ap
//     at GetAddrInfoReqWrap.onlookup [as oncomplete] (node:dns:108:26) {
//   errno: -3008,
//   code: 'ENOTFOUND',
//   syscall: 'getaddrinfo',
//   hostname: 'random-data-ap'
// } An error
})

request.end() //without this there is not termination 