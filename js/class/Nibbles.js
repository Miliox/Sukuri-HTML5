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
SOUNDS = [new Audio('audio/eat.ogg'), new Audio('audio/die.ogg')];
var NIBBLES_MAPS = {
	level1 : [new Vector(48,10),new Vector(48,11),new Vector(48,12),new Vector(48,13),new Vector(48,14),new Vector(48,15),new Vector(48,16),new Vector(48,17),new Vector(48,18),new Vector(48,19),new Vector(48,20),new Vector(48,21),new Vector(48,22),new Vector(48,23),new Vector(48,24),new Vector(48,25),new Vector(48,26),new Vector(48,27),new Vector(48,28),new Vector(48,29),new Vector(48,30),new Vector(48,31),new Vector(48,32),new Vector(48,33),new Vector(48,34),new Vector(48,35),new Vector(48,36),new Vector(48,37),new Vector(48,38),new Vector(48,39),
	new Vector(25,25),new Vector(26,25),new Vector(27,25),new Vector(28,25),new Vector(29,25),new Vector(30,25),new Vector(31,25),new Vector(32,25),new Vector(33,25),new Vector(34,25),new Vector(35,25),new Vector(36,25),new Vector(37,25),new Vector(38,25),new Vector(39,25),new Vector(40,25),new Vector(41,25),new Vector(42,25),new Vector(43,25),new Vector(44,25),new Vector(45,25),new Vector(46,25),new Vector(47,25),new Vector(48,25),new Vector(49,25),new Vector(50,25),new Vector(51,25),new Vector(52,25),new Vector(53,25),new Vector(54,25),new Vector(55,25),new Vector(56,25),new Vector(57,25),new Vector(58,25),new Vector(59,25),new Vector(60,25),new Vector(61,25),new Vector(62,25),new Vector(63,25),new Vector(64,25),new Vector(65,25),new Vector(66,25),new Vector(67,25),new Vector(68,25),new Vector(69,25),new Vector(70,25),new Vector(71,25),
	new Vector(0,10),new Vector(1,10),new Vector(2,10),new Vector(3,10),new Vector(4,10),new Vector(5,10),new Vector(6,10),new Vector(7,10),new Vector(8,10),new Vector(9,10),new Vector(10,10),new Vector(11,10),new Vector(12,10),new Vector(13,10),new Vector(14,10),new Vector(15,10),new Vector(16,10),new Vector(17,10),new Vector(18,10),new Vector(19,10),new Vector(20,10),new Vector(21,10),new Vector(22,10),new Vector(23,10),new Vector(24,10),
	new Vector(0,40),new Vector(1,40),new Vector(2,40),new Vector(3,40),new Vector(4,40),new Vector(5,40),new Vector(6,40),new Vector(7,40),new Vector(8,40),new Vector(9,40),new Vector(10,40),new Vector(11,40),new Vector(12,40),new Vector(13,40),new Vector(14,40),new Vector(15,40),new Vector(16,40),new Vector(17,40),new Vector(18,40),new Vector(19,40),new Vector(20,40),new Vector(21,40),new Vector(22,40),new Vector(23,40),new Vector(24,40),
	new Vector(95-0,10),new Vector(95-1,10),new Vector(95-2,10),new Vector(95-3,10),new Vector(95-4,10),new Vector(95-5,10),new Vector(95-6,10),new Vector(95-7,10),new Vector(95-8,10),new Vector(95-9,10),new Vector(95-10,10),new Vector(95-11,10),new Vector(95-12,10),new Vector(95-13,10),new Vector(95-14,10),new Vector(95-15,10),new Vector(95-16,10),new Vector(95-17,10),new Vector(95-18,10),new Vector(95-19,10),new Vector(95-20,10),new Vector(95-21,10),new Vector(95-22,10),new Vector(95-23,10),new Vector(95-24,10),
	new Vector(95-0,40),new Vector(95-1,40),new Vector(95-2,40),new Vector(95-3,40),new Vector(95-4,40),new Vector(95-5,40),new Vector(95-6,40),new Vector(95-7,40),new Vector(95-8,40),new Vector(95-9,40),new Vector(95-10,40),new Vector(95-11,40),new Vector(95-12,40),new Vector(95-13,40),new Vector(95-14,40),new Vector(95-15,40),new Vector(95-16,40),new Vector(95-17,40),new Vector(95-18,40),new Vector(95-19,40),new Vector(95-20,40),new Vector(95-21,40),new Vector(95-22,40),new Vector(95-23,40),new Vector(95-24,40)]
};
function Nibbles(canvas, worms) {
	//Game Constants
	this.WIDTH = 96;
	this.HEIGHT = 50;
	this.POINT = 100;
	this.DEFAULTFPS = 7;
	this.INCFPS = 3;

	//Game Objects

	this.map = new Matriz(this.WIDTH, this.HEIGHT);
	this.map.setWallPositions(NIBBLES_MAPS.level1);
	/*
	//----------------Gerar Posicoes Aleatórias---------------------
	var x, y;
	for(var i = 0; i < 30; i++) {
		x = Math.floor(Math.random() * this.WIDTH);
		y = Math.floor(Math.random() * this.HEIGHT);
		this.map.setCell(new Vector(x, y), -1);
	}
	//----------------------------------------
	*/
	this.display = new Graphic(canvas, this.WIDTH, this.HEIGHT, this.map);
	this.worms = worms;	//Array de Worms
	this.food = new Diamond(5, this.WIDTH, this.HEIGHT);

	//Registra posicoes no map
	for(line = 0; line < this.worms.length; line++){
		this.map.setPositions(worms[line].body, line + 1);
	}

	//Game Variables
	this.ate = 0;
	this.level = 1;
	this.maxScore = 0;
	this.getMaxScore();
	this.fps = this.DEFAULTFPS;
	this.inputs = [];
	//Sound Effect - only Firefox and maybe Chrome
	this.sound = SOUNDS || [new Audio('audio/eat.ogg'), new Audio('audio/die.ogg')];

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
	this.map.setPositions(worm.body, valor+1);
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
		worm.inputProcess(this.inputs, this.map);
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
							this.setMaxScore(worm.score);
						}
						//cresce
						worm.movesHead(head);
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
						tail = worm.removeTail();
						this.map.clearCell(tail);
						worm.movesHead(head);
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
Nibbles.prototype.getMaxScore = function () { loadRemoteScore(); };
Nibbles.prototype.setMaxScore = function (value) { loadRemoteScore(value); };
Nibbles.prototype.registerLoopGame = function () {
	var self = this;
	this.loopCode = window.setInterval(function () { self.loopGame(); }, 1000 / this.fps);
};
Nibbles.prototype.unregisterLoopGame = function (){ window.clearInterval(this.loopCode); };
Nibbles.prototype.inputRegister = function (code) { this.inputs.push(code); };
