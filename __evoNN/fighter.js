var Arm = require('./parts/arms').Arm;
var Body = require('./parts/body').Body;
var Mover = require('./parts/mover').Mover;

function Fighter(name, arm, body, mover, generation){
	this.name = name;
	this.arms = arm;
	this.body = body;
	this.legs = mover;
	this.currHp = this.body.getHealth();
	this.score = ((this.legs.getScore() + this.body.getScore() + this.arms.getScore()) / 3);
	this.generation = generation;
}

Fighter.prototype.getInfo = fighter_getInfo;
Fighter.prototype.getStat = fighter_getStat;
Fighter.prototype.getAttacked = fighter_getAttacked;
Fighter.prototype.attack = fighter_attack;

function fighter_getInfo(){
	return { 
		name: this.name, 
		currentHealth: this.currHp,
		damage: this.arms.getDamage(),
		speed: this.legs.getSpeed(),
		totalScore: this.score,
		generation: this.generation
	 };
}

function fighter_getStat(what){
	switch(what){
		case 'name':
			return this.name;
		case 'arms':
			return this.arms.getName();
		case 'body':
			return this.body.getName();
		case 'legs':
			return this.legs.getName();
		case 'hp':
			return this.currHp;
		case 'all':
		default:
			return this.getInfo();
	}
}

function fighter_getAttacked(opposingArms){
	this.currHp -= opposingArms.getDamage();
}

function fighter_attack(tgt){
	tgt.getAttacked(this.arms);
}

function fighter_recycle(){
	return {
		name: this.name,
		arms: this.arms,
		body: this.body,
		legs: this.legs,
		score: this.score,
		gen: this.generation
	};
}

function fighter_util_mk(name){
	var fArm = new Arm(name);
	var fBody = new Body(name);
	var fLegs = new Mover(name);
	return new Fighter(name, fArm, fBody, fLegs, 1);
}

module.exports = {
	Fighter: Fighter,
	makeFighter: fighter_util_mk
}