/* Contains all mutation modules */


/* START OF MUTATION MODULES */

/*
 * Chance of chance to flip a bit
 * args: <chance>
 */
function chanceFlip(ind, args) {
	let mutInd = ind.template();
	
	let fullGenome = mutInd.genome.concat(mutInd.hist);
	
	let positions = _.shuffle(_.range(fullGenome.length));
	
	for (let i = 0; i < fullGenome.length; i++) {
		if (Math.random() < args[0]) {
			fullGenome[i] = fullGenome[i]^1; // XOR
		}
	}
	mutInd.genome = fullGenome.slice(0, ind.genome.length);
	mutInd.hist = fullGenome.slice(ind.genome.length, ind.genome.length + ind.hist.length);
	
	return mutInd;
}

/*
 * Pick num positions to flip
 * args: <chance>
 */
function setFlip(ind, args) {
	let mutInd = ind.template();
	
	let fullGenome = mutInd.genome.concat(mutInd.hist);
	
	let positions = _.shuffle(_.range(fullGenome.length));
	
	for (let i = 0; i < args[0]; i++) {
		let pos = positions[i];
		fullGenome[pos] = fullGenome[pos]^1;
	}
	mutInd.genome = fullGenome.slice(0, ind.genome.length);
	mutInd.hist = fullGenome.slice(ind.genome.length, ind.genome.length + ind.hist.length);
	
	return mutInd;
}

/*
 * Pick num positions to swap
 * args: <chance>
 */
function swap(ind, args) {
	let mutInd = ind.template();
	
	let fullGenome = mutInd.genome.concat(mutInd.hist);
	
	let positions = _.shuffle(_.range(fullGenome.length));
	
	let len = args[0] * 2;
	for (let i = 0; i < len; i += 2) {
		let pos0 = positions[i];
		let pos1 = positions[i + 1];
		let temp = fullGenome[pos0];
		fullGenome[pos0] = fullGenome[pos1];
		fullGenome[pos1] = temp;
		
	}
	
	mutInd.genome = fullGenome.slice(0, ind.genome.length);
	mutInd.hist = fullGenome.slice(ind.genome.length, ind.genome.length + ind.hist.length);
	
	return mutInd;
}

/* END OF MUTATION MODULES */

export class ModuleManager {
	constructor() {
		this.map = {
			'chanceFlip': chanceFlip,
			'setFlip': setFlip,
			'swap': swap,
		};
	}
	
	getModule(name) {
		return this.map[name];
	}
}




