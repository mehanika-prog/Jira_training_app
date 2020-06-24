const https = require('https')
const { rejects } = require('assert')


function sendRequest(method, host, path, auth = 'Basic', body = null){

	const options = {

		method: method,
        host: host,
        path: path,
		headers: {

			'Content-Type': 'application/json;charset=UTF-8',
			'Authorization': auth
			
		}

	}

	return new Promise((resolve, reject) => {	
		const request = https.request(options, res => {

			res.on('data', data => {

				if(res.statusCode === 200){

					resolve(JSON.parse(data))

				}else{

					reject()

				}

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

}

module.exports = sendRequest