const generateMessage = (text) =>{
    return {
        text,
        createat:new Date().getTime()
    }
}

const generateLocationMessage = (url) =>{
    return {
        url,
        createat:new Date().getTime()
    }
}

module.exports = {generateMessage,generateLocationMessage}