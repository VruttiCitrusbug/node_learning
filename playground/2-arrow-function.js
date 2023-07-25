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

const event2 = {
    name: 'birthday',
    printGaustlst: () => {
        //not able to access
        console.log('gaust ' + this.name)
    }
}
event2.printGaustlst()
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

const event6 = {
    name: 'birthday',
    lst : ['a','b','c'],
    printGaustlst(){
        //wwe can accss byu pass this.lst
        this.lst.forEach((name) => {
            console.log(name + " " + this.name)
        })
    }
}
event6.printGaustlst()