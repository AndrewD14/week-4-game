//game global variables
var charactersInPlay = [];
var chosenCharacter = false;

//function to populate the character buttons into html
function loadCharacter(){
	for(i in characterOptions){
		var name = $("<p>");
		name.text(characterOptions[i].name);

		var image = $("<img>");
		image.attr("src", characterOptions[i].portrait);

		var hp = $("<p>");
		hp.text(characterOptions[i].hp);

		var button = $("<button>");
		button.attr("charPick", i);
		button.addClass("char-btn");
		button.append(name);
		button.append(image);
		button.append(hp);

		$("#characters").append(button);
	}

	//assigns the function to the buttons
	$(".char-btn").on("click", selectCharacter);

	//assigns the attack button to the element on the page
	$("#attack").on("click", attacking);
}

//gets the selected character ready
function selectCharacter(){
	//adds to the list of characters in play
	if(charactersInPlay.length < 2){
		var newCharacter = new characterControls();
		newCharacter.populate(characterOptions[$(this).attr("charPick")]);

		charactersInPlay.push(newCharacter);

		//adds the character to the Your Character section
		if(charactersInPlay.length == 1){
			$(this).css('background-color', "green");
			var temp = $(this).detach();
			$("#main-character").append(temp);

			//disables the button from being clickable after selecting
			$(this).prop("disabled", true);

			//moves the remaining childs to the enemy section
			$("#enemies").append($("#characters>button"));
		}
		//adds the enemies to the defender section
		else {
			$(this).css('background-color', "blue");
			var temp = $(this).detach();
			$("#defender").append(temp);

			//disables the button from being clickable after selecting
			$(this).prop("disabled", true);
		}

	}
}

//calls the logic to run through a round of attacking
function attacking(){
	//player attacking
	var dead = charactersInPlay[1].takeDamage(charactersInPlay[0].attack());

	//updates the defender's hp
	$("#defender p:last").text(charactersInPlay[1].hp);

	//check if npc is dead
	if(dead){
		alert("He is dead, tom!");
	}
	else {
		dead = charactersInPlay[0].takeDamage(charactersInPlay[1].attack());

		//updates the attackers's hp
		$("#main-character p:last").text(charactersInPlay[0].hp);

		//game over
		if(dead){
			alert("You are dead, tom!");
		}
	}
}