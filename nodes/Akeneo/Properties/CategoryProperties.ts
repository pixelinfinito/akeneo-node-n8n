import { INodeProperties } from 'n8n-workflow';

// When the resource `httpVerb` is selected, this `operation` parameter will be shown.
export const CategoryProperties: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'categoryInput',
		type: 'string',
		default: '',
		required: true,
		displayOptions:{
			show:{
				resource: ['Category'],
				categoryAndGroupOperation:['create', 'update', 'delete', 'find'],
			},
		},
	},

	{
		displayName: 'Parent',
		name: 'parentCategory',
		type: 'string',
		default: '',
		displayOptions:{
			show:{
				resource: ['Category'],
				categoryAndGroupOperation:['create'],
			},
		},
	},

	{
		displayName: 'Label de_DE',
		name: 'category_de_DE',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['Category'],
				categoryAndGroupOperation:['create'],
			},
		},
	},
	{
		displayName: 'Label en_US',
		name: 'category_en_US',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['Category'],
				categoryAndGroupOperation:['create'],
			},
		},
	},
	{
		displayName: 'Label fr_FR',
		name: 'category_fr_FR',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['Category'],
				categoryAndGroupOperation:['create'],
			},
		},
	},

];
