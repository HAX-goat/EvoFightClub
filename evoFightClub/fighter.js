var Arm = require('./parts/arms').Arm;
var Body = require('./parts/body').Body;
var Mover = require('./parts/mover').Mover;
var Head = require('./parts/head').Head;
var Random = require("random-js");
var random = new Random(Random.engines.mt19937().autoSeed());

function Fighter(name, arm, body, mover, head, generation){
	this.name = name;
	this.arms = arm;
	this.body = body;
	this.head = head;
	this.legs = mover;
	this.currHp = this.body.getHealth();
	this.score = ((this.legs.getScore() + this.body.getScore() + this.arms.getScore()) / 3);
	this.generation = generation;
	this.victories = 0;
}

function fighter_reset(){
	this.currHp = this.body.getHealth();
	return this;
}

Fighter.prototype.getInfo = fighter_getInfo;
Fighter.prototype.getStat = fighter_getStat;
Fighter.prototype.getAttacked = fighter_getAttacked;
Fighter.prototype.attack = fighter_attack;
Fighter.prototype.reset = fighter_reset;
Fighter.prototype.victory = fighter_victory;

function fighter_getInfo(){
	return { 
		name: this.name, 
		currentHealth: this.currHp,
		damage: this.arms.getDamage(),
		speed: this.legs.getSpeed(),
		dodgePercent: this.head.getReflexes(),
		totalScore: this.score,
		generation: this.generation
	 };
}

function fighter_getStat(what){
	switch(what){
		case 'dodge':
			return this.head.getReflexes();
		case 'head':
			return this.head;
		case 'gen':
			return this.generation;
		case 'victories':
			return this.victories;
		case 'name':
			return this.name;
		case 'arms':
			return this.arms;
		case 'body':
			return this.body;
		case 'legs':
			return this.legs;
		case 'hp':
			return this.currHp;
		case 'all':
		default:
			return this.getInfo();
	}
}

function fighter_getAttacked(opposingArms){
	var rngNum = random.integer(1, 100);
	if(rngNum > this.getStat('dodge')){
		this.currHp -= opposingArms.getDamage();
		console.log();
	} else {
		console.log(' * '+this.name+' dodged! * ')
	}
}

function fighter_attack(tgt){
	tgt.getAttacked(this.arms);
}

function fighter_victory(){
	this.victories += 1;
}

function fighter_recycle(){
	return {
		name: this.name,
		arms: this.arms,
		body: this.body,
		head: this.head,
		legs: this.legs,
		score: this.score,
		gen: this.generation
	};
}

function fighter_util_mk(name){
	var fArm = new Arm(name);
	var fBody = new Body(name);
	var fLegs = new Mover(name);
	var fHead = new Head(name);
	return new Fighter(name, fArm, fBody, fLegs, fHead, 1);
}

module.exports = {
	Fighter: Fighter,
	makeFighter: fighter_util_mk
}