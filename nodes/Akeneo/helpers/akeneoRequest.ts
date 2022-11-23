
import axios from "axios"

type typeAkeneoRequest = {
	baseUrl?: string,
	url: string,
	body?:{},
	headers?: {},
	token: string
}

const GET = async ({ url, headers, token} : typeAkeneoRequest)=>{
	axios.defaults.headers.common["Authorization"] =  'Bearer '+token
	try{
		const response = await axios.get(url, headers)
		return response.data
	}catch(e){
		return e
	}
}

const POST = async({ url, body, headers, token} : typeAkeneoRequest)=>{
	axios.defaults.headers.common["Authorization"] =  'Bearer '+token
	try{
		const response = await axios.post(url, body, {
		headers: headers
	})
		return response.data
	}catch(e){
		return e
	}
}

const  PATCH =  async({url, body, headers, token} : typeAkeneoRequest)=>{
	axios.defaults.headers.common["Authorization"] =  'Bearer '+token
	try{
		const response = await axios.patch(url, body, {
			headers: headers
		})
		return response.data
	}catch(e){
		return e
	}
}

const DELETE =  async ({ url, body, headers, token} : typeAkeneoRequest)=>{
	axios.defaults.headers.common["Authorization"] =  'Bearer '+token
	try{
		const response = await axios.delete(url,{
			headers: headers
		})
		return response.data
	}catch(e){
		return e
	}
}

export  {GET, POST, DELETE, PATCH, typeAkeneoRequest}
