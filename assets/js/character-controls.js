//The general character class
var characterControls = function(){};
characterControls.prototype = {
	hp: 0,
	attackPower: 0,
	attackPowerMultiplier: 0,
	counterAttackPower: 0,
	name: "",

	//loads the values in the object
	populate: function(data){
		this.hp = data.hp;
		this.attackPower = data.attackPower;
		this.attackPowerMultiplier = data.attackPower;
		this.counterAttackPower = data.counterAttackPower;
		this.name = data.name;
	},

	//runs the attack rules
	attack: function(){
		//stores the current attackPower to use since the =+ does not work in Javascript like it does in Java
		var previousAttack = this.attackPower;

		//increases attackPower
		this.attackPower += this.attackPowerMultiplier;

		//returns the damage that was delt
		return previousAttack;
	},

	//runs the counter rules
	counter: function(){
		//returns the damage for countering
		return this.counterAttackPower;
	},

	//figures out damage and returns true for dead, false for not dead
	takeDamage: function(dmg){
		this.hp = this.hp - dmg;

		//determines after taking damage if the character is dead
		if(this.hp <= 0)
			return true;
		else
			return false;
	},

	//gets the current hp of the character
	getHp: function(){
		return this.hp;
	}
};