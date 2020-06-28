const {Router} = require('express')
const {sendRequest, dbLogger} = require('../utils')
const config = require('config')
const basic = require('basic-authorization-header')
const Cookies = require('cookies')


const router = Router()

const authWithCooliesSuccessful = config.get('authWithCooliesSuccessfulQuery')
const authWithCookiesFailure = config.get('authWithCookiesFailureQuery')
const authSuccessful = config.get('authSuccessfulQuery')
const authFailure = config.get('authFailureQuery')


router.get('/', (req, res) => {

	const cookies = new Cookies(req, res)
	
	if(cookies.get('auth')){

		dbLogger(authWithCooliesSuccessful)

		res.redirect('/issues')

	}else{

		dbLogger(authWithCookiesFailure)

		res.render('auth', {

			title: "Authentication"
	
		})

	}

})

router.post('/', (req, res) => {

	const url = req.body.url
	const path = config.get('authUrl')
	const auth = basic(req.body.email, req.body.apitoken)

	sendRequest('GET', url, path, auth)
	.then(data => {
	
		dbLogger(authSuccessful)

		const cookies = new Cookies(req, res)
		cookies.set('url', url)
		cookies.set('auth', auth)

		res.redirect('/issues')

	})
	.catch(err => {

		dbLogger(authFailure)

		res.render('auth', {

			title: "Authentication",
			loginFailed	: true

		})

	})

})

module.exports = router