const connectToMongo=require('./db');
const express=require('express')
var cors = require('cors')
require('dotenv').config();
connectToMongo();
const app = express()
app.use(cors())
const port = process.env.PORT||5000

app.use(express.json())

app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/notes',require('./routes/notes.js'))

//configuration for heroku
if(process.env.NODE_ENV== "production"){
  app.use(express.static("client/build/"))
}

app.listen(port, () => {
  console.log(`Example app listening at ${port}`)
})


