
var Arm = require('./parts/arms').Arm;
var Body = require('./parts/body').Body;
var Mover = require('./parts/mover').Mover;

var Fighter = require('./fighter').Fighter;

function BreedingPool(){ 
	//	BreedingPool - Where all defeated fighters breed :D
	this.defeatedFighters = new Array();
	this.newKidsOnTheBlock = new Array();
}
BreedingPool.prototype.addFighter = bp_addFighter;
BreedingPool.prototype.breed = bp_breed;
BreedingPool.prototype.getNewFighter = bp_stealKid;

function bp_addFighter(dedDood){
	this.defeatedFighters.push(dedDood);
	this.breed();
}

function bp_breed(){
	if(this.defeatedFighters.length % 2 !== 0 && this.defeatedFighters.length === 1){
		//only one poor dead dude, no breeding for him!
		return -1;
	}
	//randomize parents, no cartesian product kids tyvm
	//two parents gives two kids
	//because no declining populations! :D
	this.defeatedFighters = bp_util_arrayShuffle(this.defeatedFighters);
	
	var parents = new Array();
	parents.push(this.defeatedFighters.pop());
	parents.push(this.defeatedFighters.pop());
	var kidNames = new Array();
	this.newKidsOnTheBlock.push(bp_util_breed(parents[0], parents[1]));
	this.newKidsOnTheBlock.push(bp_util_breed(parents[1], parents[0]));
	
}

function bp_stealKid(){
	if(this.newKidsOnTheBlock.length > 0){
		this.newKidsOnTheBlock = bp_util_arrayShuffle(this.newKidsOnTheBlock);
		return this.newKidsOnTheBlock.pop();
	} else {
		return -80085;
	}
}
function bp_util_breed(pOne, pTwo){
	var kidName = bp_util_mixNames(pOne, pTwo);
	var kidArm = new Arm(kidName);
	var pArmAvg = (pOne.arms.getScore() + pTwo.arms.getScore())/2;
	kidArm.breed(pArmAvg);
	var kidBdy = new Body(kidName);
	var pBdyAvg = (pOne.body.getScore() + pTwo.body.getScore())/2;
	kidBdy.breed(pBdyAvg);
	var kidLeg = new Mover(kidName);
	var pLegAvg = (pOne.legs.getScore() + pTwo.legs.getScore())/2;
	kidLeg.breed(pLegAvg);
	var kid = new Fighter(kidName, kidArm, kidBdy, kidLeg, (Math.max(pOne.gen, pTwo.gen)+1));
	return kid;
}
function bp_util_mixNames(parentOne, parentTwo){
	//decide new length
	var kidLength = Math.max(parentOne.name.length, parentTwo.name.length);
	var kidName = parentOne.name.substr(0, Math.min((kidLength/2), parentOne.name.length));
	kidName += parentTwo.name.substr(Math.min((kidLength/2), (parentTwo.name.length/2)));
	return kidName;
}

function bp_util_arrayShuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

module.exports = {
	BreedingPool: BreedingPool
}