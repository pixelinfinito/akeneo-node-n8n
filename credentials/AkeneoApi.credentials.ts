import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class AkeneoApi implements ICredentialType {
	name = 'AkeneoApi';
	displayName = 'Akeneo';
	documentationUrl = 'https://test.com';
	properties: INodeProperties[] = [
		{
			displayName: 'User',
			name: 'user',
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
			default: 'http://10.0.7.84:8080',
		}
	];

	authenticate = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{"Bearer " + $credentials.token}}',
			}
		}
	} as IAuthenticateGeneric;

	// The block below tells how this credential can be tested
	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.domain}}',
			url: '',
			body:{
				api_key: '={{$credentials?.api_key}}',
				api_password: '={{$credentials?.api_password}}'
			},
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST'
		},
	};
}
