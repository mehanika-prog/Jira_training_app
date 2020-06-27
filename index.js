// Packages
const config = require('config')
const https = require('https')
const express  = require('express')
const exphbs  = require('express-handlebars')
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

const connection = mysql.createConnection({

	host: 'localhost',
	user: 'ubuntu',
	password: '123',
	database: 'Jira_Training_App',
	ssl: {

		ca: fs.readFileSync(__dirname + '/mehanika-key.pem')

	}

})

connection.connect()

connection.query('Show Tables', function (error, results, fields) {
	if (error) throw error;
	console.log('The solution is: ', results[0].solution);
  });