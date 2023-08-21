//true output
const calctip = (total,tippercent = .25) => {
    const tip = total * tippercent 
    return total + tip
}
//false output
// const calctip = (total,tippercent) => {
//     const tip = total * tippercent + total
//     return total + tip
// }

const fahrenheitToCelsius = (temp) => {
    return (temp - 32) / 1.8
}

const celsiusToFahrenheit = (temp) => {
    return (temp * 1.8) + 32
}

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

module.exports = {
    calctip,
    fahrenheitToCelsius,
    celsiusToFahrenheit,
    add
}