import {IExecuteFunctions} from 'n8n-core';
import {INodeExecutionData, INodeType, INodeTypeDescription, NodeOperationError,} from 'n8n-workflow';

import * as akeneoRequest from "./helpers/akeneoRequest";
import {convertCollection} from './helpers/convertCollection';
import {productProperties} from './Properties/productProperties';
import {LocaleProprties} from "./Properties/LocaleProprties";
import {FamilyProperties} from './Properties/FamilyProperties';
import {MediaFileProperties} from "./Properties/MediaFileProperties";
import {AkeneoProperties} from './Properties/AkeneoProperties';
import {CategoryProperties} from './Properties/CategoryProperties';
import {getToken} from './helpers/getToken';
import FormData from 'form-data';
import fs from "fs";
import {changeToList} from "./helpers/changeToList";
import {paginateResponse} from "./helpers/pagination";

export class Akeneo implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Akeneo',
		icon: 'file:akeneo.svg',
		name: 'Akeneo X',
		group: ['transform'],
		version: 1,
		description: 'Akeneo by pixelInfinito',
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		defaults: {
			name: 'Akeneo',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'akeneoApi',
				required: true,
			},
		],
		properties: [
			...AkeneoProperties,
			...LocaleProprties,
			...productProperties,
			...FamilyProperties,
			...MediaFileProperties,
			...CategoryProperties,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();

		let item: INodeExecutionData;

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {

				item = items[itemIndex];

				const identifier = await this.getNodeParameter('identifier', itemIndex, '') as string;
				const family = await this.getNodeParameter('family', itemIndex, '') as string;
				const productNameQuery = await this.getNodeParameter('productNameQuery', itemIndex, '') as string;
				const familyNameAdd = await this.getNodeParameter('familyNameAdd', itemIndex, '') as string;
				const parent = await this.getNodeParameter('parent', itemIndex, '') as string;
				const localeInput = await this.getNodeParameter('localeInput', itemIndex, '') as string;
				const enabled = await this.getNodeParameter('enabled', itemIndex, true);

				const resource = await this.getNodeParameter('resource', itemIndex, '');
				const operation = await this.getNodeParameter('operation', itemIndex, '');

				const otherOperation = await this.getNodeParameter('otherOperation', itemIndex, '');
				const categoryAndGroupOperation = await this.getNodeParameter('categoryAndGroupOperation', itemIndex, '');
				const familyOperation = await this.getNodeParameter('familyOperation', itemIndex, '');

				const nameSkuUpdate = await this.getNodeParameter('nameSkuUpdate', itemIndex, 0);
				const categoryInput = await this.getNodeParameter('categoryInput', itemIndex, '') as string;
				const categories = await this.getNodeParameter('categories', itemIndex, {}) as { categoryShow: [] };
				const groups = await this.getNodeParameter('groups', itemIndex, {}) as { groupsShow: [] };
				const price = await this.getNodeParameter('price', itemIndex, {}) as { priceShow: [] };

				const fileName = await this.getNodeParameter('fileName', itemIndex, '') as string;
				const filePath = await this.getNodeParameter('filePath', itemIndex, '') as string;

				const label_de_DE = await this.getNodeParameter('de_DE', itemIndex, '') as string;
				const label_en_US = await this.getNodeParameter('en_US', itemIndex, '') as string;
				const label_fr_FR = await this.getNodeParameter('fr_FR', itemIndex, '') as string;
				const attributes = await this.getNodeParameter('attributes', itemIndex, {}) as { attributesShow: [] };

				//dados das credendicias
				const credentials = await this.getCredentials('akeneoApi', itemIndex);

				const ClientID = credentials.clientid;
				const Secret = credentials.secret;
				const username = credentials.username;
				const password = credentials.password;

				const token = await getToken({
					base64ClientIdSecretn: btoa(ClientID + ':' + Secret),
					domain: credentials.domain as string,
					password: password as string,
					username: username as string,
				});

				const baseURL = credentials.domain;
				let response;

				const groupsList = convertCollection(groups.groupsShow || [], 'groupsValue');
				const categoriesList = convertCollection(categories!.categoryShow || [], 'categotyValue');
				const priceList = convertCollection(price!.priceShow || [], 'priceValue');
				const coinValueList = convertCollection(price!.priceShow || [], 'coinValue');

				const priceListArray: { amount: string, currency: string }[] = [];

				switch (resource) {
					case 'Produto':
						switch (operation) {
							case 'create':

								for (let i = 0; i < priceList.length; i++) {
									const priceValue = priceList[i];
									const coinValue = coinValueList[i];

									if (coinValue && priceValue) {
										priceListArray.push({
											"amount": priceValue,
											"currency": coinValue,
										});
									}
								}

								response = await akeneoRequest.POST({
									token: token.access_token,
									url: baseURL + '/api/rest/v1/products',
									body: {
										"identifier": identifier,
										"family": family,
										"groups": groupsList,
										"parent": parent || null,
										"categories": categoriesList,
										"enabled": enabled,
										"values": {
											"price": [
												{
													"locale": null,
													"scope": null,
													"data": priceListArray,
												},
											],
										},
									},
								});

								if (!response.error) {
									if (filePath) {
										const form = new FormData();
										const newFile = fs.readFileSync(filePath);

										form.append('product', JSON.stringify({
											"identifier": identifier,
											"attribute": "picture",
											"scope": null,
											"locale": null
										}));
										form.append('file', newFile, 'logo.png');

										const responseFile = await akeneoRequest.POST({
											token: token.access_token,
											url: baseURL + '/api/rest/v1/media-files',
											body: form.getBuffer(),
											headers: {
												...form.getHeaders(),
											},
										});
										item.json['responseFile'] = responseFile;
									}

								}
								item.json["response"] = response;
								break;

							case 'findAll':
								return [await paginateResponse(baseURL + '/api/rest/v1/products?limit=100', token)];
								break;

							case 'find':
								response = await akeneoRequest.GET({
									token: token.access_token,
									url: baseURL + '/api/rest/v1/products/' + productNameQuery,
								});

								if (response.error) {
									item.json['message'] = response.error.response.data;
								}

								item.json["response"] = response;
								break;
							case 'delete':
								response = await akeneoRequest.DELETE({
									token: token.access_token,
									url: baseURL + '/api/rest/v1/products/' + productNameQuery,
								});
								if (response.error) {
									item.json['message'] = response.error.response.data;
								}
								item.json["response"] = response;
								break;

							case 'patch':
								response = await akeneoRequest.PATCH({
									token: token.access_token,
									url: baseURL + '/api/rest/v1/products/' + identifier,
									body: {
										"identifier": identifier,
										"family": family,
										"groups": groupsList,
										"parent": parent || null,
										"categories": categoriesList,
										"enabled": enabled,
										"values": {
											"price": [
												{
													"locale": null,
													"scope": null,
													"data": priceListArray,
												},
											],
										},
									},
								});
								if (response.error) {
									item.json['message'] = response.error.response.data;
								}
								item.json["response"] = response;
								break;
							default:
							//
						}
						break;

					case 'Family':
						switch (familyOperation) {
							case 'find':
								response = await akeneoRequest.GET({
									token: token.access_token,
									url: baseURL + '/api/rest/v1/families/' + familyNameAdd,
								});
								if (response.error) {
									item.json['message'] = response.error.response.data;
								}
								item.json["response"] = response;
								break;
							case 'findAll':

								response = await akeneoRequest.GET({
									token: token.access_token,
									url: baseURL + '/api/rest/v1/families',
								});
								if (response.error) {
									item.json['message'] = response.error.response.data;
								}
								item.json["response"] = response;

								break;

							case 'create':

								const attributesList = convertCollection(attributes!.attributesShow || [], 'attributeValue');

								response = await akeneoRequest.POST({
									token: token.access_token,
									url: baseURL + '/api/rest/v1/families',
									body: {
										"code": familyNameAdd,
										"attributes": attributesList,
										"labels": {
											"de_DE": label_de_DE,
											"en_US": label_en_US,
											"fr_FR": label_fr_FR,
										},
									},
								});
								if (response.error) {
									item.json['message'] = response.error.response.data;
								}
								item.json["response"] = response;
								break;
							default:
							//
						}
						break;

					case 'Locale':
						switch (otherOperation) {
							case 'find':
								response = await akeneoRequest.GET({
									token: token.access_token,
									url: baseURL + '/api/rest/v1/locales/' + localeInput,
								});
								if (response.error) {
									item.json['message'] = response.error.response.data;
								}
								item.json["response"] = response;
								break;
							case 'findAll':
								response = await akeneoRequest.GET({
									token: token.access_token,
									url: baseURL + '/api/rest/v1/locales',
								});
								if (response.error) {
									item.json['message'] = response.error.response.data;
								}
								item.json["response"] = response;
								break;
							default:
							//
						}
						break;

					case 'File':
						switch (otherOperation) {
							case 'find':
								response = await akeneoRequest.GET({
									token: token.access_token,
									url: baseURL + '/api/rest/v1/media-files/' + fileName,
								});
								if (response.error) {
									item.json['message'] = response.error.response.data;
								}
								item.json["response"] = response;
								break;

							case 'findAll':
								response = await akeneoRequest.GET({
									token: token.access_token,
									url: baseURL + '/api/rest/v1/media-files',
								});
								if (response.error) {
									item.json['message'] = response.error.response.data;
								}
								item.json["response"] = response;
								break;
							default:
							//
						}
						break;

					case 'Category':
						switch (categoryAndGroupOperation) {
							case 'findAll':
								response = await akeneoRequest.GET({
									token: token.access_token,
									url: baseURL + '/api/rest/v1/categories',
								});
								if (response.error) {
									item.json['message'] = response.error.response.data;
								}
								item.json["response"] = response;
								break;

							case 'find':
								response = await akeneoRequest.GET({
									token: token.access_token,
									url: baseURL + '/api/rest/v1/categories/' + categoryInput,
								});

								if (response.error) {
									item.json['message'] = response.error.response.data;
								}
								item.json["response"] = response;

								break;

							case 'create':

								const parentCategory = await this.getNodeParameter('parentCategory', itemIndex, '') as string;
								const category_de_DE = await this.getNodeParameter('category_de_DE', itemIndex, '') as string;
								const category_en_US = await this.getNodeParameter('category_en_US', itemIndex, '') as string;
								const category_fr_FR = await this.getNodeParameter('category_fr_FR', itemIndex, '') as string;

								response = await akeneoRequest.POST({
									token: token.access_token,
									url: baseURL + '/api/rest/v1/categories',
									body: {
										"code": categoryInput,
										"parent": parentCategory,
										"labels": {
											"de_DE": category_de_DE,
											"en_US": category_en_US,
											"fr_FR": category_fr_FR,
										},
									},
								});

								if (response.error) {
									item.json['message'] = response.error.response.data;
								}
								item.json["response"] = response;

								break;
							default:
							//
						}
						break;
					default:
					//

				}

			} catch (error) {

				if (this.continueOnFail()) {
					items.push({json: this.getInputData(itemIndex)[0].json, error, pairedItem: itemIndex});
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

		return this.prepareOutputData(items);

	}
}
