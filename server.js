const express = require('express')
const app = express()
const PORT = 3003
const mongoose = require('mongoose')
const cors = require("cors")

// middleware
app.use(express.json()); //use .json(), not .urlencoded()

// CORS
const whitelist = ['http://localhost:3000', 'https://fathomless-sierra-68956.herokuapp.com']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors()) // Note: all routes are now exposed. If you want to limit access for specific verbs like POST or DELETE you can look at the npm documentaion for cors (for example with OMDB - it's ok for anyone to see the movies, but you don't want just anyone adding a movie)

// mongoose/mongodb:
mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))

mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

mongoose.connect("mongodb+srv://lala123:lala123@cluster0.6klqm.mongodb.net/project2?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.once('open', () => {
    console.log('connected to mongoose...')
})


// controllers:
const holidaysController = require('./controllers/holidays.js')



app.use('/holidays', holidaysController)
app.listen(PORT, () => {
    console.log('🎉🎊', 'celebrations happening on port', PORT, '🎉🎊',)
})