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
		var w0 = new WormHuman([new Vector(4,3),new Vector(3,3),new Vector(2,3),new Vector(1,3)],1, "red");
		//var teclado_codes_w1 = {up : 87, down : 83, left : 65, right: 68};
		var w1 = new WormBot([new Vector(52,38),new Vector(53,38),new Vector(54,38),new Vector(55,38)],3, "blue");
		game = new Nibbles(document.getElementById('nibbles'),[w0,w1]);
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
