const {Router} = require('express')
const Cookies = require('cookies')
const config = require('config')
const {sendRequest, dbLogger} = require('../utils')
const jiraDataConverter = require('../jiraDataConverter')


const issuesFindedSuccessful = config.get('issuesFindedSuccessfulQuery')
const issuesFindedFailure = config.get('issuesFindedFailureQuery')

const router = Router()


router.use('/', (req, res, next) => {

	const cookies = new Cookies(req, res)
	const auth = cookies.get('auth')

	if(auth){

		next()

	}else{

		res.redirect('/auth')

	}

})

router.get('/', (req, res) => {

	const cookies = new Cookies(req, res)
	const url = cookies.get('url')
	const path = config.get('filterUrl')
	const auth = cookies.get('auth')

	sendRequest('GET', url, path, auth)
	.then(data => {

		res.render('issues', {

			title: 'Issues',
			filters: data

		})

	})
	.catch(err => {

		res.redirect('/error')

	})

})

router.post('/', (req, res) => {

	const cookies = new Cookies(req, res)
	const url = cookies.get('url')
	const filtersPath = config.get('filterUrl')
	const filterIdPath = `/${req.body.filter}`
	const searchPath = config.get('searchUrl')
	const auth = cookies.get('auth')

	sendRequest('GET', url, filtersPath, auth)
	.then(filters => {

		sendRequest('GET', url, filtersPath + filterIdPath, auth)
		.then(filter => {
			
			sendRequest('GET', url, searchPath, auth, {jql: filter.jql})
			.then(issues => {

				dbLogger(issuesFindedSuccessful)

				// issues - is row data with information about issues found by the filter.
				// console.log(jiraDataConverter(issues, url))

				res.render('issues',{

					title: 'Issues',
					filters: filters,
					parsedIssues: jiraDataConverter(issues, url, auth)

				})

			})
			.catch(err => {

				dbLogger(issuesFindedFailure)
				console.log(err, 'issues error')
				res.redirect('/error')

			})

		})
		.catch(err => {

			dbLogger(issuesFindedFailure)
			console.log('filter error', err)
			res.redirect('/error')

		})

	})
	.catch(err => {

		dbLogger(issuesFindedFailure)
		console.log('filters error', err)
		res.redirect('/error')

	})

})

module.exports = router