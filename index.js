// Packages
const config = require('config')
const https = require('https')
const express  = require('express')
const exphbs  = require('express-handlebars')
const fs = require('fs')
const mysql = require('mysql')
const homeRoutes = require('./routes/home')
const authRoutes = require('./routes/auth')
const logoutRoutes = require('./routes/logout')
const issuesRoutes = require('./routes/issues')
const bedPageRoutes = require('./routes/bedPage')

// Express configuration
const app = express()

const PORT = process.env.PORT || 3000

const hbs = exphbs.create({
	defaultLayout: 'main',
	extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes)
app.use('/auth', authRoutes)
app.use('/logout', logoutRoutes)
app.use('/issues', issuesRoutes)
app.use('*', bedPageRoutes)

// Entry point 
app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`)
})