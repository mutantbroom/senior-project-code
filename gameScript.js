 var name;
  var roundT;
  var pStats;
  var eStats;
  var lastT;
  var roun=1;
  var Player;
  var Enemy;
  var content;
  var turn=0;
  var totalTurn=0;
  var items = ["Health Potion", "Health Potion", "Damage Potion"];
  var itemText;

//constructors for player and enemy
function character(name,health,attack,defense){
               this.name=name;
               this.health=health;
               this.attack=attack;
    this.defense=defense;
}
function player(name,health,attack,defense,inventory){
               character.call(this,name,health,attack,defense);
    			this.inventory=inventory;
		this.getName = function(){
		return this.name;
		};
		this.getHealth = function(){
		return this.health;
		};
		this.changeHealth = function(change){
		this.health -= change;
		};
		this.getAttack = function(){
		return this.attack;
		};
		this.addAttack = function(change){
		this.attack += change;
		};
		this.getDefense = function(){
		return this.defense;
		};
}
function enemy(name,health,attack,defense,round){
               character.call(this,name,health,attack,defense);
               this.round=round;
		this.getName = function(){
		return this.name;
		};
		this.getHealth = function(){
		return this.health;
		};
		this.changeHealth = function(change){
		this.health -= change;
		};
		this.getAttack = function(){
		return this.attack;
		};
		this.getDefense = function(){
		return this.defense;
		};
}


function mainGame () 
{
                gameStart();
                enemySelector();
		eStats= Enemy.getName() + " appeared! It has " + Enemy.getHealth() + " health.";
		textManager();
		
                
}
//puts pStats and eStats into text on screen
function textManager ()
{
	document.getElementById("item").textContent=itemText;
	document.getElementById("roundTurn").textContent=roundT;
	document.getElementById("lastTurn").textContent=lastT;
        document.getElementById("playerStats").textContent= pStats;
    	document.getElementById("enemyStats").textContent= eStats; 
	document.getElementById("content").textContent= content;   

}

function randNum(){
              return Math.round(((Math.random()*10) +1));
}
function gameStart(){
                if(roun==1){
		name = document.getElementById("name").value;
                Player=new player(name, 500, 50, 30, "placeholder items");
                }
                if (roun>=1){ 
                if (name.length > 0)
                {                              
                                document.getElementById("button1").style.visibility= 'hidden';
                                document.getElementById("button2").style.visibility = 'visible';
                                document.getElementById("item1").style.visibility = 'visible';
				document.getElementById("item2").style.visibility = 'visible';
				document.getElementById("item3").style.visibility = 'visible';
				document.getElementById("betweenGame").style.visibility = 'hidden';
				content="";
                }
                pStats="You are " + Player.getName() + ". Your health is " + Player.getHealth() + ".";
		if(roun>1){eStats= Enemy.getName() + " appeared! It has " + Enemy.getHealth() + " health.";}
		itemDisplay();
		turnManager();
		textManager();
		}
}
function enemySelector(){
               var rand = Math.round(Math.random()*2);
    if(rand == 0){
     Enemy=new enemy("bandit", 100, 40, 15, roun);
    }if(rand == 1){
     Enemy=new enemy("troll", 700, 15, 15, roun);
    }if (rand == 2){
     Enemy = new enemy("skeleton", 500, 25, 15, roun);
    }
               
}

function attack(){
               var damage=Math.round((Math.random()*((Player.getAttack()+10)-(Player.getAttack()-10)+1))+(Player.getAttack()-10));
               Enemy.changeHealth(damage);
               lastT=Player.getName() + " attacked and did " + damage + " damage. ";
		enemyDodgeCheck(damage);
		eStats = Enemy.getName() + " has " + Enemy.getHealth() + " health left.";
               enemyTurn();
}
function itemManager(choice){
	if(items[choice-1] === "Health Potion"){
		Player.changeHealth(-50);
		lastT=Player.getName() + " used a health potion and gained 20 health. ";
		eStats = Enemy.getName() + " has " + Enemy.getHealth() + " health left.";
	}if(items[choice-1] === "Damage Potion"){
		Player.addAttack(10);
		lastT=Player.getName() + " used a damage potion and increased their damage. ";
		eStats = Enemy.getName() + " has " + Enemy.getHealth() + " health left.";
	}if(items[choice-1] ==="Empty"){
		lastT=Player.getName() + " did nothing last turn. ";
		eStats = Enemy.getName() + " has " + Enemy.getHealth() + " health left.";
	}
	items[choice-1] = "Empty";
	enemyTurn();

}
function itemDisplay(){
	itemText = "Your inventory has 1. " + items[0] + " 2. " + items[1] + " 3. " + items[2];
	textManager();
}
	
