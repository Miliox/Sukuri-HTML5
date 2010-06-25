/* Descreve o Funcionamento do Jogo */
var game;

function gameInit(){
		//Inicializa Jogo
	var w0body = [new Vector(4,3),new Vector(3,3),new Vector(2,3),new Vector(1,3)];
	var w1body = [new Vector(91,43),new Vector(92,43),new Vector(93,43),new Vector(94,43)];
	var w2body = [new Vector(4,43),new Vector(3,43),new Vector(2,43),new Vector(1,43)];
	var w3body = [new Vector(91,3),new Vector(92,3),new Vector(93,3),new Vector(94,3)];
	var w0 = new WormHuman(w0body,"left", "red");
	var w1 = new WormBot(w1body,"right", "blue");
	var w2 = new WormBot(w2body,"left", "yellow");
	var w3 = new WormBot(w3body,"right", "green");
	game = new Nibbles(document.getElementById('nibbles'),[w0,w1,w2,w3]);
	//Registra Controle
	window.addEventListener('keydown', keyboardInput, true);
	//Inicia Jogo
	game.start();
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
