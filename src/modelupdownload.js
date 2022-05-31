/*
 * modelupdownload
 *  
 * gives the possibility to download your model
 * as .txt file (syntax of the file explained below)
 * 
 * gives the possibility to upload your model-file
 * to continue working on it
 */

import stAct from './fsm/Graph/StateActions'; // create uploaded states
import trAct from './fsm/Graph/TransitionActions'; // create uploaded transitions
import spaAct from './fsm/Graph/SpecialArrowActions';// create uploaded specialarrows
import State from './fsm/Graph/State'; // create uploaded states
import shapes from './fsm/Graph/Shapes'; // used to create the download data
import fsmCSS from './fsm/Graph/Graph'; // used to create the download data
import { graph } from './graph'; // download and upload the states, rates, intervention data
import ode from './ode'; // used to create the dataset 
import symbols from './fsm/Constants/Symbols';
import SpecialState from "./fsm/Graph/SpecialStates";
import Transition from "./fsm/Graph/Transition"

/* syntax of the download-file:
the file contains a header: Epidemic-Model-Data
followed by a newline and the state information
followed by a newline and the transition information
followed by a newline and the specialArrow with type 'in' information
followed by a newline and the specialArrow with type 'out' information
followed by a newline and the interverntion information
followed by a newline and the interverntion value for each rate*/

/* Epidemic-Model-Data
 * states: stateID(statecoordinates),stateValue,stateName;...,...,...;...:
 * transitions are splitted in the transition name, the stateID of the 
 * source state and the stateID of the target state:
 * syntax of the transition name: ratename-...-(stateID)-...-+-...,
 * specialArrowIN: ratename, target stateID;....:
 * specialArrowOUT: ratename, source stateID;....:
 * interventions: intervention name-intervention value,....:
 * interventions value: ratename, interventinname, ratevalue;....;...:
*/
//Example for the classic SIR-Model:
/*
Epidemic-Model-Data
s0(40,40),1000,119878;s1(140,40),0,119868;s2(240,40),0,119877:
120573-(s1),s0,s1;120574,s1,s2:
:
:
t0-0:
120573,t0,0.3;120574,t0,0.2:
*/


