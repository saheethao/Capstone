/* Contains all objective modules */


/* START OF OBJECTIVE MODULES */

/*
 * Get fitness score of ind from single attr
 * args: <str of attribute>
 */
function single(ind, args) {
	let fitness = ind.attr[args[0]];
	return fitness;
}

/*
 * Get fitness score of ind from multiple attr
 * args: <string attr and scale associate array>
 */
function scale(ind, args) {
	let fitness = 0;
	for (let key in args[0]) {
		fitness += ind.attr[key] * args[0][key];
	}
	
	return fitness;
}

/* END OF OBJECTIVE MODULES */

export class ModuleManager {
	constructor() {
		this.map = {
			'single': single,
			'scale': scale,
		};
	}
	
	getModule(name) {
		return this.map[name];
	}
}




