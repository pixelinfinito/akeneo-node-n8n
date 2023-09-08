import {IDataObject, INodeExecutionData} from "n8n-workflow";

export function changeToList(data: any[]): INodeExecutionData[] {
	const out: INodeExecutionData[] = [];
	if(data) {
		data.forEach((item: object) => {
			out.push(<INodeExecutionData>{json: item});
		});
	}
	return out;
}
