import axios from "axios"

const token = async ({base64ClientIdSecretn, username, password, domain})=>{
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


export default token
