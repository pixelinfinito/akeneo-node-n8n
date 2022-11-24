import { INodeProperties } from 'n8n-workflow';

// When the resource `httpVerb` is selected, this `operation` parameter will be shown.
export const FamilyProperties: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'familyNameAdd',
		type: 'string',
		default: '',
		required: true,
		displayOptions:{
			show:{
				resource: ['Family'],
				familyOperation:['create', 'update', 'delete', 'find']
			}
		}
	},
	{
		displayName: 'Attributes',
		name: 'attributes',
		type: 'fixedCollection',
		default: {},
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'attributesShow',
				displayName: 'attributesShow',
				values: [
					{
						displayName: 'attributeValue',
						name: 'attributeValue',
						type: 'string',
						default: '',
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: ['Family'],
				familyOperation:['create']
			}
		},
	},

	{
		displayName: 'Label de_DE',
		name: 'de_DE',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['Family'],
				familyOperation:['create']
			}
		},
	},
	{
		displayName: 'Label en_US',
		name: 'en_US',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['Family'],
				familyOperation:['create']
			}
		},
	},
	{
		displayName: 'Label fr_FR',
		name: 'fr_FR',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['Family'],
				familyOperation:['create']
			}
		},
	},

];
