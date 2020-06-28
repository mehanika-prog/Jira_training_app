const https = require('https')
const mysql = require('mysql')


module.exports = {

	sendRequest: function(method, host, path, auth = 'Basic', query = null, body = null){

		const options = {
	
			method: method,
			host: host,
			path: path,
			query: query,
			headers: {
	
				'Content-Type': 'application/json;charset=UTF-8',
				'Authorization': auth
				
			}
	
		}
	
		return new Promise((resolve, reject) => {	
			const request = https.request(options, res => {
	
				let response = ''
	
				res.on('data', data => {
	
					if(res.statusCode === 200){
	
						response += data
	
					}else{
	
						reject()
	
					}
	
				})
	
				res.on('end', data => {
	
					resolve(JSON.parse(response))
	
				})
	
			})
	
			request.on('error', () => {
	
				reject()
	
			})
	
			if(body){
	
				request.write(JSON.stringify(body))
	
			}
			
			request.end()
	
		})
	
	},

	dbLogger: function(query){

		const connection = mysql.createConnection({
	
			host: 'jiratrainingapp.cbpfnuanozoq.us-east-2.rds.amazonaws.com',
			user: 'webApp',
			password: 'password',
			database: 'Jira_Training_App'
		
		})
		
		connection.connect()
	
		connection.query(query, err => {
	
			if (err) console.error(err)
	
		})
	
		connection.end()
	
	}

}