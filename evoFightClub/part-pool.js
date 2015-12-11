
var Arm = require('./parts/arms').Arm;
var Body = require('./parts/body').Body;
var Mover = require('./parts/mover').Mover;
var sleep = require('sleep');
var Fighter = require('./fighter').Fighter;

var Head = require('./parts/head').Head;
var Random = require("random-js");
var random = new Random(Random.engines.mt19937().autoSeed());

var util = require('util');

function BreedingPool(max){ 
	this.maxFighters = max;
	//	BreedingPool - Where all defeated fighters breed :D
	this.breedingFighters = new Array();
	this.newKidsOnTheBlock = new Array();
}
BreedingPool.prototype.addFighter = bp_addFighter;
BreedingPool.prototype.breed = bp_breed_new;
BreedingPool.prototype.getNewFighter = bp_stealKid;

function bp_addFighter(dedDood){
	
	this.breedingFighters.push(dedDood);
	//this.breed();
}
function bp_util_compare_victories(a, b){
	//console.log('a: '+a.getStat('name')+', b: '+b.getStat('name') + ' | b-a: '+(b.getStat('victories') - a.getStat('victories')));
	return b.getStat('victories') - a.getStat('victories');
}
function bp_breed_new(){
	this.breedingFighters.sort(bp_util_compare_victories);
	
	while(this.newKidsOnTheBlock.length < this.maxFighters){
		var pOne = this.breedingFighters.shift();
		
		var oneWins = Math.max(1, pOne.getStat('victories'));
		for(var idx = 0; idx < oneWins && idx < this.breedingFighters.length; idx++){
			this.newKidsOnTheBlock.push(bp_util_breed(pOne, this.breedingFighters[idx]));
		}
	}
	this.newKidsOnTheBlock = bp_util_arrayShuffle(this.newKidsOnTheBlock);
}

function bp_breed(){
	if(this.breedingFighters.length % 2 !== 0 && this.breedingFighters.length === 1){
		//only one poor dead dude, no breeding for him!
		return -1;
	}
	//randomize parents, no cartesian product kids tyvm
	//two parents gives two kids
	//because no declining populations! :D
	this.breedingFighters = bp_util_arrayShuffle(this.breedingFighters);
	
	var parents = new Array();
	parents.push(this.breedingFighters.pop());
	parents.push(this.breedingFighters.pop());
	this.newKidsOnTheBlock.push(bp_util_breed(parents[0], parents[1]));
	this.newKidsOnTheBlock.push(bp_util_breed(parents[1], parents[0]));
	
}

function bp_stealKid(){
	
	if(this.newKidsOnTheBlock.length > 0){
		return this.newKidsOnTheBlock.shift();
	} else {
		return -80085;
	}
}
function bp_util_breed(pOne, pTwo){
	var kidName = bp_util_mixNames(pOne, pTwo);
	var kidArm = new Arm(kidName);
	var pArmAvg = (pOne.getStat('arms').getScore() + pTwo.getStat('arms').getScore())/2;
	kidArm.breed(pArmAvg);
	var kidBdy = new Body(kidName);
	var pBdyAvg = (pOne.getStat('body').getScore() + pTwo.getStat('body').getScore())/2;
	kidBdy.breed(pBdyAvg);
	var kidLeg = new Mover(kidName);
	var pLegAvg = (pOne.getStat('legs').getScore() + pTwo.getStat('legs').getScore())/2;
	kidLeg.breed(pLegAvg);
	var kidHed = new Head(kidName);
	var pHedAvg = (pOne.getStat('head').getScore() + pTwo.getStat('head').getScore())/2;
	kidHed.breed(pHedAvg);
	var kid = new Fighter(kidName, kidArm, kidBdy, kidLeg, kidHed, (Math.max(pOne.getStat('gen'), pTwo.getStat('gen'))+1));
	return kid;
}
function bp_util_mixNames(parentOne, parentTwo){
		
	//decide new length
	var oneFirst = random.bool(50);
	var numberONE = oneFirst ? parentOne : parentTwo;
	var numberTWO = numberONE == parentOne ? parentTwo : parentOne;
	var kidLength = Math.min(numberONE.getStat('name').length, numberTWO.getStat('name').length);
	var kidName = '';
	for(var i = 0; i < kidLength; i++){
		if(i % 2 === 0){
			kidName += numberONE.getStat('name').charAt(i);
		} else {
			kidName += numberTWO.getStat('name').charAt(i);
		}
		console.log('___kid: '+kidName);
	}
	// var kidName = numberONE.getStat('name').substr(0, Math.min((kidLength/2), numberONE.getStat('name').length));
	// kidName += numberTWO.getStat('name').substr(Math.min((kidLength/2), (numberTWO.getStat('name').length/2)));
	return kidName;
}

function bp_util_arrayShuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

module.exports = {
	BreedingPool: BreedingPool
}