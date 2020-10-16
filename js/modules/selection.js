/* Contains all selection modules */


/* START OF SELECTION MODULES */

/*
 * Get numSelect random individuals
 * args: none
 */
function random(indArr, numSelect, objMod, objArgs, args) {
	return _.sample(indArr, numSelect);
}

/*
 * Get numSelect individuals using tournament (MAX)
 * args: <tournament size>
 */
function tournamentBest(indArr, numSelect, objMod, objArgs, args) {
	console.log(indArr);
	let tourn = _.shuffle(indArr);
	tourn = tourn.slice(0, args[0]);
	tourn.sort(
		function(a, b) { 
			return objMod(b, objArgs) - objMod(a, objArgs);
		}
	);
	return tourn.slice(0, numSelect);
}

/*
 * Get numSelect individuals using tournament (MIN)
 * args: <tournament size>
 */
function tournamentWorst(indArr, numSelect, objMod, objArgs, args) {
	console.log(indArr);
	let tourn = _.shuffle(indArr);
	tourn = tourn.slice(0, args[0]);
	tourn.sort(
		function(a, b) { 
			return objMod(a, objArgs) - objMod(b, objArgs);
		}
	);
	return tourn.slice(0, numSelect);
}

/*
 * Get numSelect individuals using stochastic acceptance (MAX)
 * args: 
 */
function accpetanceBest(indArr, numSelect, objMod, objArgs, args) {
	indArr.sort(
		function(a, b) { 
			return objMod(b, objArgs) - objMod(a, objArgs);
		}
	);
	let bestFit = objMod(indArr[0], objArgs);
	
	let selectedInds = [];
	
	for (let i = 0; i < numSelect; i++) {
		let isAccepted = false;
		let selectedInd = null;
		while(!isAccepted) {
			let shuffled = _.shuffle(indArr);
			selectedInd = shuffled[0];
			let curFitness = objMod(selectedInd, objArgs);
			let prob = curFitness / bestFit;
			if (Math.random() < prob) {
				isAccepted = true;
				
			}
		}
		selectedInds.push(selectedInd);
	}
	
	return selectedInds;
}

/*
 * Get numSelect individuals using stochastic acceptance (MIN)
 * args: 
 */
function accpetanceWorst(indArr, numSelect, objMod, objArgs, args) {
	indArr.sort(
		function(a, b) { 
			return objMod(b, objArgs) - objMod(a, objArgs);
		}
	);
	let bestFit = objMod(indArr[0], objArgs);
	
	let selectedInds = [];
	
	for (let i = 0; i < numSelect; i++) {
		let isAccepted = false;
		let selectedInd = null;
		while(!isAccepted) {
			let shuffled = _.shuffle(indArr);
			selectedInd = shuffled[0];
			let curFitness = objMod(selectedInd, objArgs);
			let prob = curFitness / bestFit;
			if (!(Math.random() < prob)) {
				isAccepted = true;
				
			}
		}
		selectedInds.push(selectedInd);
	}
	
	return selectedInds;
}

/*
 * Get numSelect best individuals
 * args: 
 */
function best(indArr, numSelect, objMod, objArgs, args) {
	indArr.sort(
		function(a, b) { 
			return objMod(b, objArgs) - objMod(a, objArgs);
		}
	);
	
	return indArr.slice(0, numSelect);
}

/*
 * Get numSelect worst individuals
 * args: 
 */
function worst(indArr, numSelect, objMod, objArgs, args) {
	indArr.sort(
		function(a, b) { 
			return objMod(a, objArgs) - objMod(b, objArgs);
		}
	);
	
	return indArr.slice(0, numSelect);
}

/* END OF SELECTION MODULES */

export class ModuleManager {
	constructor() {
		this.map = {
			'random': random,
			'tournamentBest': tournamentBest,
			'tournamentWorst': tournamentWorst,
			'accpetanceBest': accpetanceBest,
			'accpetanceWorst': accpetanceWorst,
			'best': best,
			'worst': worst,
		};
	}
	
	getModule(name) {
		return this.map[name];
	}
}




