const fs = require('fs')
const getnotes = ()=>{
    return "YOUR NOTE ..."
}
const addnote = (title,body)=>{
   note = loadnote() //add existing note
   console.log(note)
   //this .filter function return a duplicate array while cindition match
   const duplicate = note.filter(
    (note) => {
        return note.title == title //one by one element pass of json object
        // return false element not returned else element return and push in duplicate
    }
   )
   //here duplicate = [note] ex.[{ title: 'hello', body: 'world' }]if matched element else []
   console.log(duplicate,"HRHR")
   if (duplicate.length === 0){
    note.push({
        title:title,
        body:body
       })
       console.log(note)
       savenote(note)
   }
   else{
    console.log("DUPLICATE")
   }
   
}
const removenote = (title,body)=>{
    note = loadnote()//fatch existing note
    console.log(note)
    const keepnote = note.filter(
    (note) => {
         return note.title !== title
     }
    )//return an array which not contains given title 
    console.log(keepnote)
    savenote(keepnote)   
 }
const savenote = (notes)=>{
    const datajson = JSON.stringify(notes)
    fs.writeFileSync('note_add.json',datajson)
}

const loadnote = ()=>{
    try{
        const databuffer = fs.readFileSync('note_add.json')
        const datajson = databuffer.toString()
        return JSON.parse(datajson)
    }
    catch(e){
        return []
    }
}

module.exports = {
    getnotes:getnotes,
    addnote:addnote,
    removenote:removenote,
}