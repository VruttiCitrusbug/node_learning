const sgMail = require('@sendgrid/mail')

const sgApi = process.env.SGAPI

sgMail.setApiKey(sgApi)

const sendwelcome = (email,name) => {
    sgMail.send({
        to:email,
        from:'jainil.citrusbug@gmail.com',
        subject:'test',
        text:`test mail for ${name}`
    })
}

cancelemail = (email,name) => {
    sgMail.send({
        to:email,
        from:'jainil.citrusbug@gmail.com',
        subject:'bye',
        text:`good bye ${name}`
    })
}

module.exports = {
    sendwelcome,cancelemail
}