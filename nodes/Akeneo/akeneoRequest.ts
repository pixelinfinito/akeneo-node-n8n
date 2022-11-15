
import axios from "axios"

type typeAkeneoRequest = {
	baseUrl?: string,
	url: string,
	body?:{},
	headers?: {},
	token: string
}
const akeneoRequest = ({baseUrl, url, body, headers, token} : typeAkeneoRequest)=>{
	const httRequestAkeneo = axios.create({
		baseUrl,
	})
	httRequestAkeneo.defaults.headers.common["Authorization"] =  'Bearer '+token
	return {
		GET: async ()=>{
			try{
				const response = await httRequestAkeneo.get(url, headers)
				return response.data
			}catch(e){
				return e
			}
		},

		POST: async()=>{
			try{
				const response = await httRequestAkeneo.post(url, body, {
					headers: headers
				})
				return response.data
			}catch(e){
				return e
			}
		},

		PUT: async()=>{
			try{
				const response = await httRequestAkeneo.post(url, body, {
					headers: headers
				})
				return response.data
			}catch(e){
				return e
			}
		},

		DELETE: async ()=>{
			try{
				const response = await httRequestAkeneo.post(url, body, {
					headers: headers
				})
				return response.data
			}catch(e){
				return e
			}
		}
	}
}
export  {akeneoRequest, typeAkeneoRequest}
