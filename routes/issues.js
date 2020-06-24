const {Router} = require('express')
const Cookies = require('cookies')


const router = Router()

router.get('/', (req, res) => {

	const cookies = new Cookies(req, res)
	
	if(cookies.get('auth')){

		res.render('issues')

	}else{

		res.redirect('/auth')

	}

})

module.exports = router