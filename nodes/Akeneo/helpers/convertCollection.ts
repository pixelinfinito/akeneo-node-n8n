export default function convertCollection(collection:[], key:string){

	const newCollection: any[] = []

	if(collection.length > 0){
		collection.forEach(element => {
			newCollection.push(element[key])
		})
	}

	return newCollection
}
