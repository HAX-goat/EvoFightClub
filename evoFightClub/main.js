var prompt = require('prompt');
var fighters = new Array();
var Fighter = require('./fighter').Fighter;
var fght = require('./fighter');
var FightClub = require('./fightclub').FightClub;
var breedingPool = new (require('./part-pool')).BreedingPool();
var currFight = null;
var currInterval = -1;
var genGap = 1;
var currGen = 1;
var maxFighters = -1;
require('console.table');




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
  
  prompt.message = "Enter amount of";
  prompt.start();
  prompt.get('generations', function (err, result) {
    genGap = result.generations;
    prompt.get('fighters', function (err, fAnsw) {
      maxFighters = fAnsw.fighters;
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
  }
  if(fighters.length <= 1){
    if(currGen > genGap){
      console.log('All done! :D');
      restart();
    }
    currGen++;
    
    //bring in the kids!
    var newFighter = breedingPool.getNewFighter();
    while(newFighter !== -80085 && fighters.length < maxFighters){
      fighters.push(newFighter);
      newFighter = breedingPool.getNewFighter();
    }
    fighters = util_arrayShuffle(fighters);
  }
  var fOne = fighters.pop();
  var fTwo = fighters.pop();
  currFight = new FightClub(fOne, fTwo);
  currInterval = setInterval(runTurn, 8*1000);
  runTurn();
}
function util_clearConsole(){
  var lines = process.stdout.getWindowSize()[1];
  for(var i = 0; i < lines; i++) {
      console.log('\r\n');
  }
}
function runTurn(){
  var stat = currFight.status();
  if(stat.one.getStat('hp') <= 0 || stat.two.getStat('hp') <= 0){
    util_clearConsole();
    var winner = (stat.one.getStat('hp') <= 0 ? stat.two : stat.one);
    var loser = (stat.one.getStat('hp') <= 0 ? stat.one : stat.two);
    console.log('Victory!! Fighter '+ winner.getStat('name')  +' won in round ' + stat.round);
    clearInterval(currInterval);
    breedingPool.addFighter(loser);
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