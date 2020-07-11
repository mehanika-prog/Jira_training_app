const config = require('config')
const {sendRequest} = require('./utils')
const request = require('sync-request')


function extractAssignees(issues){

	let assignees = []

	issues.forEach(element => {
		
		if(element.fields.assignee !== null){

			assignees.push(element.fields.assignee)

		}else{

			assignees.push({accountId: 'EMPTY', displayName: 'Unassigned'})

		}

	})

	let uniqAssignees = []

	function itemCheck(item) {

		if (uniqAssignees.indexOf(item.accountId) === -1) {

			uniqAssignees.push(item.accountId)
			return true
			
		}

		return false

	}

	return assignees.filter((item) => itemCheck(item))

}

function extractStatuses(issues){

	let statuses = []

	issues.forEach(element => {
		
		if(element.fields.status !== null){

			statuses.push(element.fields.status)

		}

	})

	let uniqStatuses = []

	function itemCheck(item) {

		if (uniqStatuses.indexOf(item.id) === -1) {

			uniqStatuses.push(item.id)
			return true
			
		}

		return false

	}

	return statuses.filter((item) => itemCheck(item))

}

function extractTypes(issues){

	let types = []

	issues.forEach(element => {
		
		if(element.fields.issuetype !== null){

			types.push(element.fields.issuetype)

		}

	})

	let uniqTypes = []

	function itemCheck(item) {

		if (uniqTypes.indexOf(item.id) === -1) {

			uniqTypes.push(item.id)
			return true
			
		}

		return false

	}

	return types.filter((item) => itemCheck(item))

}

function extractPriorities(issues){

	let priorities = []

	issues.forEach(element => {
		
		if(element.fields.priority !== null){

			priorities.push(element.fields.priority)

		}

	})

	let uniqPriorities = []

	function itemCheck(item) {

		if (uniqPriorities.indexOf(item.id) === -1) {

			uniqPriorities.push(item.id)
			return true
			
		}

		return false

	}

	return priorities.filter((item) => itemCheck(item))

}

function jiraDataConverter(data, url, auth){

	const issuesPath = config.get('issuesUrl')
	const searchPath = config.get('searchUrl')

	let convData = {}

	convData.issuesCount = data.issues.length

	convData.assignees = extractAssignees(data.issues)

	convData.statuses = extractStatuses(data.issues)

	convData.types = extractTypes(data.issues)

	convData.priorities = extractPriorities(data.issues)


	convData.assignees.forEach(object => {

		object.statuses = convData.statuses
		object.types = convData.types

	})

	convData.assignees.forEach(object => {

		object.statuses.forEach(object2 => {

			object2.types = convData.types
			object2.priorities = convData.priorities

		})

	})

	convData.assignees.forEach(object => {

		object.statuses.forEach(object2 => {

			object2.types.forEach(object3 => {

				object3.priorities = convData.priorities

			})

		})

	})

	convData.assignees.forEach(object => {

		object.statuses.forEach(object2 => {

			object2.types.forEach(object3 => {

				object3.priorities.forEach(object4 => {

					object4.query = `assignee in (${object.accountId})`
					+ ` AND status = "${object2.name}"`
					+ ` AND issuetype = "${object3.name}"`
					+ ` AND priority = "${object4.name}"`
					+ ` order by created DESC`

					object4.query = object4.query.replace(/ /g, '%20')
					object4.query = object4.query.replace(/"/g, '%22')
					object4.query = object4.query.replace(/=/g, '%3D')

					object4.vievUrl = `https://${url}${issuesPath}/?jql=${object4.query}`

					object4.issues = JSON.parse(request('GET','https://' + url + searchPath + '?jql=' + object4.query, {

						headers: {

							'Authorization': auth,
							'content-type': 'application/json'

						}

					}).getBody('utf8'))

					console.log(`${object.accountId}, ${object2.name}, ${object3.name}, ${object4.name}, ${object4.issues.total}`)

				})

			})

		})

	})

	return convData

}

module.exports = jiraDataConverter