// called by index.js 
// when a file is uploaded inituploadmodel is called
function inituploadmodel() {
	if(shapes.generateFreeID('s') !== 's1'){ // ckeck if there is already a model running
		alert('There is an acitve model running! \nPlease refresh the website before the upload.');
		document.getElementById('uploadmodel').style.backgroundColor = 'red';
		return;
	}
	const file = document.getElementById('uploadmodel').files[0];
	const textType = /text.*/;
	if(file.type.match(textType)) {
		const reader = new FileReader();
		reader.onload = function(e) {
			generate(reader.result); // main function for the upload
	}
		reader.readAsText(file);
	} else {alert('Error with your datatype');}
}
// we read the uploaded data from the input
function generate(input){
	var i = 0; // main iterator
	var coordx; // coordinates of the state
	var coordy;
	var name; // name of the state
	var temp; // used to read the name of the state
	var id; 
	var value;
	var testid = 's1';
	var first = true; // special treatment for the first input state
	var cstate = ''; // save information about the specialstates
	var ctransition = ''; // save information about the specialtransitions
	const verify = input.slice(0,19); // make sure that we got a suitable file
	if(verify === 'Epidemic-Model-Data'){
	i=20;
	// read the state data
	while(input[i]!==':'){
		name =[];
		coordx =0;
		coordy =0;
		temp ='';
		id = '';
		value = '';
		cstate = '';
		while(input[i]!== '('){ // read the id of the state
			switch (input[i]) {
				case 'm':
					i = i + 10;
					cstate = 'm';
					break;
				case 'l':
					i = i + 10;
					cstate = 'l';
					break;
				case 'r':
					i = i+11;
					cstate = 'r';
				default:
					break;
			}
			id += input[i];
			i++;
		}
		i++;
		while(input[i]!== ','){ // read the xcoord of the state
			coordx += input[i];
			i++;
		}
		coordx = parseInt(coordx);
		i++;
		while(input[i]!== ')'){ // read the ycoord of the state
			coordy += input[i];
			i++;
		}
		coordy = parseInt(coordy);
		i++;
		i++;
		while(input[i]!== ','){ // read the value of the state
			value += input[i];
			i++;
		}
		value = parseFloat(value);
		i++;
		while(input[i]!==';'&&input[i]!==':'){ // read the name of the state
			temp += input[i];
			i++;
			if(input[i] ===','){
				name.push(parseInt(temp));
				temp ='';
				i++;
			}
		}
		name.push(parseInt(temp))
		// speacial treatment for the first state: since per default there is always the state with id s0
		// so we can just modify this state for the first uploaded state
		if(first){ 
			var j = 0; // iterator for the name
			first = false; // job done for the first state
			const defaultstate = shapes.getShape('s0'); 
			fsmCSS.systemStateActivate('sr',defaultstate); // activate the state with id s0 
			fsmCSS.activeShape.move(coordx,coordy); // move to the uploaded coordinates
			stAct.nameRemoveToken(); // reset the name
			while(j < name.length){
				stAct.stateName(name[j]);
				j++;
			}
			fsmCSS.activeShape.deactivate(); // deactivate the state 's0'
			fsmCSS.systemStateActivate('i');
			shapes.draw();// draw the changes
			fsmCSS.callback(shapes.shMap);
			// state value
			graph.data.states = {};
			graph.data.states.s0 = {};
			graph.data.states.s0.name = 'S';
			graph.data.states.s0.value = value;
			graph.data.interventions = {};
			graph.data.interventions.t0 = 0;
			graph.data.rates = {};
			// init the capacity states value
			graph.data.capacitystates = {}
		}else{
		while(id!==testid){
			testid = shapes.generateFreeID('s');
		}
		var st;
		if(cstate === 'm'){
			st = new SpecialState(id, coordx,coordy, 'special', 100)
		}else{
			st = new State(id, coordx, coordy);
		}
		shapes.addShape(id, st);
		var j = 0;
		while(j < name.length){
		st.nameAddChr(name[j]);
		j++;
		}	
		switch (cstate) { // specialstate treatment
			case 'l':
				st.capacitystate = 'left';
				st.lineWidth = 2;
				break;
			case 'r':
				st.capacitystate = 'right';
				st.lineWidth = 0.5;
			default:
				break;
		}
		shapes.draw();
		fsmCSS.callback(shapes.shMap);
		// state value
		graph.data.states[id] = {};
		graph.data.states[id].name = st.name;
		graph.data.states[id].value = value;
		if(cstate === 'm'){//adding max capacity to the main state
			graph.data.capacitystates[id] = {};
			graph.data.capacitystates[id].name = st.name;
			graph.data.capacitystates[id].value = value;
		}
		}
		if(input[i] !== ':'){
			i++;
		}
	}
	// transition data
	i += 2; // skip the ':' and the newline
	var source='';
	var target='';
	name=[];
	temp = '';
	while(input[i]!==';' && input[i] !== ':'){
		ctransition = '';
		if(input[i] === 'l'){
			i += 15;
			ctransition = 'left';
		}
		if(input[i] === 'r'){
			i += 16;
			ctransition = 'right';
		}
		source=''; 
		target='';
		name=[];
		temp = '';
		while(input[i]!==','){
			temp = '';
			while(input[i] !== '-' && input[i] !== ','){
				temp += input[i];
				i++;
			}
			switch (temp[0]){
				case '(' :
					temp = temp.substring(1,temp.length-1);
					name.push('(');
					name.push(temp);
					name.push(')');
					break;
				case '+':
					name.push('+');
					break;
				default:
					name.push(temp);
					break;
			}
			if(input[i] !== ','){i++;}
		}
		name.push(',');
		temp ='';
		i++;
		while(input[i]!== ','){
			temp += input[i];
			i++;
		}
		source += temp;
		source = shapes.getShape(source);
		i++;
		temp ='';
		while(input[i]!== ';'&&input[i]!== ':'){
			temp += input[i];
			i++;
		}
		target += temp;
		target = shapes.getShape(target);
		var transition;
		if(ctransition === 'left'){
			const idtransitionleft = shapes.generateFreeID('t');
			transition = new Transition(idtransitionleft, source, target);
			transition.capacitystate = 'left'; // add attribut to preserve special treatment in the odes
			transition.lineWidth = 2;
			shapes.addShape(idtransitionleft, transition);
		}else if(ctransition === 'right'){
			const idtransitionright = shapes.generateFreeID('t');
			transition = new Transition(idtransitionright, source, target);
			transition.capacitystate = 'right'; // add attribut to preserve special treatment in the odes
			transition.lineWidth = 0.5;
			shapes.addShape(idtransitionright, transition);
		}else{
			transition = trAct.transitionCreate(source,target); 
		}
		fsmCSS.systemStateActivate('tr', transition);
		// create the name of the transition
		var j =0;
		while(name[j]!==','){
			var s ='';
			switch (name[j]) {
				case '+':
					fsmCSS.activeShape.nameAddToken('o', 65291);
					j++;
					break;
				case '(':
					j++;
					while(name[j]!==')'){
						s+= name[j];
						j++;
					}
					s = shapes.getShape(s);
					fsmCSS.activeShape.nameAddToken('s', s);
					j++;
					break;
				default:
					fsmCSS.activeShape.nameAddToken('r', parseInt(name[j]));
					j++;
					break;
			}
		}
		fsmCSS.activeShape.deactivate();
		fsmCSS.systemStateActivate('i');
		shapes.draw();
		fsmCSS.callback(shapes.shMap);
		if(input[i] !== ':'){
			i++;
		}
	}
  // special arrow data 'in'
	i += 2;
	var source='';
	var target='';
	name=[];
	temp = '';
	while(input[i]!==';' && input[i] !== ':'){
		source=''; 
		target='';
		name=[];
		temp = '';
		while(input[i]!==','){
			temp = '';
			while(input[i] !== '-' && input[i] !== ','){
				temp += input[i];
				i++;
			}
			switch (temp[0]){
				case '(' :
					temp = temp.substring(1,temp.length-1);
					name.push('(');
					name.push(temp);
					name.push(')');
					break;
				case '+':
					name.push('+');
					break;
				default:
					name.push(temp);
					break;
			}
			if(input[i] !== ','){i++;}
		}
		name.push(',');
		i++;
		temp ='';
		while(input[i]!== ';'&&input[i]!== ':'){
			temp += input[i];
			i++;
		}
		target += temp;
		target = shapes.getShape(target);

		fsmCSS.systemStateActivate('t',target);
		spaAct.specialArrowCreate('in');
		// create the name of the specialarrow
		var j =0;
		while(name[j]!==','){
			var s ='';
			switch (name[j]) {
				case '+':
					fsmCSS.activeShape.nameAddToken('o', 65291);
					j++;
					break;
				case '(':
					j++;
					while(name[j]!==')'){
						s+= name[j];
						j++;
					}
					s = shapes.getShape(s);
					fsmCSS.activeShape.nameAddToken('s', s);
					j++;
					break;
				default:
					fsmCSS.activeShape.nameAddToken('r', parseInt(name[j]));
					j++;
					break;
			}
		}
		fsmCSS.activeShape.deactivate();
		fsmCSS.systemStateActivate('i');
		shapes.draw();
		fsmCSS.callback(shapes.shMap);
		if(input[i] !== ':'){
			i++;
		}		
	}
	// special arrow data 'out'
	i += 2;
	var source='';
	var target='';
	name=[];
	temp = '';
	while(input[i]!==';' && input[i] !== ':'){
		source=''; 
		target='';
		name=[];
		temp = '';
		while(input[i]!==','){
			temp = '';
			while(input[i] !== '-' && input[i] !== ','){
				temp += input[i];
				i++;
			}
			switch (temp[0]){
				case '(' :
					temp = temp.substring(1,temp.length-1);
					name.push('(');
					name.push(temp);
					name.push(')');
					break;
				case '+':
					name.push('+');
					break;
				default:
					name.push(temp);
					break;
			}
			if(input[i] !== ','){i++;}
		}
		name.push(',');
		i++;
		temp ='';
		while(input[i]!== ';'&&input[i]!== ':'){
			temp += input[i];
			i++;
		}
		source += temp;
		source = shapes.getShape(source);

		fsmCSS.systemStateActivate('t',source);
		spaAct.specialArrowCreate('out');
		// create the name of the specialarrow
		var j =0;
		while(name[j]!==','){
			var s ='';
			switch (name[j]) {
				case '+':
					fsmCSS.activeShape.nameAddToken('o', 65291);
					j++;
					break;
				case '(':
					j++;
					while(name[j]!==')'){
						s+= name[j];
						j++;
					}
					s = shapes.getShape(s);
					fsmCSS.activeShape.nameAddToken('s', s);
					j++;
					break;
				default:
					fsmCSS.activeShape.nameAddToken('r', parseInt(name[j]));
					j++;
					break;
			}
		}
		fsmCSS.activeShape.deactivate();
		fsmCSS.systemStateActivate('i');
		shapes.draw();
		fsmCSS.callback(shapes.shMap);
		if(input[i] !== ':'){
			i++;
		}		
	}
	// load the intervention value
	i += 2;
	var intervention;
	var interventionvalue;
	while(input[i] !== ':'){
		intervention = '';
		interventionvalue = '';
		while(input[i] !== '-'){
			intervention += input[i];
			i++;
		}
		i++;
		while(input[i] !== ',' && input[i] !== ':'){
			interventionvalue += input[i];
			i++;
		}
		interventionvalue = parseFloat(interventionvalue);
		if(input[i] !== ':'){
			i++;
		}
		graph.data.interventions[intervention] = interventionvalue;
	}
	// load the rates value according to the intervention
	i += 2;
	var rateName;
	var ratevalue;
	while(input[i] !== ':'){
		rateName = '';
		intervention = '';
		ratevalue = '';
		while(input[i] !== ','){
			rateName += input[i];
			i++;
		}
		rateName = String.fromCodePoint(rateName);
		i++;
		while(input[i] !== ','){
			intervention += input[i];
			i++;
		}
		i++;
		while(input[i] !== ':' && input[i] !== ';'){
			ratevalue += input[i];
			i++;
		}
		ratevalue = parseFloat(ratevalue);
		if(input[i] !== ':'){
			i++;
		}
		if(graph.data.rates[rateName] === undefined){
			graph.data.rates[rateName] = {};
		}
		graph.data.rates[rateName][intervention] = ratevalue;
	}
	graph.load();
	// green sign for correct upload and upload is finished
	document.getElementById('uploadmodel').style.backgroundColor = 'lightgreen';
	// since graph.load() change some settings, we regain the view of the Upload/Download tab
	$('#fsmID').hide();
	$('#odeID').hide();
	$('#inID').hide();
	$('#plotID').hide();
	$('#tab2ID').hide();
	$('#statesID').hide();
	$('#cstatesID').hide();
	$('#ratesID').hide();
	$('#tab3ID').hide();
	$('#GraphButtons').hide();
	$('#downloaduploadID').show();
	$('#helpID').hide();
	$('#Simulator').removeClass('active');
	$('#Designer').removeClass('active');
	$('#UploadDownload').addClass('active');
	}else{
	alert('wrong data input')
	}
}
//---------------------------

