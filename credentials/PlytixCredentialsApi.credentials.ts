import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class PlytixCredentialsApi implements ICredentialType {
	name = 'PlytixCredentialsApi';
	displayName = 'PlytixCredentialsApi';
	documentationUrl = 'https://test.com';
	properties: INodeProperties[] = [
		{
			displayName: 'API KEY',
			name: 'api_key',
			type: 'string',
			default: '',
		},
		{
			displayName: 'API PASSWORD',
			name: 'api_password',
			type: 'string',
			default: '',
		},
		{
			displayName: 'token',
			name: 'token',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Dominio',
			name: 'domain',
			type: 'string',
			default: 'https://auth.plytix.com/auth/api',
		}

	];

	// This allows the credential to be used by other parts of n8n
	// stating how this credential is injected as part of the request
	// An example is the Http Request node that can make generic calls
	// reusing this credential
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

//={{$credentials.data.api_key}}
