/* Contains all chromosome initialization modules */


/* START OF INITIALIZATION MODULES */

/*
 * Create chromosomes with random 0s and 1s
 * args: none
 */
function random(length, args) {
	let chromosome = [];
	
	for (let i = 0; i < length; i++) {
		chromosome.push(_.random(0, 1));
	}
	
	return chromosome;
}

/*
 * Create chromosome based on string
 * args: <str of gene(s)>
 */
function pattern(length, args) {
	let chromosome = [];
	
	for (let i = 0; i < length; i++) {
		let j = i % args[0].length;
		let c = args[0].charAt(j);
		chromosome.push(parseInt(c));	
	}
	
	return chromosome;
}


/* END OF INITIALIZATION MODULES */

export class ModuleManager {
	constructor() {
		this.map = {
			'random': random,
			'pattern': pattern,
		};
	}
	
	getModule(name) {
		return this.map[name];
	}
}




