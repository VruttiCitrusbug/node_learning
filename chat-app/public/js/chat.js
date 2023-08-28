const socket = io()

const $messageForm = document.querySelector('#msg-form')
const $messageFormInput = document.querySelector('input')
const $messageFormButton = document.querySelector('button')
const $sendlocbtn = document.querySelector('#send-loc')
const $messages = document.querySelector('#messages')

//Template
const $messageTemplate = document.querySelector('#message-template').innerHTML
const $locationmessageTemplate = document.querySelector('#location-message-template').innerHTML

const {username,room} = qs.parse(location.search,{ ignoreQueryPrefix: true })
console.log(qs.parse(location.search,{ ignoreQueryPrefix: false }))

// respond on server side event (on listen)
socket.on('message',(message)=>{
    console.log('meassage',message.text)
    const html = Mustache.render($messageTemplate,{
        message: message.text,
        createat: moment(message.createat).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend',html)
})

socket.on('locationmessage',(url)=>{
    const html = Mustache.render($locationmessageTemplate,{
        url:url.url,
        createat:moment(url.createat).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend',html)
})

$messageForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = e.target.elements.message.value

    $messageFormButton.setAttribute('disabled','disabled')

    // send event to the server side(emit event send with data) 
    socket.emit('sendmessage',message,(error) => {
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()
        if(error)
        {
            return console.log(error)
        }
        console.log("Delivered!")
    })

})

$sendlocbtn.addEventListener('click',()=>{

    if(!navigator.geolocation){
        return alert('Geo location not supported by browser')
    }
    
    $sendlocbtn.setAttribute('disabled','disabled')

    navigator.geolocation.getCurrentPosition((position)=>{
        //fire event sendlocation
        socket.emit('sendlocation',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        },() => {
            $sendlocbtn.removeAttribute('disabled')
            console.log("SHERED!")
        })
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