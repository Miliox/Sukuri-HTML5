/* Descreve o Funcionamento do Jogo */
var game;

function gameInit(){
	/*Execute o Jogo*/
	if (Graphic === undefined ||
		Nibbles === undefined ||
		Vector === undefined||
		Worm === undefined ||
		Diamond === undefined ||
		Matriz === undefined) {
		//Aguarda ate que as Classes estejam carregadas
		window.setTimeOut(gameInit, 150);
	}
	else {
		//Inicializa Jogo
		var w0 = new WormHuman([new Vector(4,3),new Vector(3,3),new Vector(2,3),new Vector(1,3)],"left", "red");
		//var teclado_codes_w1 = {up : 87, down : 83, left : 65, right: 68};
		var w1 = new WormBot([new Vector(91,46),new Vector(92,46),new Vector(93,46),new Vector(94,46)],"right", "blue");
		var w2 = new WormBot([new Vector(4,46),new Vector(3,46),new Vector(2,46),new Vector(1,46)],"left", "yellow");
		var w3 = new WormBot([new Vector(91,3),new Vector(92,3),new Vector(93,3),new Vector(94,3)],"right", "green");
		game = new Nibbles(document.getElementById('nibbles'),[w0,w1,w2,w3]);
		//Registra Controle
		window.addEventListener('keydown', keyboardInput, true);
		//Inicia Jogo
		game.start();
	}
}

function keyboardInput (event) {
	game.inputRegister(event.keyCode);
};
function waitEnter (event) {
	switch (event.keyCode){
		//player controls
		case 13: //enter
			window.removeEventListener('keydown', waitEnter, true);
			gameInit();
			break;
		case 32: //space
			about();
			break;
		}
}
window.onload = menu;
