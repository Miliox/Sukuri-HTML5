/* Descreve o Funcionamento do Jogo */

//Game Nibbles
function Nibbles(canvas, worms) {
	//Game Constants
	this.WIDTH = 64;
	this.HEIGHT = 40;
	this.POINT = 100;
	this.DEFAULTFPS = 7;
	this.INCFPS = 1;

	//Game Objects
	this.display = new Graphic(canvas, this.WIDTH, this.HEIGHT);
	this.worms = worms;	//Array de Worms
	this.food = new Diamond(5, this.WIDTH, this.HEIGHT);

	//Game Variables
	this.ate = 0;
	this.level = 1;
	this.maxScore = 0;
	this.fps = this.DEFAULTFPS;

	//ID do Evento
	this.loopCode = null;
}

Nibbles.prototype.start = function () {
		//Registra LoopGame
		this.registerLoopGame();
		//Registra Input Listener
		if (!document.addEventListener && document.attachEvent){
			document.attachEvent('onkeydown', this.keyboardInput);
		} else {
			window.addEventListener('keydown', this.keyboardInput, true);
		}
};

Nibbles.prototype.gameOver = function () {
	//Restaura Velocidade Inicial
	this.level = 0;
	this.ate = 0;
	this.fps = this.DEFAULTFPS;
	window.clearInterval(loopCode);
	this.registerLoopGame();
	//Reinicia minhoca
	this.worms[0].restart();
	this.worms[0].resetScore();
};

Nibbles.prototype.loopGame = function () {
	var worm, i;

	//Atualiza Estado da Comida
	this.food.duration--;
	if(this.food.duration < 0){

		if(this.food.visible){
			this.food.randomTime(5);
			this.food.visible = false;
		}
		else{
			this.food.randomPosition();
			this.food.randomStyle();
			this.food.randomTime(400);
			this.food.visible = true;
		}
	}


	for (i=0;i < this.worms.length;i++) {
		worm = this.worms[i];
		//Movimenta minhoca
		worm.moveCabeca();

		//Cresce um pouco, se comeu
		if (this.food.visible && worm.corpo[0].equals(this.food.pos)) {
			worm.addScore(this.POINT);
			this.food.visible = false;
			this.food.randomTime(5);
			this.food.randomPosition();
			this.ate++;
			//Verifica se passou pro proximo Nivel
			if (this.ate % 5 == 0) {
				this.level++;
				this.fps += this.INCFPS;
				window.clearInterval(this.loopCode);
				this.registerLoopGame();
			}

			//Verifica se Ultrapassou o Recorde
			if (worm.score > this.maxScore){
				this.maxScore = worm.score;
			}
		}
		else {
			worm.removeCauda();
		}

		//Detecta Colisao com as Paredes
		if(worm.corpo[0].x >= this.WIDTH ||
		worm.corpo[0].x < 0 ||
		worm.corpo[0].y >= this.HEIGHT ||
		worm.corpo[0].y < 0){
			this.gameOver();
		}

		//Detecta Colisao com o corpo
		for(i = 1; i < worm.corpo.length; i++){
			if (worm.corpo[0].equals(worm.corpo[i])) {
				this.gameOver();
			}
		}
	}//for in worms
	//Renderiza a Tela
	this.display.render(this.worms, this.food, this.maxScore, this.level);
};

Nibbles.prototype.keyboardInput = function (event) {
	var teclado = {up:38, down: 40, left: 37, right: 39, plus: 107, minus: 109};

	switch (event.keyCode){
		//Player controls
		case teclado.up:
			if (this.worms[0].direcao != 1) {
				this.worms[0].direcaoPretendida = 0;
			}
			break;
		case teclado.down:
			if (this.worms[0].direcao != 0) {
				this.worms[0].direcaoPretendida = 1;
			}
			break;
		case teclado.left:
			if (this.worms[0].direcao != 3) {
				this.worms[0].direcaoPretendida = 2;
			}
			break;
		case teclado.right:
			if (this.worms[0].direcao != 2) {
				this.worms[0].direcaoPretendida = 3;
			}
			break;
		default:
			break;
	}
};

Nibbles.prototype.registerLoopGame = function () {
	self = this;
	this.loopCode = window.setInterval("game.loopGame()", 1000 / this.fps);
};
