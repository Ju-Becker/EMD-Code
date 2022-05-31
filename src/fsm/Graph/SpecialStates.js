/*
 * SpecialArrows
 *
 * All States which aren't a State are instances of this class
 */

import fsmState from "./State";
import constants from '../Constants/Constants';

//we insert a new attribut type, so we can figure out if it is a 
//state or a spcialstate by checking the type
class fsmSpecialState extends fsmState{
	constructor(id, x, y, type, max){
		super(id, x, y);
		this.type = type; 
		this.max = max;
	}
	draw(){
		const ctx = constants.context;
		ctx.lineWidth = this.lineWidth;
		ctx.strokeStyle = this.colour;
		ctx.fillStyle = this.colour;
		ctx.font = '20px Verdana, Geneva, Tahoma, sans-serif';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.strokeRect(this.x-15, this.y-15, this.radius+10, this.radius+10);
		ctx.fillText(this.name, this.x, this.y);
	}
}

export default fsmSpecialState;