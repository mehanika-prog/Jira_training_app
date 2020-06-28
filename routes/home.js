const {Router} = require('express')
const router = Router()
const Cookies = require('cookies')
const config = require('config')
const {dbLogger} = require('../utils')


const authWithCooliesSuccessful = config.get('authWithCooliesSuccessfulQuery')
const authWithCookiesFailure = config.get('authWithCookiesFailureQuery')


router.get('/', (req, res) => {

	const cookies = new Cookies(req, res)

	if(cookies.get('auth')){

		dbLogger(authWithCooliesSuccessful)

		res.redirect('/issues')

	}else{

		dbLogger(authWithCookiesFailure)

		res.redirect('/auth')

	}
	
	res.end()

})

module.exports = router