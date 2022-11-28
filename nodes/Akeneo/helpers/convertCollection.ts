export function convertCollection(collection:[], key:string){

	const newCollection: [] = [];
	if(collection.length > 0){
		collection.forEach(element => {
			newCollection.push(element[key]);
		});
	}

	return newCollection;
}
