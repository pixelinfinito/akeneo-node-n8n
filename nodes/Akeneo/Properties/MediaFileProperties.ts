import { INodeProperties } from 'n8n-workflow';

// When the resource `httpVerb` is selected, this `operation` parameter will be shown.
export const MediaFileProperties: INodeProperties[] = [
	{
		displayName: 'File Name',
		name: 'fileName',
		type: 'string',
		default: '',
		placeholder: 'File name',
		required: true,
		displayOptions:{
			show:{
				resource: ['File'],
				otherOperation:['find']
			}
		}
	},
];



