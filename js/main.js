/*
	Descreve o Funcionamento do Jogo
*/
var display;
var worman;

function refresh(){
	worman.moveCabeca();
	worman.removeCauda();
	display.render(worman.corpo);
}

function gameInit(){
	if(!Graphic && !Vector){
		window.setTimeOut(gameInit, 150);
	}
	else {
		display = new Graphic(document.getElementById('nibbles'), 128, 80);
		worman = new Worm ([new Vector(4, 3),
					new Vector(3, 3),
					new Vector(2, 3),
					new Vector(1, 3)], 3);
		display.render(worman.corpo);
		window.setInterval("refresh()", 250);
		
		//Evento
		if (!document.addEventListener && document.attachEvent){
			// IE
			document.attachEvent('onkeydown', mudaDirecao);
		} else {
			window.addEventListener('keydown', mudaDirecao, true);
		}
	}
	
	/*Esboço
	if(Graphic && Worm && Nibbles){
		game = new Nibbles;
		game.start();
	}
	else{
		document.setTimeOut(gameInit, 150);
	}*/

}

function mudaDirecao(event){
	var teclado = {up:38, down: 40, left: 37, right: 39};
	
	switch (event.keyCode){
		//Player 0 controls
		case teclado.up:
			worman.direcao = 0;
			break;
		case teclado.down:
			worman.direcao = 1;
			break;
		case teclado.left:
			worman.direcao = 2;
			break;
		case teclado.right:
			worman.direcao = 3;
			break;
		//Outros
		default:
			break;
	}
}

window.onload = gameInit;
