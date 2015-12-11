function Mover(name){
	this.BASE = 5;
	this.name = name;
	this.speed = Math.random() * this.BASE; 
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
	// should return a mover with score of approx. w
	// so, change speed by doing 
	if((Math.random() * 100) % 2 === 0){ // +
		this.speed = parentsAverageScore*(this.BASE/2) + (Math.random() * (this.BASE/2));
	} else {						// -
		this.speed = parentsAverageScore*(this.BASE/2) - (Math.random() * (this.BASE/2));
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