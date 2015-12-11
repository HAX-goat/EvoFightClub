var Random = require("random-js");
var random = new Random(Random.engines.mt19937().autoSeed());

function Arm(name){
	this.BASE = 10;
	this.name = name;
	this.damage = random.integer(1, this.BASE); 
	this.damage += 1;				// standard arms deals 1-10 damage
	this.score = this.damage/(this.BASE/2);		// score is (damage/5)
}

function arm_getName(){
	return this.name;
}
function arm_getScore(){
	return this.score;
}
function arm_getDamage(){
	return this.damage;
}
function arm_breed(parentsAverageScore){
	// should return an arm with score of approx. parentsAverageScore
	// so, change damage by doing 
	this.damage = parentsAverageScore + (random.integer(-1,1) * (random.real(0.1, 0.4, true)*this.BASE));
	this.score = this.damage/(this.BASE/2);
}

Arm.prototype.getName = arm_getName;
Arm.prototype.getDamage = arm_getDamage;
Arm.prototype.getScore = arm_getScore;
Arm.prototype.breed = arm_breed;

module.exports = {
	Arm: Arm
}