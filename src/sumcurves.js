import { graph } from './graph';

const sumcurves = {};
sumcurves.curves = [];
sumcurves.number = {8321:1,8322:2,8323:3,8324:4,8325:5,8326:6,8327:7,8328:8,8329:9};


function getDifference(a, b){
	var i = 0;
	var j = 0;
	var result = "";
	while (j < b.length)
	{
	 if (a[i] != b[j] || i == a.length)
			 result += b[j];
	 else
			 i++;
	 j++;
	}
	return result;
}

function createsumcurve(){
	Object.values(sumcurves.curves).forEach((value) =>{
		graph.board.removeObject(value);
	})
	if(!document.getElementById("slidersum").checked)return;
	let Yarray = [];
	let sumkeyarray = [];
	let sum = false;
	Object.keys(graph.data.states).forEach((key) => {
		sum = false;
		if(sumkeyarray.includes(key)) return;
		//in the case that there are names that only differ in a number, we create the sumcurve
		Yarray = graph.curves[key].dataY;
		if(key != 'n'){
			Object.keys(graph.data.states).forEach((keytest) => {
				if(keytest != 'n'){
					//console.log(getDifference(graph.states[key].name,graph.states[keytest].name).charCodeAt(0));
					if(getDifference(graph.states[key].name,graph.states[keytest].name).charCodeAt(0) in sumcurves.number){
						sumkeyarray.push(keytest);
						sum = true;
						for (let j = 0; j < Yarray.length; j++) {
							Yarray[j] += graph.curves[keytest].dataY[j];
						}
					}
				}
			})
			if(sum){
					sumcurves.curves[key + "sum"] = graph.board.create('curve', [graph.curves[key].dataX , Yarray], {
					strokeColor: graph.colors[graph.statesMap[key]],
					name: '' + key + 'sum' + '(t)',
					highlight: false,
				});
			}
		}
	});
}

export {createsumcurve}