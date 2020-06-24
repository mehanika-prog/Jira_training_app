const {Router} = require('express')
const sendRequest = require('../utils')
const config = require('config')
const basic = require('basic-authorization-header')
const Cookies = require('cookies')


const router = Router()

router.get('/', (req, res) => {

	const cookies = new Cookies(req, res)
	
	if(cookies.get('auth')){

		res.redirect('/issues')

	}else{

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
	
		const cookies = new Cookies(req, res)
		cookies.set('auth', auth)

		res.redirect('/issues')

	})
	.catch(err => {

		res.render('auth', {

			title: "Authentication",
			loginFailed	: true

		})

	})

})

module.exports = router