import * as Init from './modules/initialization.js';
import * as Mutate from './modules/mutate.js';
import * as Crossover from './modules/crossover.js';
import * as Objective from './modules/objective.js';
import * as Selection from './modules/selection.js';

class Individual {
	constructor() {
		this.genome = null;
		this.hist = null;
		this.attr = {};
		this.fitnessAttr = '';
	}
	
	setGenome(modName, num, args) {
		let initMan = new Init.ModuleManager();
		let mod = initMan.getModule(modName);
		this.genome = mod(num, args);
	}
	
	setHist(modName, num, args) {
		let initMan = new Init.ModuleManager();
		let mod = initMan.getModule(modName);
		this.hist = mod(num, args);
	}
	
	template() {
		let newInd = new Individual();
		newInd.genome = this.genome;
		newInd.hist = this.hist;
		return newInd;
	}
}

function main() {
	
	let pop = [];
	
	for (let i = 0; i < 8; i++) {
		let ind = new Individual();
		ind.setGenome('pattern', 64, ['1']);
		ind.setHist('pattern', 6, ['1']);
	
		ind.attr['attr1'] = Math.round(Math.random() * 100);
		console.log(ind.attr['attr1']);
		pop.push(ind);
	}
	
	let objMan = new Objective.ModuleManager();
	let objMod = objMan.getModule('single');
	let objArgs = ['attr1'];
	
	let selMan = new Selection.ModuleManager();
	let selMod = selMan.getModule('tournamentBest');
	
	let selected = selMod(pop, 1, objMod, objArgs, [4]);
	console.log(selected);
	
}

window.main = main;