//function to create the download
// called by the function downloadmodel()
function downloaddata(data, filename, type) {
	var file = new Blob([data], {type: type});
	if (window.navigator.msSaveOrOpenBlob) // IE10+
			window.navigator.msSaveOrOpenBlob(file, filename);
	else { // Others
			var a = document.createElement("a"),
							url = URL.createObjectURL(file);
			a.href = url;
			a.download = filename;
			document.body.appendChild(a);
			a.click();
			setTimeout(function() {
					document.body.removeChild(a);
					window.URL.revokeObjectURL(url);  
			}, 0); 
	}
}
// main function to create the download output text
// i.e. create the text for the download file
function downloadmodel() {
	var text = 'Epidemic-Model-Data\n';
	var filename = 'EMD-download.txt';
	var type = /text.*/;
	var shID,sh,shType;
	// for each state save the ID, the value and the name
	for([shID, sh] of shapes.shMap) {
		shType = shID.substring(0,1);
		if(shType === 's'){
			if(sh.max !== undefined){text += "maincstate"};
			if(sh.capacitystate === "left"){text+="leftcstate"};
			if(sh.capacitystate === "right"){text+="rightcstate"};
			text += shID; // save the stateID
			text += '(' 	// save the position
			text += sh.x;
			text += ','
			text += sh.y;
			text += ')'
			text += ',';
			// it is possible that the user has not yet entered 'The Simulation'
			// therefore, if graph data was not yet initialized, we simply pick 0 as default
			if(graph.states[shID] !== undefined || (sh.max != undefined && graph.capacitystates[shID] !== undefined)){ 
				if(sh.max !== undefined){ // for mainstates here we safe the max value, in consistency with the upload 
					text += graph.capacitystates[shID].getValue();
				}else{
					text += graph.states[shID].getValue();
				}
			}else{
				if(sh.max !== undefined){ // for mainstates here we safe the max value, in consistency with the upload 
					text += '100';
				}else{
					text += '0';
				}
			}
			text += ',';
			text += sh.nameArr; // save the state name
			text += ';';
		}
	}
	text = text.substring(0,text.length - 1);
	text += ':';
	text += '\n';
	// for each transition save the name and the source(target) stateID
	for([shID, sh] of shapes.shMap){
		shType = shID.substring(0,1);
		//first transition then special arrows
		if(shType === 't' && sh.type === undefined){
			if(sh.capacitystate === 'left'){text += 'leftctransition';}
			if(sh.capacitystate === 'right'){text += 'rightctransition';}
			for(let m = 0; m < sh.nameArr.length; m++){
				switch (sh.nameArr[m][0]) {
					case 'r':
						text += sh.nameArr[m][1];
						text += '-';
						break;
					case 's':
						text += '(';
						text += sh.nameArr[m][1].id;
						text += ')';
						text += '-'
						break;
					case 'o':
						text += '+';
						text += '-'
						break;
					default:
						break;
					
				}
			}
			text = text.substring(0,text.length - 1);
			text += ',';
			text += sh.source.id;
			text+= ',';
			text += sh.target.id;
			text += ';';
		}
	}
	if(text.charAt(text.length-1)!== ':' && text.charAt(text.length-1)!== '\n'){
		text = text.substring(0,text.length - 1);
		text += ':';
	}else{
		text += ':';
	}
	text += '\n';
	// for each specialArrow type 'in' save the name and the target stateID
	for([shID, sh] of shapes.shMap){
		shType = shID.substring(0,1);
		//special arrows 'in'
		if(shType === 't' && sh.type === 'in'){
			for(let m = 0; m < sh.nameArr.length; m++){
				switch (sh.nameArr[m][0]) {
					case 'r':
						text += sh.nameArr[m][1];
						text += '-';
						break;
					case 's':
						text += '(';
						text += sh.nameArr[m][1].id;
						text += ')';
						text += '-'
						break;
					case 'o':
						text += '+';
						text += '-'
						break;
					default:
						break;
					
				}
			}
			text = text.substring(0,text.length - 1);
			text += ',';
			text += sh.target.id;
			text += ';';
		}
	}
	if(text.charAt(text.length-1)!== ':' && text.charAt(text.length-1)!== '\n'){
		text = text.substring(0,text.length - 1);
		text += ':';
	}else{
		text += ':';
	}
	text += '\n';
	// for each specialArrow type 'out' save the name and the source stateID
	for([shID, sh] of shapes.shMap){
		shType = shID.substring(0,1);
		//special arrows 'out'
		if(shType === 't' && sh.type === 'out'){
			for(let m = 0; m < sh.nameArr.length; m++){
				switch (sh.nameArr[m][0]) {
					case 'r':
						text += sh.nameArr[m][1];
						text += '-';
						break;
					case 's':
						text += '(';
						text += sh.nameArr[m][1].id;
						text += ')';
						text += '-'
						break;
					case 'o':
						text += '+';
						text += '-'
						break;
					default:
						break;
					
				}
			}
			text = text.substring(0,text.length - 1);
			text += ',';
			text += sh.source.id;
			text += ';';
		}
	}
	if(text.charAt(text.length-1)!== ':' && text.charAt(text.length-1)!== '\n'){
		text = text.substring(0,text.length - 1);
		text += ':';
	}else{
		text += ':';
	}
	text += '\n';
// for each intervention save the intervention name and the value
	Object.keys(graph.interventions).forEach((intervention) => {
		text += intervention;
		text += '-'
		text += graph.interventions[intervention].getValue();
		text += ','
	});
	if(text.charAt(text.length-1)!== ':' && text.charAt(text.length-1)!== '\n'){
		text = text.substring(0,text.length - 1);
		text += ':';
	}else{
		text += ':';
	}
	text += '\n';
	// for each rate save the value for each intervention
	Object.keys(graph.rates).forEach((key) => {
		Object.keys(graph.interventions).forEach((intervention) => {
			text += key.codePointAt(0);
			text += ',';
			text += intervention;
			text += ',';
			text += graph.rates[key][intervention].getValue();
			text += ';';
		});
	});
	if(text.charAt(text.length-1)!== ':' && text.charAt(text.length-1)!== '\n'){
		text = text.substring(0,text.length - 1);
		text += ':';
	}else{
		text += ':';
	}
	// start the download
	downloaddata(text,filename,type);
}

