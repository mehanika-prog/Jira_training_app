const {Router} = require('express')
const Cookies = require('cookies')
const config = require('config')
const {dbLogger} = require('../utils')


const deAuthSuccessful = config.get('deAuthSuccessfulQuery')

const router = Router()


router.get('/', (req, res) => {

	const cookies = new Cookies(req, res)
	
	cookies.set('url', '')
	cookies.set('auth', '')

	dbLogger(deAuthSuccessful)

	res.redirect('/auth')

})

module.exports = router