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
		game.start();
	}
}
window.onload = gameInit;
