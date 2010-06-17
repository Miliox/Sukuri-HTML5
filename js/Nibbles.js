/* Descreve o Funcionamento do Jogo */
/*
 *Classe Nibbles:
 *	Nibbles(canvas, worms): Construtor
 *	start(): Inicia o jogo
 *	end(): Encerra o jogo retorna a tela inicial
 *	loopGame(): Loop de execucao do jogo
 *	registerLoopGame(): adiciona o loopGame no event listener
 */
//Game Nibbles
function Nibbles(canvas, worms) {
	//Game Constants
	this.WIDTH = 64;
	this.HEIGHT = 40;
	this.POINT = 100;
	this.DEFAULTFPS = 7;
	this.INCFPS = 3;

	//Game Objects

	this.map = new Matriz(this.WIDTH, this.HEIGHT, 0);
	this.display = new Graphic(canvas, this.WIDTH, this.HEIGHT);
	this.worms = worms;	//Array de Worms
	this.food = new Diamond(5, this.WIDTH, this.HEIGHT);

	//Registra posicoes no map
	for(line = 0; line < this.worms.length; line++){
		this.map.atribPositions(worms[line].corpo, line + 1);
	}

	//Game Variables
	this.ate = 0;
	this.level = 1;
	this.maxScore = 0;
	this.fps = this.DEFAULTFPS;

	//Sound Effect - only Firefox
	this.eatSound = new Audio("audio/beep-21.ogg");

	//ID do Evento
	this.loopCode = null;
}

Nibbles.prototype.start = function () {
		//Registra LoopGame
		this.registerLoopGame();

};
Nibbles.prototype.end = function () {
	//Restaura Velocidade Inicial
	this.level = 0;
	this.ate = 0;
	this.fps = this.DEFAULTFPS;
	//window.clearInterval(this.loopCode);
	this.registerLoopGame();
	//Reinicia minhoca
	//this.worms[0].restart();
	//this.worms[0].resetScore();
};

Nibbles.prototype.loopGame = function () {
	var worm, i, j;
	var deadBody, head;
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
			while(this.map.getCell(this.food.getPos()) != 0){
				//ja esta ocupada esta casa
				//crie em outra posicao
				this.food.randomPosition(400);
			}
			this.food.visible = true;
		}
	}


	for (i=0;i < this.worms.length;i++) {
		worm = this.worms[i];
		//Movimenta minhoca
		head = worm.moveCabeca();
		//this.map.atribCell(head); -- Aguarda a Verificacao de Colisao
		//Cresce um pouco, se comeu
		if (this.food.visible && worm.corpo[0].equals(this.food.pos)) {
			worm.addScore(this.POINT);
			this.eatSound.play();
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
			deadBody = worm.removeCauda();
			this.map.clearCell(deadBody);
		}

		//Detecta Colisao com as Paredes
		/*if(worm.corpo[0].x >= this.WIDTH ||
		worm.corpo[0].x < 0 ||
		worm.corpo[0].y >= this.HEIGHT ||
		worm.corpo[0].y < 0){
			deadBody = worm.dieAndReborn();
			this.map.clearPositions(deadBody);
			worm.reborn();
			this.map.atribPositions(worm.corpo, i + 1);			
			//this.gameOver();
		}*/

		//Detecta Colisao com o corpo
		if(this.map.getCell(head) == 0){
			this.map.atribCell(head)
		}
		else {
			deadBody = worm.dieAndReborn();
			this.map.clearPositions(deadBody);
			worm.reborn();
			this.map.atribPositions(worm.corpo, i + 1);
		}
	}//for in worms
	//Renderiza a Tela
	this.display.render(this.worms, this.food, this.maxScore, this.level);
};

Nibbles.prototype.registerLoopGame = function () {
	this.loopCode = window.setInterval("game.loopGame()", 1000 / this.fps);
};
