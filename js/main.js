/* Descreve o Funcionamento do Jogo */

var game;
function gameInit(){
	if (Graphic === undefined ||
		Nibbles === undefined ||
		Vector === undefined||
		Worm === undefined ||
		Diamond === undefined) {
		//Aguarda ate que as Classes estejam carregadas
		window.setTimeOut(gameInit, 150);
	}
	else {
		//Inicializa Jogo
		game = new Nibbles( document.getElementById('nibbles'),
				[new Worm ([new Vector(4, 3),
					new Vector(3, 3),
					new Vector(2, 3),
					new Vector(1, 3)],
					3)]);
		//Registra Controle
		//Registra Input Listener
		if (!document.addEventListener && document.attachEvent){
			document.attachEvent('onkeydown', keyboardInput);
		} else {
			window.addEventListener('keydown', keyboardInput, true);
		}
		//Inicia Jogo
		game.start();
	}
}

function keyboardInput (event) {
	var teclado = {up:38, down: 40, left: 37, right: 39, plus: 107, minus: 109};
	
	switch (event.keyCode){
		//Player controls
		case teclado.up:
			if (game.worms[0].direcao != 1) {
				game.worms[0].direcaoPretendida = 0;
			}
			break;
		case teclado.down:
			if (game.worms[0].direcao != 0) {
				game.worms[0].direcaoPretendida = 1;
			}
			break;
		case teclado.left:
			if (game.worms[0].direcao != 3) {
				game.worms[0].direcaoPretendida = 2;
			}
			break;
		case teclado.right:
			if (game.worms[0].direcao != 2) {
				game.worms[0].direcaoPretendida = 3;
			}
			break;
		default:
			break;
	}
};
window.onload = gameInit;
