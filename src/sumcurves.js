import { graph } from './graph';

const sumcurves = {};
sumcurves.curves = [];
sumcurves.number = {8321:1,8322:2,8323:3,8324:4,8325:5,8326:6,8327:7,8328:8,8329:9};
sumcurves.visibility = false;
sumcurves.usercurves = [];
sumcurves.userarray = [];

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

// we want to check if the name of two states first differ by a number 
// therefore we use this functin later
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

//----------------------------------
// from now: part with user input

function usersumchange(update){ // eventlistener for the slider 
	if(document.getElementById("usersum").checked && update){
		usercreatesumcurve();
	}
	if(document.getElementById("usersum").checked && !update){
		userbuildsumcurves(sumcurves.userarray,false);
	}
	if(!document.getElementById("usersum").checked && update){
		Object.values(sumcurves.usercurves).forEach((value) =>{
			graph.board.removeObject(value);
		})
		sumcurves.usercurves = [];
		sumcurves.userarray = [];
		Object.keys(graph.data.states).forEach((key) => {
			graph.curves[key].showElement();
			document.getElementById("check" + key).checked = true;
		});
	}
}

// called when there is an update of the slider
// creates new window for the user input
function usercreatesumcurve(){
	const bb = graph.board.getBoundingBox();
	let userinputvalue = 0;
	let input = graph.board.create('text',
	[(bb[2] + bb[0]) / 2.5,
	(bb[1] + bb[3]) / 2,
	'<div id = "usersuminput"><p>How many sumcurves should be plotted?</p><br><input type ="number" id="sumvalue" value="1" min="1"><br><br>'+
	'<button id="usersuminputaccept">Accept</button>&nbsp&nbsp<button id="usersuminputcancel">Cancel</button></div>'
	],
	{ fixed: true, highlight: false },);				
	document.getElementById("usersuminputaccept").addEventListener("click", function(){
		userinputvalue = document.getElementById("sumvalue").value;
		graph.board.removeObject(input);
		selectsumcurves(userinputvalue); // number, how many sumcurves should be plotted
	})
	document.getElementById("usersuminputcancel").addEventListener("click", function(){
		graph.board.removeObject(input);
		document.getElementById('usersum').checked = false;
	})
}

function selectsumcurves(number){ // main part of the user input
	let selectstring = '<div id="sumcurveselect">';
	let liststring = '<option value = "none">"None"</option>';
	Object.keys(graph.states).forEach((key) => {  // list all the states
		liststring += '<option value =';
		liststring +=	key;
		liststring +=	'>';
		liststring +=	graph.states[key].name;
		liststring +=	'</option>';
	})
	for (let i = 0; i < number; i++) { // we need #number of sumcurves and there the user can click which states should be sumed
	
		selectstring += '<div id="select';
		selectstring += i;
		selectstring += '"><p>Sum ';
		selectstring += i;
		selectstring += '</p>'
		Object.keys(graph.states).forEach((key) => {
			selectstring += '<select id="'
			selectstring += i;
			selectstring += key;
			selectstring += '">';
			selectstring += liststring;
			selectstring += '</select>';
		})
		selectstring += '</div>';
		selectstring += '<br>'
	}
	selectstring += '<button id="usersuminputaccept2">Accept</button>&nbsp&nbsp<button id="usersuminputcancel2">Cancel</button>'
	selectstring += '</div>';
	const bb = graph.board.getBoundingBox();
	let input = graph.board.create('text',
	[(bb[2] + bb[0]) / 2.5,
	(bb[1] + bb[3]) / 2,
	selectstring
	],
	{ fixed: true, highlight: false },);
	document.getElementById("usersuminputaccept2").addEventListener("click", function(){
		sumcurves.userarray = [];
		for (let i = 0; i < number; i++) {
			let temparray = [];
			let name = "select" + i;
			let select = document.getElementById(name).querySelectorAll("select")
			for (let i=0;i<select.length;i++) {
				let choice = select[i];
				if(choice.value !== "none"){
					temparray.push(choice.value);
				}
			}
			sumcurves.userarray.push(temparray);
		}
		graph.board.removeObject(input);
		userbuildsumcurves(sumcurves.userarray,true);
	})
	document.getElementById("usersuminputcancel2").addEventListener("click", function(){
		graph.board.removeObject(input);
		document.getElementById('usersum').checked = false;
	})
}

function userbuildsumcurves(sumarray,visible){
	Object.values(sumcurves.usercurves).forEach((value) =>{ // remove old curves
		graph.board.removeObject(value);
	})
	for (let i = 0; i < sumarray.length; i++) {
		let Yarray = new Array(graph.curves['n'].dataY.length).fill(0);
		for (let j = 0; j < sumarray[i].length; j++) {
			if(visible){
				graph.curves[sumarray[i][j]].hideElement();
				document.getElementById("check" + sumarray[i][j]).checked = false;
			}
			for (let n = 0; n < Yarray.length; n++) {
				Yarray[n] += graph.curves[sumarray[i][j]].dataY[n];
			}	
		}
		let sumkey = sumarray[i][0] + "sum"+i;// add number i just to avoid, that two curves have the same id
		sumcurves.usercurves[sumkey] = graph.board.create('curve', [graph.curves['n'].dataX , Yarray], {
		strokeColor: graph.colors[graph.statesMap[sumarray[i][0]]],
		name: '' + sumkey + '(t)',
		strokeWidth:2,
		highlight: false,
		});
	}
}

export {createsumcurve, sumchange, usersumchange}