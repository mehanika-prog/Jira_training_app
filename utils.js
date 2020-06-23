const https = require('https')


function sendRequest(method, host, path, body = null){

	const options = {

		method: method,
        host: host,
        path: path,
		headers: {

			'Content-Type': 'application/json'
			
		}

	}

	return new Promise(resolve => {	

		const request = https.request(options, res => {

			res.on('data', data => {

				resolve(JSON.parse(data))

			})

		})

		if(body) request.write(JSON.stringify(body))
		
		request.end()

	})

}

module.exports = sendRequest