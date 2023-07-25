// const url = "http://api.weatherstack.com/current?" + encodeURIComponent("access_key=") + "9d9bf5997ac8147126085a56f8374d9d&query=ahmedabad"

console.log(encodeURIComponent("access_key="))// encodes the special char such as %3D insted of = , %3F insted ?

const data1 = geocode1('abc',(data1)=>{
    const url = "http://api.weatherstack.com/current?" + encodeURIComponent("access_key=") + "9d9bf5997ac8147126085a56f8374d9d&query=ahmedabad"
    console.log(data1)
    request({url:url,json:true},(error,response)=> {
        if(error){ 
            console.log(error,"url err")
        }
        else if(response.body.error){
                console.log(response.body.error,"RESPONSE BODY ERR")
        }
        else
        {
                console.log(response.body.current.temperature)
                console.log(response.body.current.weather_descriptions[0])
        }
    })
}) 