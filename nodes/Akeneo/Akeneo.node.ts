import { IExecuteFunctions } from 'n8n-core'
import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow'
import axios from 'axios'
import {akeneoRequest, typeAkeneoRequest} from "./akeneoRequest"
import { productProperties ,} from './productProperties'
import { FamilyProperties } from './FamilyProperties'

import getToken from './getToken'

export class Akeneo implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Akeneo',
		icon: 'file:akeneo.svg',
		name: 'Akeneo',
		group: ['transform'],
		version: 1,
		description: 'Akeneo by pixelInfinito',
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		defaults: {
			name: 'Akeneo',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials:[
			{
				name: 'AkeneoApi',
				required: true
			}
		],
		properties: [
			{
				displayName: 'Recurso',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Product',
						value: 'Produto',
					},
					{
						name: 'Family',
						value: 'Family',
					},
				],
				default: 'Produto',
			},
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				default: 'find',
				required: true,
				options: [
					{
						name: 'Find One',
						value: 'find',
					},
					{
						name: 'Find All',
						value: 'findAll',
					},
					{
						name: 'Create',
						value: 'create',
					},
					{
						name: 'Delete',
						value: 'delete',
					},
					{
						name: 'Edit',
						value: 'edit',
						displayOptions:{
							show:{
								resource: ['Produto']
							}
						}
					},
				],
			},
			...productProperties,
			...FamilyProperties
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();

		let item: INodeExecutionData;

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {

				item = items[itemIndex]

				//propiedades (dados dos inputes)
				const identifier = await this.getNodeParameter('identifier', itemIndex, '') as string
				const family = await this.getNodeParameter('family', itemIndex, '') as string
				const productNameQuery = await this.getNodeParameter('productNameQuery', itemIndex, '') as string
				const familyNameAdd = await this.getNodeParameter('familyNameAdd', itemIndex, '') as string

				const resource = await this.getNodeParameter('resource', itemIndex)

				const operation = await this.getNodeParameter('operation', itemIndex)

				const productID = await this.getNodeParameter('productID', itemIndex, 0)

				//dados das credendicias
				const credentials = await this.getCredentials('AkeneoApi', itemIndex)

				const ClientID =  credentials.clientid
				const Secret = credentials.secret
				const username = credentials.username
				const password = credentials.password

				const token = await getToken({
					base64ClientIdSecretn:  btoa(ClientID + ':'+ Secret),
					domain: credentials.domain,
					password,
					username
				})
				const baseURL = credentials.domain
				/* const httRequestAkeneo = axios.create({
					baseURL,
				})
				httRequestAkeneo.defaults.headers.common["Authorization"] =  'Bearer '+token.access_token */
				switch(resource){
					case 'Produto':
						switch(operation){
							case 'findAll':
								const response = await akeneoRequest.GET({
									token: token.access_token,
									url: '/api/rest/v1/products',
									baseUrl: baseURL,
								})
								item.json["response"] = response
								/* try{

									const response = await httRequestAkeneo.get('/api/rest/v1/products')
									item.json["response"] = response.data
								}catch(e){
									item.json["response"] = e
								} */
							break
						}
					break
				}

			} catch (error) {

				if (this.continueOnFail()) {
					items.push({ json: this.getInputData(itemIndex)[0].json, error, pairedItem: itemIndex });
				} else {
					if (error.context) {
						error.context.itemIndex = itemIndex;
						throw error;
					}
					throw new NodeOperationError(this.getNode(), error, {
						itemIndex,
					});
				}
			}
		}

		return this.prepareOutputData(items)

	}
}
