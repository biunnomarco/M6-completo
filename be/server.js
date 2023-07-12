const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = 6060

require('dotenv').config();

//require routes
const authorRoutes = require('./routes/authors')

const app = express();

//middlewere
app.use(express.json())
app.use(cors())
//use routes
app.use('/', authorRoutes)


mongoose.connect(process.env.MONGO_DB_URL)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Errore di connessione al server!'))
db.once('open', () => console.log('Database MongoDB connesso!'))



app.listen(PORT, () =>
    console.log(`Server avviato ed in ascolto sulla porta ${PORT}`)
)