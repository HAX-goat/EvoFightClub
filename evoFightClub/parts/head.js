var Random = require("random-js");
var random = new Random(Random.engines.mt19937().autoSeed());


function Head(name){
	this.BASE = 15;
	this.name = name;
	this.reflexes = random.integer(1, this.BASE); 
	this.reflexes += 1;				// standard arms deals 1-10 damage
	this.score = this.reflexes/(this.BASE/2);		// score is (damage/5)
}

function head_getName(){
	return this.name;
}
function head_getScore(){
	return this.score;
}
function head_getReflexes(){
	return this.reflexes;
}
function head_breed(parentsAverageScore){
	// should return a head with score of approx. parentsAverageScore
	// so, change reflexes by doing 
	if(random.bool(50)){ // +
		this.reflexes = parentsAverageScore*(this.BASE/2) + (random.integer(0,this.BASE/2));
	} else {						// -
		this.reflexes = parentsAverageScore*(this.BASE/2) - (random.integer(0,this.BASE/2));
	}
	this.score = this.reflexes/(this.BASE/2);
}

Head.prototype.getName = head_getName;
Head.prototype.getReflexes = head_getReflexes;
Head.prototype.getScore = head_getScore;
Head.prototype.breed = head_breed;

module.exports = {
	Head: Head
}