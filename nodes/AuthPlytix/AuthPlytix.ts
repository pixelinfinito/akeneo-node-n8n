import axios from "axios";
export default async function AuthPlytix(options:any){
	console.log(options)
	const response = await axios.post("https://auth.plytix.com/auth/api/get-token", {
		api_key: options.api_key,
		api_password: options.api_password
	},
	{
		headers:{
			'Content-Type': 'application/json'
		}
	}
	)

	return response.data.data
}
