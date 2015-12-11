// Evolutionary Fight Club
// v1.amused.0.0.heretical.1449822837.7
// (http://drone-ver.org/ versioning enabled)
//
// Author:
//	Viktor Warg <vwarg@hax.xyz>
// 
// Created:
//	2015-12-11 - Last day of "work" before Xmas holiday :D
// 
// Synopsis:
// 	Creates two breeders to fight eachother, designed to eventually become unbeatable.
//
// Design desicions:
// 	In this PoC, the defeated DNA gets thrown back into the pool to get mixed back into the next generation
// 	When evolving a new fighter, it constructs itself from data in the pool.
//  Current version uses 16 fighters, and pits them against eachother in duels to the DEATH (or at least to depletion of their health)
//
var fighters = new Array();
var breedingPool = new (require('./part-pool')).BreedingPool();
var Fightr = require('./fighter').Fighter;
function FightClub(fighterOne, fighterTwo){
	this.fighterOne = fighterOne;
	this.fighterTwo = fighterTwo;
	this.round = 1;
	this.turn = 0;
}

FightClub.prototype.progressTurn = club_performAction;
FightClub.prototype.status = club_status;

function club_status(){
	return {
		one: this.fighterOne,
		two: this.fighterTwo,
		round: this.round
	};
}
function club_performAction(){
	if(this.turn % 2 === 0){
		var attacker = this.fighterOne;
		var defender = this.fighterTwo;
	} else {
		attacker = this.fighterTwo;
		defender = this.fighterOne;
	}
	attacker.attack(defender);
	if(this.turn % 2 === 0){
		this.fighterTwo = defender;
	}else{
		this.fighterOne = defender;
	}
	this.turn++;
	this.round = Math.max(Math.floor(this.turn/2), 1);
}

module.exports = {
	FightClub: FightClub
}