import * as akeneoRequest from "./akeneoRequest";
import {changeToList} from "./changeToList";

export async function paginateResponse(url: string, token: any) {
	let akeneoItems: any[] = [];
	let response;
	let next = url;
	do {
		response = await akeneoRequest.GET({
			token: token.access_token,
			url: next,
		});
		if (response._links.next !== undefined) {
			next = response._links.next.href;
		}
		akeneoItems = akeneoItems.concat(response._embedded.items);
	}
	while (response._links.next !== undefined);

	return changeToList(akeneoItems);
}
