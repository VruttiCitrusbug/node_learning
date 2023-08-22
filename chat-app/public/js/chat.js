const socket = io()

socket.on('message',(meassage)=>{
    console.log('meassage',meassage)
})

document.querySelector('#msg-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = e.target.elements.message.value
    socket.emit('sendmessage',message)
})

document.querySelector('#send-loc').addEventListener('click',()=>{
    if(!navigator.geolocation){
        return alert('Geo location not supported by browser')
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position)
    })
    socket.emit('sendlocation',{
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    })
})


// //recive server side event
// socket.on('countUpdated',(count)=>{
//     console.log("count updated",count)
// })

// //client side event listner
// document.getElementById("increase").addEventListener('click',()=>{
//     //client side fire event to the server
//     socket.emit('increment')
// })