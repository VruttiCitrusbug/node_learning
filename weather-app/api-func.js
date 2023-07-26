const request = require('request')
apikey = (key,location,callback)=>{
    const url = "http://api.weatherstack.com/current?access_key="+key+"&query="+location
    request({url:url,json:true},(error,response)=> {
        if(error){ 
            callback("url err",undefined)
        }
        else if(response.body.error){
            callback("server err",undefined)
        }
        else
        {
            callback(undefined,response.body.current.temperature)
        }
    })
}
module.exports = apikey