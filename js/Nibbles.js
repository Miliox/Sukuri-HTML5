/* Descreve o Funcionamento do Jogo */
/*
 *Classe Nibbles:
 *	Nibbles(canvas, worms): Construtor
 *	start(): Inicia o jogo
 *	end(): Encerra o jogo retorna a tela inicial
 *	loopGame(): Loop de execucao do jogo
 *	registerLoopGame(): adiciona o loopGame no event listener
 *	inputRegister(code): registra o valor de caracter do teclado
 */
//Game Nibbles
function Nibbles(canvas, worms) {
	//Game Constants
	this.WIDTH = 96;
	this.HEIGHT = 50;
	this.POINT = 100;
	this.DEFAULTFPS = 7;
	this.INCFPS = 3;

	//Game Objects

	this.map = new Matriz(this.WIDTH, this.HEIGHT, 0);
	//----------------Gerar Posicoes Aleatórias---------------------
	var x, y;
	for(var i = 0; i < 70; i++) {
		x = Math.floor(Math.random() * this.WIDTH);
		y = Math.floor(Math.random() * this.HEIGHT);
		this.map.setCell(new Vector(x, y), -1);
	}
	//----------------------------------------
	this.display = new Graphic(canvas, this.WIDTH, this.HEIGHT, this.map);
	this.worms = worms;	//Array de Worms
	this.food = new Diamond(5, this.WIDTH, this.HEIGHT);

	//Registra posicoes no map
	for(line = 0; line < this.worms.length; line++){
		this.map.setPositions(worms[line].corpo, line + 1);
	}

	//Game Variables
	this.ate = 0;
	this.level = 1;
	this.maxScore = 0;
	loadScore();
	this.fps = this.DEFAULTFPS;
	this.inputs = [];
	//Sound Effect - only Firefox and maybe Chrome
	this.sound = [new Audio('audio/eat.ogg'), new Audio('audio/die.ogg')];

	//ID do Evento
	this.loopCode = null;
}

Nibbles.prototype.start = function () {	this.registerLoopGame(); };
Nibbles.prototype.end = function () {
	//restaura velocidade inicial
	this.level = 0;
	this.ate = 0;
	this.fps = this.DEFAULTFPS;
	this.unregisterLoopGame();
	this.registerLoopGame();
	//reinicia todas as minhocas
	for(var i = 0; i< worms.length; i++){
		this.worms[i].restart();
	}
};

Nibbles.prototype.reviveWorm = function (worm, valor){
	var body = worm.dieAndReborn();
	this.sound[1].play();
	this.map.clearPositions(body);
	this.map.setPositions(worm.corpo, valor+1);
};
Nibbles.prototype.foundDiamond = function(head){
	if (this.food.isVisible() && head.equals(this.food.getPos())) {
		if(!this.food.isToxic()){ return 2; }
		else { return 1; }
	}
	return 0;
};
Nibbles.prototype.loopGame = function () {
	var worm, head, tail;
	var i;

	//processa a comida
	this.food.duration--;
	if(this.food.duration < 0){
		if(this.food.isVisible()){
			//escode comida
			this.food.randomTime(5);
			this.food.setInvisible();
		}
		else{
			//exibe comida
			this.food.randomStyle();
			this.food.randomTime(400);
			this.food.randomType();
			this.food.randomPosition();
			while(this.map.getCell(this.food.getPos()) != 0){
				//posicao ocupada, crie em outra posicao
				this.food.randomPosition(400);
			}
			this.food.setVisible()
		}
	}//if food

	//processa os worms
	for (i=0;i < this.worms.length;i++) {
		worm = this.worms[i];
		worm.inputProcess(this.inputs);
		head = worm.newHeadPosition();
		switch(this.map.getCell(head))
		{
			case 0: //Casa Vazia
				switch(this.foundDiamond(head))
				{
					case 2://comida normal
						this.sound[0].play();
						worm.addScore(this.POINT);
						this.ate++;
						//apaga comida
						this.food.setInvisible();
						this.food.randomTime(5);
						this.food.randomPosition();
						//verifica se passou pro proximo level
						if (this.ate % 5 == 0) {
							this.level++;
							this.fps += this.INCFPS;
							this.unregisterLoopGame();
							this.registerLoopGame();
						}
						//verifica se ultrapassou o recorde
						if (worm.score > this.maxScore){
							loadScore(worm.score);
						}
						//cresce
						worm.moveCabeca(head);
						this.map.setCell(head);
						break;
					case 1://comida envenenada
						//apaga comida
						this.food.setInvisible();
						this.food.randomTime(5);
						this.food.randomPosition();

						this.reviveWorm(worm,i);
						break;
					default://nao encontrou
						tail = worm.removeCauda();
						this.map.clearCell(tail);
						worm.moveCabeca(head);
						this.map.setCell(head);
				}
				break;
			default://Casa Ocupada
				this.reviveWorm(worm,i);
				break;
		}
	}//for in worms
	this.inputs = [];

	//Renderiza a Tela
	this.display.render(this.worms, this.food, this.maxScore, this.level);
};
Nibbles.prototype.getMaxScore = function () {

};
Nibbles.prototype.setMaxScore = function (value) {
};
Nibbles.prototype.registerLoopGame = function () {
	var self = this;
	this.loopCode = window.setInterval(function () { self.loopGame(); }, 1000 / this.fps);
};
Nibbles.prototype.unregisterLoopGame = function (){ window.clearInterval(this.loopCode); };
Nibbles.prototype.inputRegister = function (code) { this.inputs.push(code); };
