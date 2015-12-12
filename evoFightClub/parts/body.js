var Random = require("random-js");
var random = new Random(Random.engines.mt19937().autoSeed());


function Body(name){
	this.BASE = 50;
	this.name = name;
	this.health = random.integer(1, this.BASE); 
	this.health += 1;				// standard body has 1-50 health
	this.score = (this.health/(this.BASE/2));  // score is (health/25);
}

function body_getName(){
	return this.name;
}
function body_getHealth(){
	return this.health;
}
function body_getScore(){
	return this.score;
}
function body_breed(parentsAverageScore){
	// should return a body with score of approx. parentsAverageScore
	// so, change hp by doing 
	this.health = parentsAverageScore + (random.real(-0.1, 0.2, true)*this.BASE);
	this.score = this.health/(this.BASE/2);
}

Body.prototype.getName = body_getName;
Body.prototype.getHealth = body_getHealth;
Body.prototype.getScore = body_getScore;
Body.prototype.breed = body_breed;

module.exports = {
	Body: Body
}