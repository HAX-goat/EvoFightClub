var prompt = require('prompt');
var fighters = new Array();
var Fighter = require('./fighter').Fighter;
var fght = require('./fighter');
var FightClub = require('./fightclub').FightClub;
var BP = require('./part-pool').BreedingPool;
var breedingPool = null;
var currFight = null;
var currInterval = -1;
var genMax = 1;
var currGen = 1;
var maxFighters = -1;

var sleep = require('sleep');
require('console.table');
var currentPool = new Array();
var nextPool = new Array();
var Random = require("random-js");
var random = new Random(Random.engines.mt19937().autoSeed());




function makeFighter(nem) {
  fighters.push(fght.makeFighter(nem));
  //console.log('len: '+fighters.length);
  //rl.prompt();
}

function readyMenu(){
  prompt.message = "Ready? (y/n or q for Quit)";
  prompt.get('ready', function(err, rdy){
        switch(rdy.ready){
          case 'q':
          case 'Q':
            cleanUp();
            break;
          case 'y':
          case 'Y':
            getStarted(0);
            break;
          case 'n':
          case 'N':
          default:
            restart();
        }
      });
}
function getFighters(){
  prompt.message = "Name";
  prompt.get('name', function(err, nameRes){
    makeFighter(nameRes.name);
    //console.log('len: '+fighters.length + ' | tgt: '+maxFighters);
    if(fighters.length == maxFighters){
      readyMenu();
    }else{
      getFighters();
    }
  });
}
function restart(){
  console.log('Breeding Fight Club v1');
  console.log();
  currentPool = new Array();
  nextPool = new Array();
  
  prompt.message = "Enter amount of";
  prompt.start();
  prompt.get('generations', function (err, result) {
    genMax = result.generations;
    prompt.get('fighters', function (err, fAnsw) {
      maxFighters = fAnsw.fighters;
      breedingPool = new BP(maxFighters);
      console.log('Enter '+maxFighters+' names, separated by [ENTER].');
      getFighters();
      
    });
  });
}
      
function util_arrayShuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function getStarted(game){
  if(game === 0){
    fighters = util_arrayShuffle(fighters);
    currentPool = fighters;
  }
  if(currentPool.length == 0){
    if(currGen > genMax){
      console.log('**************');
      console.log('*HALL OF FAME*');
      console.log('**************');
      console.log('--------------');
      for(var i = 0; i < pastWinners.length; i++){
        console.log('Gen '+i+': '+pastWinners[i].getStat('name'));
        console.log('--------------');
      }
      console.log();
      console.log();
      restart();
      return;
    }
    if(nextPool.length == 1){
      breedingPool.addFighter(nextPool[0]);
      nextPool = new Array();
      currGen++;
    
      //bring in the kids!
      breedingPool.breed();
      var newFighter = breedingPool.getNewFighter();
      while(newFighter !== -80085 && currentPool.length < maxFighters){
        currentPool.push(newFighter);
        newFighter = breedingPool.getNewFighter();
      }
      currentPool = util_arrayShuffle(currentPool);
    } else {
      currentPool = nextPool;
      nextPool = new Array();
    }
    
  }
  if(currentPool.length == 1){
    var luckyFighter = currentPool.shift();
    nextPool.push(luckyFighter);
    currentPool = nextPool;
    nextPool = new Array();
  }
  var fOne = currentPool.shift();
  var fTwo = currentPool.shift();
  currFight = new FightClub(fOne, fTwo);
  currInterval = setInterval(runTurn, 2*1000);
  runTurn();
}
function util_clearConsole(){
  var lines = process.stdout.getWindowSize()[1];
  for(var i = 0; i < lines; i++) {
      console.log('\r\n');
  }
}
var pastWinners = new Array();
function runTurn(){
  var stat = currFight.status();
  if(stat.one.getStat('hp') <= 0 || stat.two.getStat('hp') <= 0){
    util_clearConsole();
    var winner = (stat.one.getStat('hp') <= 0 ? stat.two : stat.one);
    var loser = (stat.one.getStat('hp') <= 0 ? stat.one : stat.two);
    console.log('Victory!! Fighter '+ winner.getStat('name')  +' won in round ' + stat.round);
    clearInterval(currInterval);
    breedingPool.addFighter(loser);
    winner.victory();
    if(currentPool.length == 0 && nextPool.length == 0){
      //breedingPool.addFighter(winner);
      pastWinners.push(winner);
    }
    nextPool.push(winner);
    getStarted(currGen);
    return;
  }
  util_clearConsole();
  console.log('Round '+stat.round);
  console.table([stat.one.getInfo(), stat.two.getInfo()]);
  currFight.progressTurn();
}

function cleanUp(){
  process.exit(0);
}

restart();

function util_log(data){
  console.log();
	console.log(data);
	console.log();
	sleep.sleep(5);
}