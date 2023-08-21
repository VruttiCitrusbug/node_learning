const { calctip,fahrenheitToCelsius,celsiusToFahrenheit,add } = require('../src/math')

test('calc total with tip',()=>{
    const total = calctip(10,.3)
    expect(total).toBe(13)        

    // if(total !== 13){
    //     throw new Error('Toal tip should be 13')
    // }
})

test('calc use default tip',()=>{
    const total = calctip(10)
    expect(total).toBe(12.5)        
})  

test('Should convert 32 F to 0 C',()=>{
    expect(fahrenheitToCelsius(32)).toBe(0)        
})  

test('Should convert 0 C to 32 F',()=>{
    expect(celsiusToFahrenheit(0)).toBe(32)        
})  

// Async call 
// test('Async test demo.', (done)=>{
//     setTimeout(() => {     
//         expect(1).toBe(2)
//         done()
//     }, 2000);
// })

// test('add 2 numbers',(done) => {
//     add(2,3).then((sum)=>{
//         expect(sum).toBe(5)
//         done()
//     })
// })


test('add 2 numbers',async () => {
    const sum = await add(10,12)
    expect(sum).toBe(22)
})