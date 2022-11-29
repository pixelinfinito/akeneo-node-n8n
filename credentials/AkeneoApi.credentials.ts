import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class AkeneoApi implements ICredentialType {
	displayName = 'AKENEO API';
	name = 'akeneoApi';
	documentationUrl = 'https://github.com/pixelinfinito/akeneo-node-n8n';
	properties: INodeProperties[] = [
		{
			displayName: 'ClientID',
			name: 'clientid',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Secret',
			name: 'secret',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Domínio',
			name: 'domain',
			type: 'string',
			default: process.env.ENV_SERVER_AKENEO,
		},
	];

	authenticate:IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{"Bearer " + $credentials.token}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.domain}}',
			url: '',
			body:{
				api_key: '={{$credentials?.api_key}}',
				api_password: '={{$credentials?.api_password}}',
			},
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		},
	};
}
