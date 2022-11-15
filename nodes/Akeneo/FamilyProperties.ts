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
				operation:['create', 'edit', 'delete', 'find']
			}
		}
	},
];



