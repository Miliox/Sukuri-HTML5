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
	this.inputs = [];
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
	window.clearInterval(this.loopCode);
	this.registerLoopGame();
	//reinicia todas as minhocas
	for(var i = 0; i< worms.length; i++){
		this.worms[i].restart();
	}
};

Nibbles.prototype.loopGame = function () {
	var worm, i, j;
	var deadBody, head;
	//atualiza timer da comida
	this.food.duration--;
	if(this.food.duration < 0){
		if(this.food.visible){
			//escode comida
			this.food.randomTime(5);
			this.food.visible = false;
		}
		else{
			//exibe comida
			this.food.randomStyle();
			this.food.randomTime(400);
			this.food.randomPosition();
			while(this.map.getCell(this.food.getPos()) != 0){
				//posicao ocupada, crie em outra posicao
				this.food.randomPosition(400);
			}
			this.food.visible = true;
		}
	}//if food


	for (i=0;i < this.worms.length;i++) {
		worm = this.worms[i];
		worm.inputProcess(this.inputs);
		head = worm.moveCabeca();

		//detecta colisao com a comida
		if (this.food.visible && worm.corpo[0].equals(this.food.getPos())) {
			worm.addScore(this.POINT);
			this.eatSound.play();
			this.food.visible = false;
			this.food.randomTime(5);
			this.food.randomPosition();
			this.ate++;

			//verifica se passou pro proximo level
			if (this.ate % 5 == 0) {
				this.level++;
				this.fps += this.INCFPS;
				window.clearInterval(this.loopCode);
				this.registerLoopGame();
			}

			//verifica se ultrapassou o recorde
			if (worm.score > this.maxScore){
				this.maxScore = worm.score;
			}
		}
		else {
			deadBody = worm.removeCauda();
			this.map.clearCell(deadBody);
		}

		//detecta colisao
		if(this.map.getCell(head) == 0){
			this.map.atribCell(head);
		}
		else {
			deadBody = worm.dieAndReborn();
			this.map.clearPositions(deadBody);
			worm.reborn();
			this.map.atribPositions(worm.corpo, i + 1);
		}
	}//for in worms
	this.inputs = [];
	//Renderiza a Tela
	this.display.render(this.worms, this.food, this.maxScore, this.level);
};

Nibbles.prototype.registerLoopGame = function () {
	this.loopCode = window.setInterval("game.loopGame()", 1000 / this.fps);
};

Nibbles.prototype.inputRegister = function (code) {
	this.inputs.push(code);
};
