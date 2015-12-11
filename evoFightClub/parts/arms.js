function Arm(name){
	this.BASE = 10;
	this.name = name;
	this.damage = Math.random() * this.BASE; 
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
	if((Math.random() * 100) % 2 === 0){ // +
		this.damage = parentsAverageScore*(this.BASE/2) + (Math.random() * (this.BASE/2));
	} else {						// -
		this.damage = parentsAverageScore*(this.BASE/2) - (Math.random() * (this.BASE/2));
	}
	this.score = this.damage/(this.BASE/2);
}

Arm.prototype.getName = arm_getName;
Arm.prototype.getDamage = arm_getDamage;
Arm.prototype.getScore = arm_getScore;
Arm.prototype.breed = arm_breed;

module.exports = {
	Arm: Arm
}