import { IExecuteFunctions } from 'n8n-core'
import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow'

import AuthPlytix from "./AuthPlytix"

export class AuthPlytixNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'AuthPlytix',
		name: 'AuthPlytix',
		group: ['transform'],
		version: 1,
		description: 'AuthPlytixNode',
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		defaults: {
			name: 'AuthPlytixNode',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials:[
			{
				name: 'PlytixCredentialsApi',
				required: true,
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
				],
				default: 'Produto',
			},
			{
				displayName: 'Operação',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				default: 'create',
				required: true,
				options: [
					{
						name: 'Create',
						value: 'create',
					},
					{
						name: 'Delete',
						value: 'delete',
					},
					{
						name: 'Find One',
						value: 'find',
					},
				],
			},
			{
				displayName: 'Sku',
				name: 'sku',
				type: 'string',
				default: '',
				placeholder: 'Digite o nome do produto',
				displayOptions:{
					show:{
						operation:[
							'create'
						]
					}
				}
			},
			{
				displayName: 'ID do produto',
				name: 'produtctID',
				type: 'string',
				default: '',
				placeholder: 'Digite o id do produto',
				displayOptions:{
					show:{
						operation:[
							'delete',
							'find'
						]
					}
				}
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();

		let item: INodeExecutionData;

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const sku = this.getNodeParameter('sku', itemIndex, '') as string
				item = items[itemIndex]

				const credentials = await this.getCredentials('PlytixCredentialsApi', itemIndex)
				const resource = await this.getNodeParameter('resource', itemIndex)
				const operation = await this.getNodeParameter('operation', itemIndex)
				const produtctID = await this.getNodeParameter('produtctID', itemIndex, '') as string

				const token = await AuthPlytix({api_key: credentials.api_key, api_password: credentials.api_password})

				let response
				switch(resource){
					case 'Produto':
						switch(operation){
							case 'create':
								response = await this.helpers.httpRequest(
									{
										method: 'POST',
										baseURL: 'https://pim.plytix.com/api/v1',
										url: '/products',
										body:{
											'sku': sku
										},
										headers:{
											Accept: 'application/json',
											Authorization: `Bearer ${token[0].access_token}`
										}
									}
								)

								item.json["response"] = response
							break
							case 'delete':
								response = await this.helpers.httpRequest(
									{
										method: 'DELETE',
										baseURL: 'https://pim.plytix.com/api/v1/products',
										url: produtctID,
										headers:{
											Accept: 'application/json',
											Authorization: `Bearer ${token[0].access_token}`
										}
									}
								)
								item.json["response"] = response
							break;
							case 'find':
								response = await this.helpers.httpRequest(
									{
										method: 'GET',
										baseURL: 'https://pim.plytix.com/api/v1/products/',
										url: produtctID,
										headers:{
											Accept: 'application/json',
											Authorization: `Bearer ${token[0].access_token}`
										}
									}
								)
							break
						}
					break
				}

				item.json["response"] = response
				

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
