import axios from "axios"

type AkeneoToken = {
	base64ClientIdSecretn: string,
	username:string | null,
	password:string |null,
	domain:string 
}
const token = async ({base64ClientIdSecretn, username, password, domain}: AkeneoToken)=>{
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
		return response.data
	}catch(e){
		return e
	}
}
export default token
