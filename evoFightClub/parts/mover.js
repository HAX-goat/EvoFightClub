var Random = require("random-js");
var random = new Random(Random.engines.mt19937().autoSeed());



function Mover(name){
	this.BASE = 5;
	this.name = name;
	this.speed = random.integer(1, this.BASE); 
	this.speed += 1;				// standard legs has 1-5 speed-value
	this.score = (this.speed/(this.BASE/2));  // score is speed/2.5
}

function mover_getName(){
	return this.name;
}
function mover_getSpeed(){
	return this.speed;
}
function mover_getScore(){
	return this.score;
}
function mover_breed(parentsAverageScore){
	// should return a mover with score of approx. parentsAverageScore
	// so, change speed by doing 
	if((random.integer(0,99)) % 2 === 0){ // +
		this.speed = parentsAverageScore*(this.BASE/2) + (random.integer(0,this.BASE/2));
	} else {						// -
		this.speed = parentsAverageScore*(this.BASE/2) - (random.integer(0,this.BASE/2));
	}
	this.score = this.speed/(this.BASE/2);
}

Mover.prototype.getName = mover_getName;
Mover.prototype.getSpeed = mover_getSpeed;
Mover.prototype.getScore = mover_getScore;
Mover.prototype.breed = mover_breed;

module.exports = {
	Mover: Mover
}