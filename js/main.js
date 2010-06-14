/* Descreve o Funcionamento do Jogo */

//Configuracoes
var defaultFPS = 7;
var FPS = defaultFPS;
var WIDTH = 64;
var HEIGHT = 40;
var POINT = 100;
var MAX_SCORE = 0;

//Game variables
var display;
var worman;
var refreshCode;
var food;
var ate = 0;
var level = 1;

function registerRefresh(){
	return window.setInterval("refresh()", 1000 / FPS);
}

//GameLoop
function refresh(){
	//Movimenta Minhoca
	worman.moveCabeca();

	//Atualiza Estado da Comida
	food.duration--;
	if(food.duration < 0){

		if(food.visible){
			food.randomTime(5);
			food.visible = false;
		}
		else{
			food.randomPosition();
			food.randomStyle();
			food.randomTime(400);
			food.visible = true;
		}
	}

	//Cresce um pouco, se comeu
	if (food.visible && worman.corpo[0].equals(food.pos)) {
		worman.addScore(POINT);
		food.visible = false;
		food.randomTime(5);
		food.randomPosition();
		ate++;
		//Verifica se passou pro proximo Nivel
		if (ate % 5 == 0) {
			level++;
			FPS++;
			window.clearInterval(refreshCode);
			refreshCode = registerRefresh();	
		}

		//Verifica se Ultrapassou o Recorde
		if (worman.score > MAX_SCORE){
			MAX_SCORE = worman.score;
		}
	}
	else {
		worman.removeCauda();
	}

	//Detecta Colisao com as Paredes
	if(worman.corpo[0].x >= WIDTH || worman.corpo[0].x < 0 ||
	worman.corpo[0].y >= HEIGHT || worman.corpo[0].y < 0){
		gameOver();
	}

	//Detecta Colisao com o corpo
	for(var i = 1; i < worman.corpo.length; i++){
		if (worman.corpo[0].equals(worman.corpo[i])) {
			gameOver();
		}
	}

	//Renderiza a Tela
	display.render(worman.corpo, food, worman.score);
}


function gameInit(){
	if (!Graphic || !Vector || !Worm || !Diamond) {
		//Aguarda ate que as Classes estejam carregadas
		window.setTimeOut(gameInit, 150);
	}
	else {
		//Inicializa Jogo
		display = new Graphic(document.getElementById('nibbles'), WIDTH, HEIGHT);
		worman = new Worm ([new Vector(4, 3),new Vector(3, 3),new Vector(2, 3),new Vector(1, 3)], 3);
		food = new Diamond(5/*Frames*/);
		display.render(worman.corpo,food, worman.score);

		//Registra LoopGame
		refreshCode = registerRefresh();
		//Registra Input Listener
		if (!document.addEventListener && document.attachEvent){
			document.attachEvent('onkeydown', keyboardInput);
		} else {
			window.addEventListener('keydown', keyboardInput, true);
		}
	}
}
function gameOver() {
	//Restaura Velocidade Inicial
	level = 0;
	ate = 0;
	FPS = defaultFPS;
	window.clearInterval(refreshCode);
	refreshCode = registerRefresh();
	//Reinicia minhoca
	worman.restart();
	worman.resetScore();
}

function keyboardInput(event){
	var teclado = {up:38, down: 40, left: 37, right: 39, plus: 107, minus: 109};

	switch (event.keyCode){
		//Player controls
		case teclado.up:
			if (worman.direcao != 1) {
				worman.direcao = 0;
			}
			break;
		case teclado.down:
			if (worman.direcao != 0) {
				worman.direcao = 1;
			}
			break;
		case teclado.left:
			if (worman.direcao != 3) {
				worman.direcao = 2;
			}
			break;
		case teclado.right:
			if (worman.direcao != 2) {
				worman.direcao = 3;
			}
			break;
		/* //Mudar Velocidade
		case teclado.plus:
			FPS++;
			window.clearInterval(refreshCode);
			refreshCode = registerRefresh();
			break;
		case teclado.minus:
			if(FPS <= 1){
				break;
			}
			FPS--;
			window.clearInterval(refreshCode);
			refreshCode = registerRefresh();
			break;
		//Outros*/

		default:
			break;
	}
}

window.onload = gameInit;
