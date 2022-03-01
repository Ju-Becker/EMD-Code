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
			generate(models[id]);
			$('#fsmID').show();
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
			generate(modelsvitaldynamics[idvitaldynamics]);
			$('#fsmID').show();
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
}

export default modelsinit;