import { IExecuteFunctions } from 'n8n-core';
import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';
import axios from "axios"

export class AddProductToPlyTix implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'AddProductToPlyTix',
		name: 'AddProductToPlyTix',
		group: ['transform'],
		version: 1,
		description: 'AddProductToPlyTix',
		defaults: {
			name: 'AddProductToPlyTix',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			// Node properties which the user gets displayed and
			// can change on the node.
			{
				displayName: 'SKU',
				name: 'sku',
				type: 'string',
				default: '',
				placeholder: '',
				description: 'SKU',
			},
			{
				displayName: 'Token',
				name: 'token',
				type: 'string',
				default: '',
				placeholder: 'token',
				description: '',
			},

		],
	};

	// The function below is responsible for actually doing whatever this node
	// is supposed to do. In this case, we're just appending the `myString` property
	// with whatever the user has entered.
	// You can make async calls and use `await`.
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();

		let item: INodeExecutionData;
		let sku: string;
		let token: string;

		// Iterates over all input items and add the key "myString" with the
		// value the parameter "myString" resolves to.
		// (This could be a different value for each item in case it contains an expression)
		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				sku = this.getNodeParameter('sku', itemIndex, '') as string;
				token = this.getNodeParameter('token', itemIndex, '') as string;
				item = items[itemIndex];

				try{
					const response = await axios.post("https://pim.plytix.com/api/v1/products",
					{
						'sku': sku
					},
					{
						headers: {
							'Authorization': 'Bearer ' + token
						}
					})

					item.json['response'] = response.data
					/* item.json["access_token"] = response.data.data[0].access_token
					item.json["refresh_token"] = response.data.data[0].refresh_token */

				}catch(e){
					item.json["response"] = e
				}

			} catch (error) {
				// This node should never fail but we want to showcase how
				// to handle errors.
				if (this.continueOnFail()) {
					items.push({ json: this.getInputData(itemIndex)[0].json, error, pairedItem: itemIndex });
				} else {
					// Adding `itemIndex` allows other workflows to handle this error
					if (error.context) {
						// If the error thrown already contains the context property,
						// only append the itemIndex
						error.context.itemIndex = itemIndex;
						throw error;
					}
					throw new NodeOperationError(this.getNode(), error, {
						itemIndex,
					});
				}
			}
		}

		return this.prepareOutputData(items);
	}
}
