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
				name: 'Category',
				value: 'Category',
			},
			{
				name: 'Family',
				value: 'Family',
			},
			{
				name: 'File',
				value: 'File',
			},
			{
				name: 'Locale',
				value: 'Locale',
			},
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
		default: 'find',
		required: true,
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a produto',
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a produto',
			},
			{
				name: 'Find All',
				value: 'findAll',
				action: 'Find all a produto',
			},
			{
				name: 'FindOne',
				value: 'find',
				action: 'Find one a produto',
			},
			{
				name: 'Patch',
				value: 'patch',
				action: 'Patch a produto',
			},
			{
				name: 'Build Call',
				value: 'buildCall',
				action: 'Build your own call',
			},
		],
		displayOptions:{
			show:{
				resource: ['Produto'],
			},
		},
	},
	{
		displayName: 'Operação',
		name: 'otherOperation',
		type: 'options',
		noDataExpression: true,
		default: 'find',
		required: true,
		options: [
			{
				name: 'Find All',
				value: 'findAll',
			},
			{
				name: 'FindOne',
				value: 'find',
			},
		],
		displayOptions:{
			show:{
				resource: ['File', 'Locale'],
			},
		},
	},
	{
		displayName: 'Operação',
		name: 'categoryAndGroupOperation',
		type: 'options',
		noDataExpression: true,
		default: 'find',
		required: true,
		options: [
			{
				name: 'Find All',
				value: 'findAll',
			},
			{
				name: 'FindOne',
				value: 'find',
			},
			{
				name: 'Create',
				value: 'create',
			},
		],
		displayOptions:{
			show:{
				resource: ['Category', 'Group'],
			},
		},
	},

	{
		displayName: 'Operação',
		name: 'familyOperation',
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
				name: 'Find All',
				value: 'findAll',
			},
			{
				name: 'FindOne',
				value: 'find',
			},
		],
		displayOptions:{
			show:{
				resource: ['Family'],
			},
		},
	},

];
