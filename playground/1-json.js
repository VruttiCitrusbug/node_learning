const fs = require('fs')

// const book = {
//     title:'hello',
//     author: 'vrutti'
// }
// const bookJSON = JSON.stringify(book)
// console.log(bookJSON.title) //undefine
// //not access title by bookJSON.title
// const parcedata = JSON.parse(bookJSON)//return to the object form
// console.log(parcedata.title)
// fs.writeFileSync('1-json.json', bookJSON)

const databuffer = fs.readFileSync('1-json.json')
const datajson = databuffer.toString()
const data = JSON.parse(datajson)
console.log(data.title)
data.title = "HELLO"
data.name = "VRUTTI"
fs.writeFileSync('1-json.json', JSON.stringify(data))
console.log(data)
//replace existing key, if not exist add new key, if unussigned it stands same
