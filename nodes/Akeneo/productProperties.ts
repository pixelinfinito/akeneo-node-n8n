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
				operation:['create', 'edit']
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
		displayName: 'Nome',
		name: 'productNameQuery',
		type: 'string',
		default: '',
		placeholder: 'Digite o nome do produto a pesquisar',
		displayOptions:{
			show:{
				resource: ['Produto'],
				operation:['find']
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
				operation:['find', 'delete', 'edit']
			}
		}
	},
];



