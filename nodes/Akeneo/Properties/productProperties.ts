import { INodeProperties } from 'n8n-workflow';

// When the resource `httpVerb` is selected, this `operation` parameter will be shown.
export const productProperties: INodeProperties[] = [
	{
		displayName: 'SKU',
		name: 'identifier',
		type: 'string',
		default: '',
		required: true,
		displayOptions:{
			show:{
				resource: ['Produto'],
				operation:['create', 'patch'],
			},
		},
	},
	{
		displayName: 'Novo indentidicador(SKU)',
		name: 'nameSkuUpdate',
		type: 'string',
		default: '',
		displayOptions:{
			show:{
				resource: ['Produto'],
				operation:['patch'],
			},
		},
	},
	{
		displayName: 'Family',
		name: 'family',
		type: 'string',
		default: '',
		displayOptions:{
			show:{
				resource: ['Produto'],
				operation:['create', 'patch'],
			},
		},
	},
	{
		displayName: 'Parent',
		name: 'parent',
		type: 'string',
		default: '',
		displayOptions:{
			show:{
				resource: ['Produto'],
				operation:['create', 'patch'],
			},
		},
	},
	{
		displayName: 'Enabled',
		name: 'enabled',
		type: 'boolean',
		default: true,
		displayOptions:{
			show:{
				resource: ['Produto'],
				operation:['create', 'patch'],
			},
		},
	},
	{
		displayName: 'Categories',
		name: 'categories',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add Field',
		default: {},
		options: [
			{
				displayName: 'CategoryShow',
				name: 'categoryShow',
				values:[
					{
						displayName: 'categotyValue',
						name: 'categotyValue',
						type: 'string',
						default: '',
					},
				],
			},
		],
		displayOptions:{
			show:{
				resource: ['Produto'],
				operation:['create', 'patch'],
			},
		},
	},

	{
		displayName: 'Groups',
		name: 'groups',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add Field',
		default: {},
		options: [
			{
				displayName: 'groupsShow',
				name: 'groupsShow',
				values:[
					{
						displayName: 'groupsValue',
						name: 'groupsValue',
						type: 'string',
						default: '',
					},
				],
			},
		],
		displayOptions:{
			show:{
				resource: ['Produto'],
				operation:['create', 'patch'],
			},
		},
	},

	{
		displayName: 'Price',
		name: 'price',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add Field',
		default: {},
		options: [
			{
				displayName: 'priceShow',
				name: 'priceShow',
				values:[
					{
						displayName: 'priceValue',
						name: 'priceValue',
						type: 'number',
						default: '',
					},
					{
						displayName: 'coinValue',
						name: 'coinValue',
						type: 'string',
						default: '',
					},
				],
			},
		],
		displayOptions:{
			show:{
				resource: ['Produto'],
				operation:['create', 'patch'],
			},
		},
	},
	{
		displayName: 'Nome',
		name: 'productNameQuery',
		type: 'string',
		default: '',
		placeholder: 'Digite o nome do produto a pesquisar',
		displayOptions:{
			show:{
				resource: ['Produto'],
				operation:['find', 'patch'],
			},
		},
	},
	{
		displayName: 'File Path',
		name: 'filePath',
		type: 'string',
		default: '',
		placeholder: '/path/image.png',
		displayOptions:{
			show:{
				resource: ['Produto'],
				operation:['create', 'patch'],
			},
		},
	},
	{
		displayName: 'API request',
		name: 'apiRequest',
		type: 'string',
		description: 'This will call .../api/rest/v1/products/{your code here}',
		default: '',
		placeholder: '{your code here}',
		displayOptions:{
			show:{
				resource: ['Produto'],
				operation:['buildCall'],
			},
		},
	},
];



