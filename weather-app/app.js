//  https://www.npmjs.com/package/postman-request

const request = require('request')
const url = "http://api.weatherstack.com/current?access_key=9d9bf5997ac8147126085a56f8374d9d&query=ahmedabad"

// request({url:url},(error,response)=>console.log(response))
request({url:url,json:true},(error,response)=> //default true response in JSON.parse(response.body) 
{     

        //error: In this context, error refers to an error object that may occur during the HTTP request process. If there's an issue with the request (e.g., the server is not reachable, there's a network error, etc.), error will be populated with an error object. If the request is successful, error will be null or undefined.
        //example         
                // {
                // code: 'ECONNREFUSED',
                // errno: 'ECONNREFUSED',
                // syscall: 'connect',
                // address: '127.0.0.1',
                // port: 3000
                // }
        if(error){ //error if request is not made
                console.log(error,"FUNCTIONERR")// if no error than null
        }
        else if(response.body.error){//response: response contains the response object from the server after the HTTP request is completed successfully. It includes various properties like statusCode, headers, and body. The response object usually contains the actual data sent back by the server in its body property.
                //request successfully at server but error occure at server may it is 403 status , broken page etc.
                console.log(response.body.error,"RESPONSE BODY ERR")
        }
        else
        {
                console.log(response.body.current.temperature)
                console.log(response.body.current.weather_descriptions[0])
        }
})


// json object (JSON.parse(response.body) by set json:true)
// {
//     request: {
//       type: 'City',
//       query: 'Ahmedabad, India',
//       language: 'en',
//       unit: 'm'
//     },
//     location: {
//       name: 'Ahmedabad',
//       country: 'India',
//       region: 'Gujarat',
//       lat: '23.033',
//       lon: '72.617',
//       timezone_id: 'Asia/Kolkata',
//       localtime: '2023-07-24 18:23',
//       localtime_epoch: 1690222980,
//       utc_offset: '5.50'
//     },
//     current: {
//       observation_time: '12:53 PM',
//       temperature: 27,
//       weather_code: 266,
//       weather_icons: [
//         'https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0017_cloudy_with_light_rain.png'
//       ],
//       weather_descriptions: [ 'Drizzle' ],
//       wind_speed: 15,
//       wind_degree: 260,
//       wind_dir: 'W',
//       pressure: 999,
//       precip: 1,
//       humidity: 94,
//       cloudcover: 75,
//       feelslike: 29,
//       uv_index: 7,
//       visibility: 3,
//       is_day: 'yes'
//     }
//   }


// json object (JSON.parse(response.body) by set json:false]
// {"request":{"type":"City","query":"Ahmedabad, India","language":"en","unit":"m"},"location":{"name":"Ahmedabad","country":"India","region":"Gujarat","lat":"23.033","lon":"72.617","timezone_id":"Asia\/Kolkata","localtime":"2023-07-24 18:23","localtime_epoch":1690222980,"utc_offset":"5.50"},"current":{"observation_time":"12:53 PM","temperature":27,"weather_code":266,"weather_icons":["https:\/\/cdn.worldweatheronline.com\/images\/wsymbols01_png_64\/wsymbol_0017_cloudy_with_light_rain.png"],"weather_descriptions":["Drizzle"],"wind_speed":15,"wind_degree":260,"wind_dir":"W","pressure":999,"precip":1,"humidity":94,"cloudcover":75,"feelslike":29,"uv_index":7,"visibility":3,"is_day":"yes"}}
