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
				operation:['create', 'update']
			}
		}
	},
	{
		displayName: 'Family',
		name: 'family',
		type: 'string',
		default: '',
		displayOptions:{
			show:{
				resource: ['Produto'],
				operation:['create']
			}
		}
	},
	{
		displayName: 'Parent',
		name: 'parent',
		type: 'string',
		default: '',
		displayOptions:{
			show:{
				resource: ['Produto'],
				operation:['create']
			}
		}
	},
	{
		displayName: 'Enabled',
		name: 'enabled',
		type: 'boolean',
		default: true,
		displayOptions:{
			show:{
				resource: ['Produto'],
				operation:['create']
			}
		}
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
				]
			},
		],
		displayOptions:{
			show:{
				resource: ['Produto'],
				operation:['create']
			}
		}
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
				]
			},
		],
		displayOptions:{
			show:{
				resource: ['Produto'],
				operation:['create']
			}
		}
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
				]
			},
		],
		displayOptions:{
			show:{
				resource: ['Produto'],
				operation:['create']
			}
		}
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
				operation:['find', 'delete']
			}
		}
	},

	{
		displayName: 'ID',
		name: 'productID',
		type: 'number',
		default: '',
		displayOptions:{
			show:{
				resource: ['Produto'],
				operation:['update']
			}
		}
	},
];



