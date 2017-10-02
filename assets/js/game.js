//function to populate the character buttons into html
function loadCharacter(){
	for(i in characterOptions){
		var image = $("<img>");
		image.attr("src", characterOptions[i].portrait);

		var button = $("<button>");
		button.attr("id", characterOptions[i].id);
		button.addClass("char-btn");
		button.append(image);

		$("#character-select").append(button)
	}
}