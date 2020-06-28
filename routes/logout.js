const {Router} = require('express')
const Cookies = require('cookies')
const config = require('config')
const mysql = require('mysql')


const connection = mysql.createConnection({

	host: 'jiratrainingapp.cbpfnuanozoq.us-east-2.rds.amazonaws.com',
	user: 'webApp',
	password: 'password',
	database: 'Jira_Training_App'

})

connection.connect()

const deAuthSuccessful = config.get('deAuthSuccessfulQuery')

const router = Router()


router.get('/', (req, res) => {

	const cookies = new Cookies(req, res)
	
	cookies.set('url', '')
	cookies.set('auth', '')

	connection.query(deAuthSuccessful, err => {

		if (err) console.error(err)

	})

	res.redirect('/auth')

})

module.exports = router