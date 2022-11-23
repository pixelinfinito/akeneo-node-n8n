import { INodeProperties } from 'n8n-workflow';

// When the resource `httpVerb` is selected, this `operation` parameter will be shown.
export const AkeneoProperties: INodeProperties[] = [

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
			{
				name: 'Locale',
				value: 'Locale',
			},
			{
				name: 'File',
				value: 'File',
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
				name: 'Create',
				value: 'create',
			},
			{
				name: 'Delete',
				value: 'delete',
			},
			{
				name: 'Find All',
				value: 'findAll',
			},
			{
				name: 'FindOne',
				value: 'find',
			},
			{
				name: 'Update',
				value: 'update',
				displayOptions:{
					show:{
						resource: ['Produto']
					}
				}
			},
		],
	},

];



