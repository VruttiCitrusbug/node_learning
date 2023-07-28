// you can write without braces if it only returns single value
const square = (x) => x*x
console.log(square(2))

//function allow to access this--keyword
const event = {
    name: 'birthday',
    printGaustlst: function(){
        //access this.name
        console.log('gaust ' + this.name)
    }
}
//while arrow function not
event.printGaustlst()
// Here, printGaustlst is a regular function in the event object. Inside the function,
//  this refers to the object itself (event), allowing you to access the name property using this.name.

const event2 = {
    name: 'birthday',
    printGaustlst: () => {
        //not able to access
        console.log('gaust ' + this.name)
    }
}
event2.printGaustlst()
// In this case, printGaustlst is an arrow function within the event2 object. 
// Arrow functions do not have their own this, so the this inside the arrow function
// refers to the surrounding context, which is the global context (in Node.js)
// or the window object (in the browser). As a result, this.name is undefined.


// available sytex when we set up method in object
const event3 = {
    name: 'birthday',
    printGaustlst(){
        //able to access this.name
        console.log('gaust ' + this.name)
    }
}
event3.printGaustlst()

const event4 = {
    name: 'birthday',
    lst : ['a','b','c'],
    printGaustlst(){
        this.lst.forEach(function(name){
            //not accss this.name cauze method have its own binding which not below above some area
            console.log(name + " " + this.name)
        })
    }
}
event4.printGaustlst()
// This is a shorter syntax to define the object method printGaustlst. 
// The function has access to the object's properties using this, just like the first example.

const event5 = {
    name: 'birthday',
    lst : ['a','b','c'],
    printGaustlst(){
        val = this
        this.lst.forEach(function(name){
            //we can access by this way
            console.log(name + " " + val.name)
        })
    }
}
event5.printGaustlst()
// In this case, the forEach callback is a regular function, which creates its own this context. 
// Inside the callback, this refers to the callback function itself, not the event4 object. As a result, this.name is undefined.


//TODO
const event6 = {
    name: 'birthday',
    lst : ['a','b','c'],
    printGaustlst(){
        //wwe can accss by pass this.lst
        this.lst.forEach((name) => {
            console.log(name + " " + this.name)
        })
    }
}
event6.printGaustlst()