/*
	Descreve o Funcionamento do Jogo
*/
var display;
var worman;
var fps = 4;
var refreshCode;
var WIDTH = 128;
var HEIGHT = 80;

function refresh(){
	
	//Movimenta Minhoca
	worman.moveCabeca();
	worman.removeCauda();

	//Detecta Colisao com as Paredes
	if(worman.corpo[0].x >= WIDTH || worman.corpo[0].x < 0 ||
	worman.corpo[0].y >= HEIGHT || worman.corpo[0].y < 0){
		worman.restart();
	}
	
	//Renderiza a Tela
	display.render(worman.corpo);
}

function gameInit(){
	if(!Graphic && !Vector){
		window.setTimeOut(gameInit, 150);
	}
	else {
		display = new Graphic(document.getElementById('nibbles'), WIDTH, HEIGHT);
		worman = new Worm ([new Vector(4, 3),new Vector(3, 3),
				new Vector(2, 3),new Vector(1, 3)], 3);
		display.render(worman.corpo);
		refreshCode = window.setInterval("refresh()", 1000 / fps);
		
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
	var teclado = {up:38, down: 40, left: 37, right: 39, plus: 107, minus: 109};
	
	switch (event.keyCode){
		//Player controls
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
		//Mudar Velocidade
		case teclado.plus:
			fps++;
			window.clearInterval(refreshCode);
			refreshCode = window.setInterval("refresh()", 1000 / fps);
			break;
		case teclado.minus:
			if(fps <= 1){
				break;
			}
			fps--;
			window.clearInterval(refreshCode);
			refreshCode = window.setInterval("refresh()", 1000 / fps);
			break;
		//Outros
			
		default:
			break;
	}
}

window.onload = gameInit;
