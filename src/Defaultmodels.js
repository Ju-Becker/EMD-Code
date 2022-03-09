/*
 * In Defaultmodels.js the buttons for every defaultmodel in './fsm/Constants/constantmodels'
 * are created + Eventlisteners (by clicking the button the funstion generate is called 
 * with the data which is stored in './fsm/Constants/constantmodels')
 *
 */
import {models, modelsvitaldynamics} from './fsm/Constants/constantmodels'; // model structure
import { generate } from './modelupdownload'; // used to build the default models 
import shapes from './fsm/Graph/Shapes'; // used to check if there is a model running

function modelsinit(){
	let model;
	let buttons ='';
	buttons += '<div style="padding-left:130px; margin-bottom: 5px; font-size: 10pt; font-family: Verdana, Geneva, Tahoma, sans-serif;">With vital dynamics:</div>';
	for(model in models){ // button for every model
		buttons += '<span style="padding-bottom:5px; display:block;">'
		buttons += '<button id="';
		buttons += model;
		buttons += '" style="width:100px; margin-right: 50px;" class="downloadupload">';
		buttons += model;
		buttons += '</button>';
		// now the vitaldynamics buttons
		buttons += '<button id="';
		buttons += model;
		buttons += 'vitaldynamics';
		buttons += '" style="width:100px;" class="downloadupload">';
		buttons += model;
		buttons += '</button>';
		//-----
		buttons += '</span>';
	}
	// create input field for 'create by number of states'
	buttons += '<div style="margin-bottom: 5px; margin-top: 10px; font-size: 10pt; font-family: Verdana, Geneva, Tahoma, sans-serif;">Create by number of states:</div>';
	buttons += '<input type="number" id="numberstates" min="1" value="1" style="background-color: lightgrey; width: 40px;">';
	buttons += '<button id="createwithnumber" style="width:55px; margin-left: 10px;" class="downloadupload">Create</button>'; // create button
	buttons += '<button id="createwithnumbertransitons" style="width:150px; margin-left: 10px;" class="downloadupload">Create with transitions</button>'; // create with transitons button
	//----------
	document.getElementById('defaultmodelscontent').innerHTML = buttons;
	for(model in models){ // add the Eventlisteners
		let id = model
		let idvitaldynamics = model;
		idvitaldynamics += 'vitaldynamics';
		document.getElementById(id).addEventListener("click", function(){
			if(shapes.generateFreeID('s') !== 's1'){ // ckeck if there is already a model running
				alert('There is an acitve model running! \nPlease refresh the website.');
				return;
			}
			generate(models[id]); // build the model
			$('#fsmID').show(); // change settings to give the right view after the model is built
			$('#odeID').show();
  		$('#inID').show();
  		$('#helpID').show();
  		$('#plotID').hide();
	  	$('#tab2ID').hide();
  		$('#statesID').hide();
	  	$('#ratesID').hide();
  		$('#tab3ID').hide();
  		$('#GraphButtons').hide();
  		$('#downloaduploadID').hide();
  		$('#defaultmodelscontent').hide();
  		$('#Simulator').removeClass('active');
  		$('#Designer').addClass('active');
  		$('#UploadDownload').removeClass('active');
  		$('#Defaultmodels').removeClass('active');
		});
		document.getElementById(idvitaldynamics).addEventListener("click", function(){ // vital dynamics buttons
			if(shapes.generateFreeID('s') !== 's1'){ // ckeck if there is already a model running
				alert('There is an acitve model running! \nPlease refresh the website.');
				return;
			}
			generate(modelsvitaldynamics[idvitaldynamics]); // build the model
			$('#fsmID').show(); // change the settings to give the right view after the model is built
			$('#odeID').show();
  		$('#inID').show();
  		$('#helpID').show();
  		$('#plotID').hide();
	  	$('#tab2ID').hide();
  		$('#statesID').hide();
	  	$('#ratesID').hide();
  		$('#tab3ID').hide();
  		$('#GraphButtons').hide();
  		$('#downloaduploadID').hide();
  		$('#defaultmodelscontent').hide();
  		$('#Simulator').removeClass('active');
  		$('#Designer').addClass('active');
  		$('#UploadDownload').removeClass('active');
  		$('#Defaultmodels').removeClass('active');
		});

	}
	document.getElementById('createwithnumber').addEventListener("click", function(){ // eventlistener for the create button
		let value = document.getElementById('numberstates').value; // read the input data
		if(value < 1) return; // check if we get a valid value
		if(shapes.generateFreeID('s') !== 's1'){ // ckeck if there is already a model running
			alert('There is an acitve model running! \nPlease refresh the website.');
			return;
		}
		let generatetext = 'Epidemic-Model-Data\n'; // main string to build the model
		let xaxis = 100; // xaxis for the states
		let yaxis = 0; // yaxis for the states
		let stateid = '';
		let name = '';
		for (let i = 0; i < value; i++) {
			if(i%4 ===0){yaxis += 100;xaxis = 100;} // iteration for the yaxis and xaxis
			// build pattern is for states in a row then jump in the next row
			stateid = 's'; // build the stateid: 's0','s1',...
			stateid += i;
			name = 119860+i; // generate the name of the state: 'A','B',...
			generatetext += stateid;
			generatetext += '(';
			generatetext += xaxis;
			generatetext += ',';
			generatetext += yaxis;
			generatetext += '),';
			if(i===0){generatetext += '1000,';} else{generatetext += '0,';}	// default settings are value for the first state is 1000 then 0
			generatetext += name;
			generatetext += ';';
			xaxis += 200; // iteration for the xaxis
		}
		generatetext = generatetext.substring(0,generatetext.length - 1);
		generatetext += ':\n:\n:\n:\nt0-0:\n:\n';
		generate(generatetext); // build the model
		$('#fsmID').show(); // change the settings to give the right view after the model is built
			$('#odeID').show();
  		$('#inID').show();
  		$('#helpID').show();
  		$('#plotID').hide();
	  	$('#tab2ID').hide();
  		$('#statesID').hide();
	  	$('#ratesID').hide();
  		$('#tab3ID').hide();
  		$('#GraphButtons').hide();
  		$('#downloaduploadID').hide();
  		$('#defaultmodelscontent').hide();
  		$('#Simulator').removeClass('active');
  		$('#Designer').addClass('active');
  		$('#UploadDownload').removeClass('active');
  		$('#Defaultmodels').removeClass('active');
	})

	document.getElementById('createwithnumbertransitons').addEventListener("click", function(){ // eventlistener for the create with transitions button
		let value = document.getElementById('numberstates').value; // read the input data
		if(value < 1) return; // check if we get a valid value
		if(shapes.generateFreeID('s') !== 's1'){ // ckeck if there is already a model running
			alert('There is an acitve model running! \nPlease refresh the website.');
			return;
		}
		let generatetext = 'Epidemic-Model-Data\n'; // main string to build the model
		let xaxis = 100; // xaxis for the states
		let yaxis = 0; // yaxis for the states
		let stateid = '';
		let stateidend = '';
		let name = '';
		let transitonname;
		for (let i = 0; i < value; i++) {
			if(i%4 ===0){yaxis += 100;xaxis = 100;} // iteration for the yaxis and xaxis
			// build pattern is for states in a row then jump in the next row
			stateid = 's'; // build the stateid: 's0','s1',...
			stateid += i;
			name = 119860+i; // generate the name of the state: 'A','B',...
			generatetext += stateid;
			generatetext += '(';
			generatetext += xaxis;
			generatetext += ',';
			generatetext += yaxis;
			generatetext += '),';
			if(i===0){generatetext += '1000,';} else{generatetext += '0,';}	// default settings are value for the first state is 1000 then 0
			generatetext += name;
			generatetext += ';';
			xaxis += 200; // iteration for the xaxis
		}
		generatetext = generatetext.substring(0,generatetext.length - 1);
		generatetext += ':\n';

		for (let i = 0; i < value-1; i++) {
			stateid = 's';
			stateid += i;
			stateidend = 's';
			stateidend += i+1;
			transitonname = 120572 + i;
			generatetext += transitonname;
			generatetext += ',';
			generatetext += stateid;
			generatetext += ',';
			generatetext += stateidend;
			generatetext += ';';
		}
		generatetext = generatetext.substring(0,generatetext.length - 1);
		generatetext += ':\n:\n:\nt0-0:\n';
		for (let i = 0; i < value-1; i++) {
			transitonname = 120572 + i;
			generatetext += transitonname;
			generatetext += ',';
			generatetext += 't0,';
			generatetext += '0.1;';
		}
		generatetext = generatetext.substring(0,generatetext.length - 1);
		generatetext += ':\n';
		generate(generatetext); // build the model
		$('#fsmID').show(); // change the settings to give the right view after the model is built
			$('#odeID').show();
  		$('#inID').show();
  		$('#helpID').show();
  		$('#plotID').hide();
	  	$('#tab2ID').hide();
  		$('#statesID').hide();
	  	$('#ratesID').hide();
  		$('#tab3ID').hide();
  		$('#GraphButtons').hide();
  		$('#downloaduploadID').hide();
  		$('#defaultmodelscontent').hide();
  		$('#Simulator').removeClass('active');
  		$('#Designer').addClass('active');
  		$('#UploadDownload').removeClass('active');
  		$('#Defaultmodels').removeClass('active');
	})
}

export default modelsinit;