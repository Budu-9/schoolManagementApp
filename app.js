const express = require('express')
const app = express()
const db = require('./models')

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
//app.use('/api', modelRoutes) 

// Database Synchronizaton
db.sequelize.sync({ alter: true })
    .then(() => {
        console.log('DB connected successful')
    }).catch((error) => {
        console.log('DB connection unsuccessful', error)
    })

app.listen(3000, () => {
    console.log('Server is running...')
})