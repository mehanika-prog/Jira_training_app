const {Router} = require('express')
const Cookies = require('cookies')
const config = require('config')
const sendRequest = require('../utils')


const router = Router()

router.get('/', (req, res) => {

	const cookies = new Cookies(req, res)
	const auth = cookies.get('auth')

	if(auth){

		const url = cookies.get('url')
		const path = config.get('getFilterUrl')

		sendRequest('GET', url, path, auth)
		.then(data => {

			res.render('issues', {

				data: data

			})

		})
		.catch(err => {

			res.redirect('/error')

		})

	}else{

		res.redirect('/auth')

	}

})

module.exports = router