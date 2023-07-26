const request = require('request')
const url = "http://api.weatherstack.com/current?access_key=9d9bf5997ac8147126085a56f8374d9d&query=ahmedabad"
const name1="vrutti"
const age=27
const user = {
    name:name1,
    age:age,
    location:"ahmedabad"
}
console.log(user)//{ name: 'vrutti', age: 27, location: 'ahmedabad' }

const user2 = {
    name1,
    age,
    location:"ahmedabad"
}
console.log(user2)//{ name1: 'vrutti', age: 27, location: 'ahmedabad' }

const {name,location,fake} = user 
//const {name,location,fake} = user2
//same define again it cause error
console.log(name)//vrutti
console.log(location)//ahmedabad
console.log(fake)//undefine


const {name1:rename,location:relocation,faker=6} = user2
console.log(rename)//now if name refer than it takes name as above defined and incase if its not define than it throws error 
console.log(relocation)//ahmedabad
console.log(faker)//undefine
//if there is no property than only we can assign value else cause error

const person = (number,{name,age}) =>{
    console.log(name,age)
}
person("1",user)

// same as insted of (error,response) we only need respnse.body.error so insted of request({url:url,json:true},(error,response)=> 
request({url:url,json:true},(error,{body})=> 
{
        if(error){ 
                console.log(error,"FUNCTIONERR")
        }
        else if(body.error){
                console.log(body.error,"RESPONSE BODY ERR")
        }
        else
        {
            console.log(body.current.temperature)
            console.log(body.current.weather_descriptions[0])
        }
})