import { INodeProperties } from 'n8n-workflow';

export const LocaleProprties: INodeProperties[] = [
	{
		displayName: 'Locale',
		name: 'localeInput',
		type: 'options',
		default: 'en_US',
		required: true,
		options:[
			{
				name: 'de_DE',
				value: 'de_DE',
			},
			{
				name: 'en_US',
				value: 'en_US',
			},
			{
				name: 'fr_FR',
				value: 'fr_FR',
			},
		],
		displayOptions:{
			show:{
				resource: ['Locale'],
				operation:['find'],
			},
		},
	},
];
