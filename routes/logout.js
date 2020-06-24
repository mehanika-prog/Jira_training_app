const {Router} = require('express')
const Cookies = require('cookies')


const router = Router()

router.get('/', (req, res) => {

	const cookies = new Cookies(req, res)
	
    cookies.set('auth', '')
    res.redirect('/auth')

})

module.exports = router