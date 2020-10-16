/**
 Current
13
As a User, I can use an evolutionary algorithm to evolve solutions to the iterated prisoner’s dilemma
Costs more than I would normally cost it because I would like to plan it more since other stories rely on this story, make it maintainable and modular, already have a good start

2
As a User, I can change the operators of the evolutionary algorithm, such as the crossover operator

1
As a User, I can adjust the parameters to tune the algorithm, such as the mutation rate




*/
/**
 * Generate 1 or 0
 */
function randomBit() {
	return Math.round(Math.random())
}

/* Shuffle using fisher yates method */
function shuffle(array) {
  let i = array.length;
  while (i--) {
    const ri = Math.floor(Math.random() * (i + 1));
    [array[i], array[ri]] = [array[ri], array[i]];
  }
  return array;
}

class Individual {
	/*
	 * Constructor
	 */
	constructor() {
		/* Scores */
		this.scoreTotal = 0 // Total score from all games
		this.score = 0 // Total scrore from all rounds from a game
		this.genome = [] // Genome
		this.histOriginal = [] // Original history bits
		this.hist = [] // Current history bits
		
		/* Initialize randome genome and set decisions positions to 0 */
		for (var i = 0; i < 64; i++) {
			this.genome.push([randomBit()])
		}
		
		/* Initialize history and original history */
		for (var i = 0; i < 6; i++) {
			this.hist.push(randomBit())
			this.histOriginal.push(this.hist[i])
		}
	}
	
	/*
	 * Get decision
	 */
	getDecision() {
		/* Convert history to position (which has the decision in genome) */
		const histStr = this.hist.join('');
		const pos = parseInt(histStr, 2);
		
		const decision = this.genome[pos]
		
		return decision
	}
	
	/*
	 * Update history based on played decisions
	 */
	update(d1, d2) {
		/* Removes 1st and 2nd element */
		this.hist.shift()
		this.hist.shift()
		
		/* Appends elements to end of list */
		this.hist.push(d1)
		this.hist.push(d2)
		
		/* Update score */
		if (d1 == 0) {
			// C
			if (d2 == 0) {
				// CC
				this.score += 3
			} else {
				// CD
				this.score += 0
			}
		} else {
			// D
			if (d2 == 0) {
				// DC
				this.score += 5
			} else {
				// DD
				this.score += 1
			}
		}
	}
	
	/*
	 * What to do at the end of a game (reset)
	 */
	endGame() {
		/* Update score total */
		this.scoreTotal += this.score
		
		/* Reset score */
		this.score = 0
		
		/* Reset history */
		for (var i = 0, len = this.hist.length; i < len; i++) {
			this.hist[i] = this.histOriginal[i]
		}
	}
	
	genomeStr() {
		var str = ""
		for (var i = 0, len = this.genome.length; i < len; i++) {
			str = str + this.genome[i] + " "
		}
		return str
	}
}

/*
 * Play a single round
 */
function playRound(ind1, ind2) {
	const d1 = ind1.getDecision()
	const d2 = ind2.getDecision()
	
	ind1.update(d1, d2)
	ind2.update(d2, d1)
}

/*
 * Play a game (150 rounds)
 */
function play(ind1, ind2) {
	for (var i = 0; i < 150; i++) {
		playRound(ind1, ind2)
	}
	ind1.endGame()
	ind2.endGame()
}

/*
 * Given a population, evaluate them in a round robin tournament
 */
function evaluate(p) {
	/* Ensure score is 0 (probably not needed) */
	for (var i = 0, len = p.length; i < len; i++) {
		p[i].score = 0
	}
	
	/* Each individual plays one another once */
	for (var i = 0, len = p.length; i < len; i++) {
		for (var j = i + 1; j < len; j++) {
			play(p[i], p[j])
		}
	}
}

function crossover(ind1, ind2) {
	let g1 = ind1.genome
	let g2 = ind2.genome
	
	let size = Math.min(g1.length, g2.length)
    let cxpoint = Math.floor(Math.random() * (size + 1))
	
	let g1half = g1.splice(cxpoint + 1, g1.length - (cxpoint + 1) )
	let g2half = g2.splice(cxpoint + 1, g2.length - (cxpoint + 1) )
	g1 = _.concat(g1, g2half)
	g2 = _.concat(g2, g1half)
	
	ind1.genome = g1
	ind2.genome = g2
}

function mutate(ind, pb) {
	for (var i = 0, len = ind.genome.length; i < len; i++) {
		if (Math.random() < pb) {
			console.log(i)
			if (ind.genome[i] == 1) {
				ind.genome[i] = 0
			} else {
				ind.genome[i] = 1
			}
		}
	}
}

/*
 * Main function for the GA
 */
function main() {
	const CX_PB = 0.7
	var pop = []
	for (var i = 0; i < 50; i++) {
		pop.push(new Individual())
	}
	
	const NUM_GEN = 50
	for (var gen = 0; gen < NUM_GEN; gen += 1) {
		
		/* Create offspring through crossover and mutation */
		var off = _.cloneDeep(pop)
		for (var i = 0, len = off.length; i < len; i += 2) {
			if (Math.random() < CX_PB) {
				crossover(off[i], off[i+1])
			}
		}
		for (var i = 0, len = off.length; i < len; i++) {
			mutate(off[i])
		}
		
		/* Add offspring to pop */
		pop = _.concat(pop, off)
		
		/* Evaluate pop (by playing game) */
		evaluate(pop)
		
		/* Sort by scoreTotal */
		pop.sort( (a,b) => b.scoreTotal - a.scoreTotal )
		
		/* Grab best for next generation (first 50) */
		pop = pop.slice(0, 50);
		pop = shuffle(pop)
		
		for (var i = 0, len = off.length; i < len; i++) {
			pop[i].scoreTotal = 0
		}
		console.log("Completed gen " + gen)
	}
	
	evaluate(pop)
	pop.sort( (a,b) => b.scoreTotal - a.scoreTotal )
	for (var i = 0, len = 10; i < len; i++) {
		console.log(pop[i].scoreTotal)
		console.log(pop[i].genomeStr())
		console.log("Genome:  " + JSON.stringify(pop[i].genome))
		console.log("History: " + JSON.stringify(pop[i].histOriginal))
	}
	
}

//test()
//main()