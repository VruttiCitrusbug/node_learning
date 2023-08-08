const greet = (name="USER",age) => {//if value is get from argument than override name="USER" else it takes "USER"
    console.log("hello "+name)
}
greet("Vrutti")
greet()

// const greet1 = ({name,age}) => {//if destructure is not defined than it cause javascript error
//     console.log("hello "+name)
// }
// greet1()

const greet1 = ({name,age}={}) => {//takes default {} or else if passed than override with values
    console.log("hello "+name)
    console.log("hello "+age)
}
greet1()

const greet2 = ({name,age=10}={}) => {//takes default age
    console.log("hello "+name)
    console.log("hello "+age)
}
greet2()