// download data as csv
function downloaddatacsv(){
 const data = ode();
 var text = 'population,';
 var filename = 'EMD-data.csv';
 var type = /text.*/;
 var time;
 var shID;
 var sh;
 for([shID, sh] of shapes.shMap){
		const shType = shID.substring(0,1);
		if(shType === 's'){
			for (let i = 0; i < sh.name.length; i++) {
				let namepoint = sh.name.codePointAt(i)
				Object.keys(symbols.L.C).forEach((key) => {
					if(symbols.L.C[key] === namepoint){
						text += key;
					}
					if(symbols.L.S[key] === namepoint){
						text += key.toLowerCase();
					}
				})
			}
			text += ',';
		}
	}
	text += '\n';
 for (let i = 0; i < data.length; i++) {
	 	var time = data[i].pop();
	 	if(Number.isInteger(time)){
			text += data[i];
			text += ',';
			text += '\n';
	 	}
 }
 downloaddata(text,filename,type);
}
//called by fitting request, when user has selected compartment to fit
function downloadmodeljson(fittingcompartment, scompartment){
	const data = ode();
	var filename = 'EMD-model.json';
	var type = /text.*/;
	var text = '{"Model":\n';
	text += '         {"Equations": {';
	// first the equation for n:
	text += '"n": "';
	Object.keys(graph.states).forEach((key) => {
		text += key;
		text += '+';
	})
	text = text.substring(0,text.length - 1);
	text += '", ';
	var shID, sh, shType, shIDstate, shstate;
	var statescount;
	for([shIDstate, shstate] of shapes.shMap){
		shType = shIDstate.substring(0,1);
		if(shType === 's'){
			text += '"';
			text += shIDstate;
			text += '": "';
		for([shID, sh] of shapes.shMap){ 
			shType = shID.substring(0,1);
			//first transition then special arrows
			if(shType === 't' && sh.source.id === shIDstate && sh.type === undefined){ // arrows with source this state
				statescount =0;
				text += '-';
				text += shIDstate;
				text += '*';
				for(let m = 0; m < sh.nameArr.length; m++){
					switch (sh.nameArr[m][0]) {
						case 'r':
							text += sh.nameArr[m][1];
							text += '*';
							break;
						case 's':
							text += sh.nameArr[m][1].id;
							text += '*';
							if(sh.nameArr[m][1].id != 'n'){
								statescount++;
							}
							break;
						case 'o':
							for(; statescount > 0; statescount--){
								text += '/n';
							}
							text += '-';
							text += shIDstate;
							text += '*';
							break;
						default:
							break;					
					}
				}
				if(text.charAt(text.length-1) === '*'){
					text = text.substring(0,text.length - 1);
				}
				for(; statescount > 0; statescount--){
					text += '/n';
				}
			}
			if(shType === 't' && sh.target.id === shIDstate && sh.type === undefined){ // arrows with target this state
				statescount =0;
				text += '+';
				text += sh.source.id;
				text += '*';
				for(let m = 0; m < sh.nameArr.length; m++){
					switch (sh.nameArr[m][0]) {
						case 'r':
							text += sh.nameArr[m][1];
							text += '*';
							break;
						case 's':
							text += sh.nameArr[m][1].id;
							text += '*';
							if(sh.nameArr[m][1].id != 'n'){
								statescount++;
							}
							break;
						case 'o':
							for(; statescount > 0; statescount--){
								text += '/n';
							}
							text += '+';
							text += sh.source.id;
							text += '*';
							break;
						default:
							break;					
					}
				}
				if(text.charAt(text.length-1) === '*'){
					text = text.substring(0,text.length - 1);
				}
				for(; statescount > 0; statescount--){
					text += '/n';
				}
			}
			// Now the specialArrows
			if(shType === 't' && sh.source.id === shIDstate && sh.type === 'out'){ // specialArrows with source this state
				statescount =-1;
				text += '-';
				for(let m = 0; m < sh.nameArr.length; m++){
					switch (sh.nameArr[m][0]) {
						case 'r':
							text += sh.nameArr[m][1];
							text += '*';
							break;
						case 's':
							text += sh.nameArr[m][1].id;
							text += '*';
							if(sh.nameArr[m][1].id != 'n'){
								statescount++;
							}
							break;
						case 'o':
							for(; statescount > 0; statescount--){
								text += '/n';
							}
							text += '-';
							text += shIDstate;
							text += '*';
							break;
						default:
							break;					
					}
				}
				if(text.charAt(text.length-1) === '*'){
					text = text.substring(0,text.length - 1);
				}
				for(; statescount > 0; statescount--){
					text += '/n';
				}
			}
			if(shType === 't' && sh.target.id === shIDstate && sh.type === 'in'){ // specialArrows with target this state
				statescount =-1;
				text += '+';
				for(let m = 0; m < sh.nameArr.length; m++){
					switch (sh.nameArr[m][0]) {
						case 'r':
							text += sh.nameArr[m][1];
							text += '*';
							break;
						case 's':
							text += sh.nameArr[m][1].id;
							text += '*';
							if(sh.nameArr[m][1].id != 'n'){
								statescount++;
							}
							break;
						case 'o':
							for(; statescount > 0; statescount--){
								text += '/n';
							}
							text += '+';
							text += sh.source.id;
							text += '*';
							break;
						default:
							break;					
					}
				}
				if(text.charAt(text.length-1) === '*'){
					text = text.substring(0,text.length - 1);
				}
				for(; statescount > 0; statescount--){
					text += '/n';
				}
			}
		}
		text += '", ';
		}
	}
	// Now the Parameters
	text = text.substring(0,text.length - 2);
	text += '},\n          "Parameters": [';
	Object.keys(graph.rates).forEach((key) => {
		text += '"';
		text += key.codePointAt(0);
		text += '",';
	});
	if(text.charAt(text.length-1) === ','){
		text = text.substring(0,text.length - 1);
	}
	text += '],\n';
	text += '          "state_ids": [';
	Object.keys(graph.states).forEach((key) => {
		text += '"';
		text += key;
		text += '"';
		text += ',';
	});
	if(text.charAt(text.length-1) === ','){
		text = text.substring(0,text.length - 1);
	}
	text += '],\n';
	text += '          "state-names": {';
	Object.keys(graph.states).forEach((key) => {
		text += '"';
		text += key;
		text += '"';
		text += ':';
		text += '"';
		for (let i = 0; i < graph.states[key].name.length; i++) {
			let namepoint = graph.states[key].name.codePointAt(i)
			Object.keys(symbols.L.C).forEach((key) => {
				if(symbols.L.C[key] === namepoint){
					text += key;
				}
				if(symbols.L.S[key] === namepoint){
					text += key.toLowerCase();
				}
			})
		}
		text += '"';
		text += ',';
	});
	if(text.charAt(text.length-1) === ','){
		text = text.substring(0,text.length - 1);
	}
	text += '},\n';
	text += '          "rates-names": {';
	Object.keys(graph.rates).forEach((key) => {
		text += '"';
		text += key.codePointAt(0);
		text += '"';
		text += ':';
		text += '"';
		text += symbols.greek.S[key.codePointAt(0)];		
		text += '"';
		text += ',';
	});
	if(text.charAt(text.length-1) === ','){
		text = text.substring(0,text.length - 1);
	}
	text += '},\n';
	text += '          "IV": [';
	Object.keys(graph.states).forEach((key) => {
		text += graph.states[key].getValue();
		text += ',';
	});
	if(text.charAt(text.length-1) === ','){
		text = text.substring(0,text.length - 1);
	}
	text += '],\n          "Compartments_to_Fit": [';
	text += fittingcompartment;
	text += '],\n          "Susceptibles": ';
	text += scompartment;
	text += ',\n          "n": ';
	var population = 0;
	Object.keys(graph.states).forEach((key) => {
		population += graph.states[key].getValue();
	});
	text += population;
	text += '}\n}';
	downloaddata(text,filename,type);
}

