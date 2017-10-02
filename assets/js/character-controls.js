//The player
var selectedCharacter = {
	hp: 0,
	hpMultiplier: 0,
	level: 0,
	exp: 0,
	attackPower: 0,
	attackPowerMultiplier: 0,
	blockStr: 0,
	blockStrMultiplier: 0,
	defeated: false,
	healing: [0, 0, 0], //set to hold counter of pots carrying in the order of s, m, l
	expWorth: 0,


	attack: function(){
		//range is attackPower to 2 x attackPower-1
		return Math.floor(Math.random() * (this.attackPower))+this.attackPower;
	},

	block: function(dmg){
		//calc for damage reduction
		var percentage = Math.floor(Math.random()* ((this.blockStr+20) - this.blockStr))+this.blockStr;
		this.hp = this.hp - (dmg * (percentage/100.0));

		//TODO: Figure out if dead or how to accommodate that

		//returns the damage of the counter as a pertcentage of attack str (hardcoded as 20%)
		return Math.round(attack() * 0.2);
	},

	//figures out if the player has leveled and increases
	levelUp: function(expGained){
		character = this;
		
		//checks to see if exp exceeds current level range, but only if level is not current max
		if(character.level < (exp_chart.length + 1)){
			character.exp = character.exp + expGained; //only adds to exp pool if you are not max level
			var tempIndex = 0;
			while(exp_chart[tempIndex] <= character.exp){
				tempIndex++;
			}

			//check to see if an actual level was gained
			if(character.level < tempIndex + 1){
				//calls the increaseStats for each new level increase
				for(var i = 0; i < (tempIndex + 1) - character.level; i++)
					character.increaseStats();
				character.level = tempIndex + 1;
				
			}
		}
	},

	//increases the stats from leveling up
	increaseStats: function(){
		this.attackPower = this.attackPower + this.attackPowerMultiplier;
		this.blockStr = this.blockStr + this.blockStrMultiplier;
		this.hp = this.hp + this.hpMultiplier;
	},

	//increases the amount being carried by 1 and returns true, else returns false due to being full
	pickUpHealing: function(type){
		var character = this;

		//checks to see which type and then how much you are carrying
		if(type == "s"){
			if(character.healing[0] < max_healing_carry_small[character.level - 1]){
				character.healing[0] = character.healing[0] + 1;
			}
			else
				return false;
		}
		else if(type == "m"){
			if(character.healing[1] < max_healing_carry_med[character.level - 1]){
				character.healing[1] = character.healing[1] + 1;
			}
			else
				return false;
		}
		else if(type == "l"){
			if(character.healing[2] < max_healing_carry_lrg[character.level - 1]){
				character.healing[2] = character.healing[2] + 1;
			}
			else
				return false;
		}

		return true;
	}

	//TODO: CODE THE USE ITEM FUNCTION
}

//holds the info on the current person player is fighting
var combatCharacter = {
	hp: 0,
	level: 0,
	attackPower: 0,
	blockStr: 0,
	defeated: false,
	expWorth: 0,


	attack: function(){
		//range is attackPower to 2 x attackPower-1
		return Math.floor(Math.random() * (this.attackPower))+attackPower;
	},

	block: function(dmg){
		//calc for damage reduction
		var percentage = Math.floor(Math.random()* ((this.blockStr+20) - this.blockStr))+this.blockStr;
		this.hp = this.hp - (dmg * (percentage/100.0));

		//TODO: Figure out if dead or how to accommodate that

		//returns the damage of the counter as a pertcentage of attack str (hardcoded as 20%)
		return Math.round(attack() * 0.2);
	}
}