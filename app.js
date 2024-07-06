const express = require('express')
const app = express()
const db = require('./models')
const userRoutes = require('./routes/userRoutes')
const schoolRoutes = require('./routes/schoolRoutes')
const teacherRoutes = require('./routes/teacherRoutes')
const guardianRoutes = require('./routes/guardianRoutes')
const studentRoutes = require('./routes/studentRoutes')

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/users', userRoutes)
app.use('/schools', schoolRoutes)
app.use('/teachers', teacherRoutes)
app.use('/guardians', guardianRoutes)
app.use('/students', studentRoutes) 

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