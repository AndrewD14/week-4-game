//game global variables
var charactersInPlay = [];

//function to populate the character buttons into html
function loadCharacter(){
	//clear the select area
	$("#characters").empty();

	//clear the enemies
	$("#enemies button").remove();

	//adds the characters to the select area
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

	//hides the play again button
	$("#play-again").hide();

	//resets the elements on the page
	$("#defender button").remove();
	$("#main-character button").remove();
	$("#combat-log").empty();

	//makes sure the character selected array is empyt
	while(charactersInPlay.length)
		charactersInPlay.pop();

	//assigns the function to the buttons
	$(".char-btn").on("click", selectCharacter);
}

//gets the selected character ready
function selectCharacter(){
	//adds to the list of characters in play
	if(charactersInPlay.length < 2){
		//clears the log first
		$("#combat-log").empty();

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
			$(this).css('background-color', "red");
			var temp = $(this).detach();
			temp.addClass("pull-right");
			$("#defender").append(temp);

			//disables the button from being clickable after selecting
			$(this).prop("disabled", true);
		}
	}//checks to see if we already have 2 characters selected
}

//calls the logic to run through a round of attacking
function attacking(){
	//checks to make sure we have all the characters selected first
	if(charactersInPlay.length == 2){
		//clears the log first
		$("#combat-log").empty();

		//local variables
		var dmg = charactersInPlay[0].attack();

		//adds to the combat log
		var log = $("<p>");
		log.html(charactersInPlay[0].name + " deals "+ dmg + " to "+charactersInPlay[1].name + ".");
		$("#combat-log").append(log);

		//player attacking
		var dead = charactersInPlay[1].takeDamage(dmg);

		//updates the defender's hp
		$("#defender button p:last").html(charactersInPlay[1].hp);

		//check if npc is dead
		if(dead){
			//removes from the html
			$("#defender button").remove();

			//notifies the player kill the npc
			log = $("<p>");
			log.html(charactersInPlay[0].name + " defeats "+ charactersInPlay[1].name + ".");
			$("#combat-log").append(log);

			//removes from the end of the array of characters
			charactersInPlay.pop();

			//sees if all enemies are defeated
			if($("#enemies").children().length == 1){
				log = $("<h2>");
				log.html("You WIN!!!");
				log.attr("id", "win");
				$("#combat-log").append(log);
				
				//shows the play again button
				$("#play-again").show();
			}
		}
		//npc is not dead, counters
		else {
			dmg = charactersInPlay[1].counter();

			//adds to the combat log
			log = $("<p>");
			log.html(charactersInPlay[1].name + " deals "+ dmg + " to "+charactersInPlay[0].name + ".");
			$("#combat-log").append(log);

			dead = charactersInPlay[0].takeDamage(dmg);

			//updates the attackers's hp
			$("#main-character button p:last").html(charactersInPlay[0].hp);

			//game over
			if(dead){
				//removes from the beginning of the array of characters
				charactersInPlay.pop(0);

				//removes the main character from the page
				$("#main-character button").remove();

				//shows the play again button
				$("#play-again").show();

				//adds to log you lose
				log = $("<h2>");
				log.html("You lose.");
				log.attr("id", "lose");
				$("#combat-log").append(log);
			}
		}
	}//checks for the characterInPlay size for 2
}