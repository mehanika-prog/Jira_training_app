const {Router} = require('express')
const sendRequest = require('../utils')
const config = require('config')


const router = Router()

router.get('/', (req, res) => {
	res.render('auth', {
		title: "Authentication"
	})
})

router.post('/', (req, res) => {

	const url = config.get('baseUrl')
	const path = config.get('authUrl')               
	const body = {
		"username": req.body.name,
		"password": req.body.password
	}

	console.log(url, path, body)

	sendRequest('POST', url, path, body)
	.then(data => {

		console.log(data)

	})

	res.redirect('/auth')

})

module.exports = router