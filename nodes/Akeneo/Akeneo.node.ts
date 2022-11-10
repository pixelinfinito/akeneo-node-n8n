import { IExecuteFunctions } from 'n8n-core'
import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow'
import axios from 'axios'
//import AuthPlytix from "./AuthPlytix"
import { productProperties } from './productProperties'
import { FamilyProperties } from './FamilyProperties'

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

				const headerRequest = {
					'Cookie': '_pk_id.1.1fff=11490ade175b99b4.1666351845.; BAPID=vs6ppempla7aaeasogj93o5nq1',
					'X-Requested-With': 'XMLHttpRequest'
				}

				const identifier = await this.getNodeParameter('identifier', itemIndex, '') as string
				const family = await this.getNodeParameter('family', itemIndex, '') as string
				const resource = await this.getNodeParameter('resource', itemIndex)
				const operation = await this.getNodeParameter('operation', itemIndex)
				const familyNameAdd = await this.getNodeParameter('familyNameAdd', itemIndex, '') as string
				const productID = await this.getNodeParameter('productID', itemIndex, 0)
				const credentials = await this.getCredentials('AkeneoApi', itemIndex, {}) as {}

				const baseURL = credentials.domain

				console.log(baseURL)
				const httRequestAkeneo = axios.create({
					baseURL
				})

				switch(resource){
					case 'Produto':
						switch(operation){
							case 'create':
								try{
									const response = await httRequestAkeneo.post('/enrich/product/rest', {
										"identifier": identifier,
										"family": family,
									},{
										headers: headerRequest
									})
									item.json["response"] = response.data
								}catch(e){
									item.json["response"] = e
								}
							break
							case 'find':
								//http://10.0.7.84:8080/datagrid/product-grid/load
							break

							case 'findAll':
								try{
									const response = await httRequestAkeneo.get('/datagrid/product-grid/load', {
										headers: headerRequest
									})
									item.json["response"] = JSON.parse(response.data.data)
								}catch(e){
									item.json["response"] = e
								}
							break

							case 'delete':
								try{
									const response = await httRequestAkeneo.delete('/enrich/product/rest/'+productID, {
										headers: headerRequest
									})
									item.json["response"] = JSON.parse(response.data)
								}catch(e){
									item.json["response"] = e
								}
							break

							case 'edit':
								try{
									const response = await httRequestAkeneo.post('/enrich/product/rest/'+productID, {
										"values":{
											"sku":[{"locale":null,"scope":null,"data":identifier}]
										},
								},{
										headers: headerRequest
									})
									item.json["response"] = JSON.parse(response.data)
								}catch(e){
									item.json["response"] = e
								}
							break
						}
					break

					case 'Family':
						console.log(familyNameAdd)
						switch(operation){
							case 'create':
								try{
									const response = await httRequestAkeneo.post('/configuration/rest/family/', {
										"code": familyNameAdd,
									},{
										headers: headerRequest
									})
									item.json["response"] = response.data
								}catch(e){
									item.json["response"] = e
								}
							break

							case 'delete':
								try{
									const response = await httRequestAkeneo.delete('/configuration/rest/family/'+familyNameAdd,{
										headers: headerRequest
									})
									item.json["response"] = JSON.parse(response.data)
								}catch(e){
									item.json["response"] = e
								}
							break

							case 'findAll':
								try{
									const response = await httRequestAkeneo.get('/datagrid/family-grid/load?localeCode=en_US',{
										headers: headerRequest
									})
									item.json["response"] = JSON.parse(response.data.data)
								}catch(e){
									item.json["response"] = e
								}
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
