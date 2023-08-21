const app = require('./app')

// const port = process.env.PORT || 3000 (DEFAULT 3000)
// require('dotenv').config({ path: './confg/dev.env' }); way to import env file


console.log(process.cwd()); // root dir

const port = process.env.PORT

app.listen(port,()=>{
    console.log("SERVER RUN ON PORT ",port)
})