function fittingrequest(){
	let labels = '<div>Select states to fit:</div>';
	let fitting = '';
	let scompartment = '';
	// slider for the population
	labels += '<label class="switch">';
	labels +=
		'<input type="checkbox" id="fittingcheck' +
		'n' +
		'" name="fittingcheck' +
		'n' +
		'">' +
		' ' +
		'N'; //  Name of the Curve
	labels +=
		'<span class="slider' +
		'n' +
		' round"></span></label><span style="font-family:\'Arial\';"> ' ;
		labels += 'N' ; 
		labels += '(t)' + //  Name of the Curve
		'  &nbsp&nbsp</span><br>';
	/* Hide default HTML checkbox */
	Object.keys(graph.states).forEach((key) => {
		// Html of sliders
		labels += '<label class="switch">';
		labels +=
			'<input type="checkbox" id="fittingcheck' +
			key +
			'" name="fittingcheck' +
			key +
			'">' +
			' ' +
			key; //  Name of the Curve
		labels +=
			'<span class="slider' +
			key +
			' round"></span></label><span style="font-family:\'Arial\';"> ' ;
			labels += graph.states[key].name ; 
			labels += '(t)' + //  Name of the Curve
			'  &nbsp&nbsp</span><br>';
	});
	// choose the susceptibel compartment:
	labels += '<div>Select your susceptible compartment:</div>'; 
	let first = true; // the first state is per default checked
	Object.keys(graph.states).forEach((key) => {
		// Html of sliders
		labels += '<label class="switch">';
		labels +=
			'<input type="checkbox" id="scompartment' +
			key +
			'" name="scompartment' +
			key + '"';
		if(first){labels += ' checked'; first = false;}
		labels +=
			'>' +
			' ' +
			key; //  Name of the Curve
		labels +=
			'<span class="slider' +
			key +
			' round"></span></label><span style="font-family:\'Arial\';"> ' ;
			labels += graph.states[key].name ; 
			labels += '(t)' + //  Name of the Curve
			'  &nbsp&nbsp</span><br>';
	});

	labels += '<button id="fittingchoicevalidate" class="downloadupload" style="margin-right: 6px; width: 97px">Accept</button>';
	labels += '<button id="fittingchoicecancel" class="downloadupload" style="width: 97px">Cancel</button>';
	$('#fittingchoice').html(labels);
	// add event listeners so that only one susceptible compartment could be checked at once:
	Object.keys(graph.states).forEach((key) => {
		let id = 'scompartment';
		id += key;
		document.getElementById(id).addEventListener("click", function(){
			if(!document.getElementById(id).checked){document.getElementById(id).checked = true;} // dont let user uncheck
			Object.keys(graph.states).forEach((testkey) => { // everytime one state has to be checked
				let testid = 'scompartment';
				testid += testkey;
				if(testkey !== key) document.getElementById(testid).checked = false;
			})
		})
	});

	document.getElementById('fittingchoicevalidate').addEventListener("click", function(){ 
		if(document.getElementById('fittingcheckn').checked){
			fitting += '"';
			fitting += 'n';
			fitting += '",';
		}
		Object.keys(graph.states).forEach((key) => {
			let id = 'fittingcheck';
			id += key;
			if(document.getElementById(id).checked){
				fitting += '"';
				fitting += key;
				fitting += '",';
			}
		});
		if(fitting.charAt(fitting.length-1) === ','){
			fitting = fitting.substring(0,fitting.length - 1);
		}
		Object.keys(graph.states).forEach((key) => {
			let id = 'scompartment';
			id += key;
			if(document.getElementById(id).checked){
				scompartment += '"';
				scompartment += key;
				scompartment += '",';
			}
		});
		if(scompartment.charAt(scompartment.length-1) === ','){
			scompartment = scompartment.substring(0,scompartment.length - 1);
		}
		$('#fittingchoice').html('');
		downloadmodeljson(fitting,scompartment);
	});
	document.getElementById('fittingchoicecancel').addEventListener("click", function(){ 
		$('#fittingchoice').html('');
	});
}

//---------------------------------------
function fittingprogram(){
	window.open('https://github.com/Kilian672/EMD-Code/blob/main/App.exe', '_blank').focus();
	//download("https://raw2.github.com/Kilian672/EMD-Code/main/package.json","package.json");
}
function download(url, filename) {
  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
  })
  .catch(console.error);
}

export {inituploadmodel, downloadmodel, downloaddatacsv, fittingrequest, fittingprogram, generate};