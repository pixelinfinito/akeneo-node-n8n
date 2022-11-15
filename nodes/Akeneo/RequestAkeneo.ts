import axios from "axios"

type typeRequest = {
	url: string, username: string, password: string, domain: string
}

const request = async ({url, username, password, domain}: typeRequest)=>{
	try{
		const response = await axios.post(domain+"/api/oauth/v1/token", {
			"username": username,
			"password": password,
			"grant_type": "password"
		},{
			headers:{
				"Content-Type": "application/json",
				"Authorization": "Basic "+base64ClientIdSecretn
			}
		})
		console.log(response)
		return response.data
	}catch(e){
		console.log(e)
		return e
	}
}


export default request
