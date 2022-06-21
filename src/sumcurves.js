import { graph } from './graph';

const sumcurves = {};
sumcurves.curves = [];
sumcurves.number = {8321:1,8322:2,8323:3,8324:4,8325:5,8326:6,8327:7,8328:8,8329:9};
sumcurves.visibility = false;

function sumchange(){
	if(document.getElementById("slidersum").checked){
		sumcurves.visibility = true;
	}else{
		Object.keys(graph.data.states).forEach((key) => {
			graph.curves[key].showElement();
			document.getElementById("check" + key).checked = true;
		});
	}
}

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
		Yarray = graph.curves[key].dataY.slice(); //Problem with Yarray = graph.curves[key].dataY
		if(key != 'n'){
			Object.keys(graph.data.states).forEach((keytest) => {
				if(keytest != 'n'){
					if(getDifference(graph.states[key].name,graph.states[keytest].name).charCodeAt(0) in sumcurves.number){
						//document.getElementById("check"+keytest).checked = false;
						if (sumcurves.visibility) {
							graph.curves[keytest].hideElement();
							document.getElementById("check" + keytest).checked = false;
						}
						sumkeyarray.push(keytest);
						sum = true;
						for (let j = 0; j < Yarray.length; j++) {
							Yarray[j] += graph.curves[keytest].dataY[j];
						}
					}
				}
			})
			if(sum){
					if(sumcurves.visibility){
						graph.curves[key].hideElement();
						document.getElementById("check" + key).checked = false;
					}
				  let sumkey = key + "sum"
					sumcurves.curves[sumkey] = graph.board.create('curve', [graph.curves['n'].dataX , Yarray], {
					strokeColor: graph.colors[graph.statesMap[key]],
					name: '' + sumkey + '(t)',
					strokeWidth:2,
					highlight: false,
				});
			}
		}
	});
	sumcurves.visibility = false;
	graph.board.update();
}

export {createsumcurve, sumchange}