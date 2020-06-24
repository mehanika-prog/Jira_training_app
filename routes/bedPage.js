const {Router} = require('express')


const router = Router()

router.all('/', (req, res) => {

	res.render('bedPage')

})

module.exports = router