function enemyTurn(){
	eDamage=Math.round((Math.random()*((Enemy.getAttack()+10)-(Enemy.getAttack()-10)+1))+(Enemy.getAttack()-10));
	Player.changeHealth(eDamage);
	playerDodgeCheck(eDamage);    
	pStats = Player.getName() + " has " + Player.getHealth() + " health left.";
	itemDisplay();
	turnManager();
	winCheck();
    	textManager();


}
function enemyDodgeCheck(damage){
	var eDodge = Math.round(((Math.random()*100) +1));
	
	if(Enemy.getDefense() > eDodge){
		var back = 0 - damage;
		Enemy.changeHealth(back);
		lastT = Player.getName() + " attacked but the " + Enemy.getName() + " dodged the attack! ";
	}	
}
function playerDodgeCheck(damage){
	var dodge = Math.round(((Math.random()*100) +1));
	if(Player.getDefense() > dodge){
		var back = 0 - damage;
		Player.changeHealth(back);
		lastT += Enemy.getName() + " attacked but " + Player.getName() + " dodged the attack!";
	}else{
		lastT += Enemy.getName() + " attacked and did " + eDamage + " damage.";
	}

}
function winCheck(){
	if(Enemy.getHealth() <= 0 && Player.getHealth() > 0){
		
		lastT = null;
		eStats = null;
		pStats = null;
		roundT = null;
		itemText = null;
		document.getElementById("button2").style.visibility = 'hidden';
                document.getElementById("item1").style.visibility = 'hidden';
		document.getElementById("item2").style.visibility = 'hidden';
		document.getElementById("item3").style.visibility = 'hidden';
		betweenMatch();
	}
	 if(Player.getHealth() <= 0 && Enemy.getHealth() > 0){
		lastT = null;
		eStats = null;
		pStats = null;
		roundT = null;
		itemText = null;
		document.getElementById("button2").style.visibility = 'hidden';
                document.getElementById("item1").style.visibility = 'hidden';
		document.getElementById("item2").style.visibility = 'hidden';
		document.getElementById("item3").style.visibility = 'hidden';
		content="The " + Enemy.getName() + " defeated you!";
	}
	 if(Player.getHealth() <= 0 && Enemy.getHealth() <= 0){
		lastT = null;
		eStats = null;
		pStats = null;
		roundT = null;
		itemText = null;
		document.getElementById("button2").style.visibility = 'hidden';
                document.getElementById("item1").style.visibility = 'hidden';
		document.getElementById("item2").style.visibility = 'hidden';
		document.getElementById("item3").style.visibility = 'hidden';
		content = "You and the " + Enemy.getName() + " defeated each other at the same time! Unfortunately that still means you lose." ;
	}
	
		


}
function turnManager(){
	turn++;
	totalTurn++;
	roundT="Round: " + roun + " Turn: " + turn;
	textManager();	

}	
function betweenMatch(){		
	roun++;
	turn=0;
	if(roun<4){
	enemySelector();
	Player.changeHealth(-50);
	content="Congratulations! You will face a " + Enemy.getName() + " next. You have been healed to " + Player.getHealth() + " health and your items have been restocked.";
	items[0] = "Health Potion";
	items[1] = "Health Potion";
	items[2] = "Damage Potion";
	document.getElementById("betweenGame").style.visibility = 'visible';
	textManager();


	
	}
	if(roun == 4){
		
		Player.changeHealth(-100);
		Enemy=new enemy("Dragon", 1000, 20, 10, roun);
		content="Boss time! You have to face a dragon next! Beat it and you will win the game!";
		items[0] = "Health Potion";
		items[1] = "Health Potion";
		items[2] = "Damage Potion";
		document.getElementById("betweenGame").style.visibility = 'visible';
		textManager();

	}
	if(roun == 5){
		content="You win! Congratulations! You won with " + Player.getHealth() + " health left. You won the game in " + totalTurn + " turns.";
		textManager();


	
	}
}


