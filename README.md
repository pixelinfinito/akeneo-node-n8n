![Banner image](https://github.com/pixelinfinito/akeneo-node-n8n/blob/main/nodes/Akeneo/akeneo.svg)

# Akeneo n8n node


## Prerequisites

You need the following installed on your development machine:

* [git](https://git-scm.com/downloads)
* Node.js and npm. Minimum version Node 16. You can find instructions on how to install both using nvm (Node Version Manager) for Linux, Mac, and WSL [here](https://github.com/nvm-sh/nvm). For Windows users, refer to Microsoft's guide to [Install NodeJS on Windows](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows).
* Install n8n with:
	```
	npm install n8n -g
	```
* Recommended: follow n8n's guide to [set up your development environment](https://docs.n8n.io/integrations/creating-nodes/build/node-development-environment/).

## Using on N8N

1. go to N8N settings
2. go to communities nodes
3. install the node with the name of `n8n-nodes-akeneo`
4. example ![Banner image](https://github.com/pixelinfinito/akeneo-node-n8n/blob/main/images/example.png)
 

## Using locally

These are the basic steps for working locally without using the NPM version.

1. Clone the repo:
    ```
    git clone https://github.com/pixelinfinito/akeneo-node-n8n.git
    ```
3. Run `npm i` to install dependencies.
4. in the other terminal navigate to: C:\Users\{user}\AppData\Roaming\npm\node_modules\n8n
5. Run
			```
				npm link n8n-nodes-akeneo
			```
6. To start n8n Run
			```
				n8n start
			```

## More information

Refer to our [documentation on creating nodes](https://docs.n8n.io/integrations/creating-nodes/) for detailed information on building your own nodes.

## License

[MIT](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md)
