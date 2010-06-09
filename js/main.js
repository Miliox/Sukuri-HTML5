/*
	Descreve o Funcionamento do Jogo
*/
var game;

function gameInit(){
	if(Graphic && Worm && Nibbles){
		game = new Nibbles;
		game.start();
	}
	else{
		setTimeOut(gameInit, 150);
	}

}


window.onload = gameInit;
