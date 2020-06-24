const {Router} = require('express')
const router = Router()
const Cookies = require('cookies')

router.get('/', (req, res) => {

	// res.redirect('/auth')
	const cookies = new Cookies(req, res)

	if(cookies.get('auth')){

		res.redirect('/issues')

	}else{

		res.redirect('/auth')

	}
	
	res.end()

})

module.exports = router