


import SpecialState from "./SpecialStates";
import State from "./State";
import Transition from "./Transition";

let shapes = {}; //shapes array, Graph/Shapes.js
let ss = {}; // fsmCSS, Graph/Graph.js
let trAct = {}; // transitionActions
let instLimit = 0; // instance limit for id generation
const spsAct = {}; // main object here


spsAct.specialstatecreate = (e,type) => {
	const id = shapes.generateFreeID('s');
	if (id.length === 0) {
		// eslint-disable-next-line no-alert
		alert('Only ' + instLimit + ' states allowed, limit reached!');
		return false;
	}
	// capacity
	var max = '100';//window.prompt("Insert the capacity of the state:", 100);
	if(max === null){return;}
	var check = Math.floor(Number(max));
	if(check !== Infinity && String(check) === max && check >= 0){
		max = parseInt(max);
	}else{alert("Error with the input!\nThe capacity must be a number less or equal zero.");return;}
	//----
	const st = new SpecialState(id, e.offsetX, e.offsetY, type, max);
	//we can't create a states which is colliding with another state
	if(shapes.stateconflict(st)) {alert("Collision with another State");return false;}
	shapes.addShape(id, st);
	ss.systemStateActivate('sr', st);
	shapes.draw();
	//create the two corresponding states and the transitions
	// left state
	const idstateleft = shapes.generateFreeID('s');
	const stateleft = new State(idstateleft, e.offsetX -50, e.offsetY+150);
	stateleft.capacitystate = 'left'; // add attribut to preserve special treatment in the odes
	stateleft.lineWidth = 2;
	shapes.addShape(idstateleft, stateleft);
	//stateleft.nameAddChr(72);
	shapes.draw();
	//right state
	const idstateright = shapes.generateFreeID('s');
	const stateright = new State(idstateright, e.offsetX +50, e.offsetY+150);
	stateright.capacitystate = 'right'; // add attribut to preserve special treatment in the odes
	stateright.lineWidth = 0.5;
	shapes.addShape(idstateright, stateright);
	//stateright.nameAddChr(68);
	shapes.draw();
	//transition left
	const idtransitionleft = shapes.generateFreeID('t');
	const transitionleft = new Transition(idtransitionleft, shapes.getShape(id), shapes.getShape(idstateleft));
	transitionleft.capacitystate = 'left'; // add attribut to preserve special treatment in the odes
	transitionleft.lineWidth = 2;
	shapes.addShape(idtransitionleft, transitionleft);
	//const shapetrtansitionleft = shapes.getShape(idtransitionleft);
	//shapetrtansitionleft.nameAddToken('r',120582);
	// transition right
	const idtransitionright = shapes.generateFreeID('t');
	const transitionright = new Transition(idtransitionright, shapes.getShape(id), shapes.getShape(idstateright));
	transitionright.capacitystate = 'right'; // add attribut to preserve special treatment in the odes
	transitionright.lineWidth = 0.5;
	shapes.addShape(idtransitionright, transitionright);
	//const shapetrtansitionright = shapes.getShape(idtransitionright);
	//shapetrtansitionright.nameAddToken('r',120582);
	shapes.draw();
	//--------------
	return false;
}

// deprecated
spsAct.specialstatechangemax = () => {
	var max = window.prompt("Insert the capacity of the state:", 100);
	if(max === null){return;}
	var check = Math.floor(Number(max));
	if(check !== Infinity && String(check) === max && check >= 0){
		max = parseInt(max);
	}else{alert("Error with the input!\nThe capacity must be a number less or equal zero.");return;}
	ss.activeShape.max = max;
}

spsAct.returncapacitytransitionsbystate = (shcapacity) => {
	let capacitytransitions = [];
	let id;
	let sh;
	for([id, sh] of shapes.shMap) {
		if(id.substring(0, 1) === 't' && sh.source === shcapacity && sh.capacitystate != undefined){
			capacitytransitions.push(sh);
		}
	}
	return capacitytransitions;
}

spsAct.returncapacitytransitionsbytransition = (shcapacity) => {
	let capacitytransitions = [];
	let capacitystate = shcapacity.target;
	let id;
	let sh;
	for([id, sh] of shapes.shMap) {
		if(id.substring(0, 1) === 't' && sh.source === capacitystate && sh.capacitystate != undefined){
			capacitytransitions.push(sh);
		}
	}
	return capacitytransitions;
}

spsAct.returncapacitystatesbystate = (shcapacity) => {
	let capacitystates = [];
	let id;
	let sh;
	for([id, sh] of shapes.shMap) {
		if(id.substring(0, 1) === 't' && sh.source === shcapacity && sh.capacitystate != undefined){
			capacitystates.push(sh.target);
		}
	}
	return capacitystates;
}

spsAct.inserttransitionlimitreached = (shcapacity) => {
	let limit = 1; // possible use in the future
	let limitreached = false;
	let id;
	let sh;
	for([id, sh] of shapes.shMap) {
		if(id.substring(0, 1) === 't' && sh.target === shcapacity){
			limitreached = true;
		}
	}
	return limitreached;
}

// called by fsmCSS.init in Graph.js
spsAct.init = (shapeMgr, systemState, transitionActions, instanceLimit) => {
	shapes = shapeMgr;
	ss = systemState;
	trAct = transitionActions;
	instLimit = instanceLimit;
};

export default spsAct;