// const sgMail = require('@sendgrid/mail')

// const sgApi = process.env.SGAPI

// sgMail.setApiKey(sgApi)

// const sendwelcome = (email,name) => {
//     sgMail.send({
//         to:email,
//         from:'jainil.citrusbug@gmail.com',
//         subject:'test',
//         text:`test mail for ${name}`
//     })
// }

// cancelemail = (email,name) => {
//     sgMail.send({
//         to:email,
//         from:'jainil.citrusbug@gmail.com',
//         subject:'bye',
//         text:`good bye ${name}`
//     })
// }

// module.exports = {
//     sendwelcome,cancelemail
// }

"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SEND_EMAIL_USER,
    pass: process.env.SEND_EMAIL_USER_PASSWORD,
  },
});


const sendwelcome = async (email,name) => { 
    console.log(email,"PPPPPPPPPPPPPPPPPPPPPPPPPPPPP")
    await transporter.sendMail({
    from: process.env.SEND_EMAIL_USER,
    to: email, // list of receivers
    subject: "Hello", 
    text: `Welcome ${name}`, 
    // html: "<b>Hello world?</b>", // html body
  }).then((res)=>{
    console.log("SENT...",res)
  });
}
module.exports = sendwelcome