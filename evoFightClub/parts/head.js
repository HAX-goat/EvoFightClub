function Head(name){
	this.BASE = 15;
	this.name = name;
	this.reflexes = Math.random() * this.BASE; 
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
	if((Math.random() * 100) % 2 === 0){ // +
		this.reflexes = parentsAverageScore*(this.BASE/2) + (Math.random() * (this.BASE/2));
	} else {						// -
		this.reflexes = parentsAverageScore*(this.BASE/2) - (Math.random() * (this.BASE/2));
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