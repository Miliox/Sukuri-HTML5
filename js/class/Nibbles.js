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
var DATA = {
	SOUNDS : [new Audio('audio/eat.ogg'), new Audio('audio/die.ogg')],
	NIBBLES_MAPS : {
	level1 : function(){
		var lv1_arr = [];
		var i;
		/*
		 *	MAPA
		 *	.................
		 *	:____	    ____:
		 *	:	|	:
		 *	:    -------	:
		 *	:____	|   ____:
		 *	:		:
		 *	:...............:
		 */
		//
		for(i = 25; i < 71; i++){
			lv1_arr.push(new Vector(i,25));
		}
		for(i = 10; i < 40; i++){
			lv1_arr.push(new Vector(48,i));
		}
		for(i = 0; i < 25; i++){
			lv1_arr.push(new Vector(i,10));
		}
		for(i = 0; i < 25; i++){
			lv1_arr.push(new Vector(i,40));
		}
		for(i = 0; i < 25; i++){
			lv1_arr.push(new Vector(95-i,10));
		}
		for(i = 0; i < 25; i++){
			lv1_arr.push(new Vector(95-i,40));
		}
		return lv1_arr;
	}(),
	level2: function(){
		var lv2_arr = [];
		var i;
		/*
		 *	MAPA
		 *	-----------------
		 *	|		|
		 *	|		|
		 *	|		|
		 *	|		|
		 *	|		|
		 *	-----------------
		 *
		 */
		for(i = 0; i < 96; i++){
			lv2_arr.push(new Vector(i,0));
		}
		for(i = 0; i < 50; i++){
			lv2_arr.push(new Vector(0,i));
		}
		for(i = 0; i < 96; i++){
			lv2_arr.push(new Vector(i,49));
		}
		for(i = 0; i < 50; i++){
			lv2_arr.push(new Vector(95,i));
		}
		return lv2_arr;
	}(),
	level3: function(){
		var lv3_arr = [];
		var i;
		/*
		 *	MAPA
		 *	.................
		 *	:	|	:
		 *	:	|	:
		 *	:-------|-------:
		 *	:	|	:
		 *	:	|	:
		 *	:...............:
		 *
		 */

		for(i = 0; i < 96; i++){
			lv3_arr.push(new Vector(i,25));
		}
		for(i = 0; i < 50; i++){
			lv3_arr.push(new Vector(48,i));
		}
		return lv3_arr;
	}(),
	level4: function(){
		var lv4_arr = [];
		var i;
		/*
		 *	MAPA
		 *	______......_____
		 *	| 	|       |
		 *	||_   __|__  |_	|
		 *	:  ||_______|  |: 
		 *	: _|| _____ | _|:
		 *	||	|    |  |
		 *	|____...|...____|
		 *
		 */

		for(i = 0; i < 20; i++){
			lv4_arr.push(new Vector(0,i));
		}
		for(i = 0; i < 20; i++){
			lv4_arr.push(new Vector(0,49-i));
		}
		for(i = 0; i < 20; i++){
			lv4_arr.push(new Vector(95,i));
		}
		for(i = 0; i < 20; i++){
			lv4_arr.push(new Vector(95,49-i));
		}

		for(i = 0; i <= 35; i++){
			lv4_arr.push(new Vector(i,0));
		}
		for(i = 0; i < 35; i++){
			lv4_arr.push(new Vector(95-i,0));
		}
		for(i = 0; i < 35; i++){
			lv4_arr.push(new Vector(95-i,49));
		}
		for(i = 0; i <= 35; i++){
			lv4_arr.push(new Vector(i,49));
		}

		for(i = 35;i < (96-35);i++){
			lv4_arr.push(new Vector(i,15));
		}
		for(i = 35;i < (96-35);i++){
			lv4_arr.push(new Vector(i,35));
		}

		for(i = 0;i < 15;i++){
			lv4_arr.push(new Vector(48,i));
		}
		for(i = 0;i < 15;i++){
			lv4_arr.push(new Vector(48,49-i));
		}

		for(i = 25;i < (96-25);i++){
			lv4_arr.push(new Vector(i,25));
		}

		for(i = 15;i < (50-15);i++){
			lv4_arr.push(new Vector(25,i));
		}
		for(i = 35;i < (50-16);i++){
			lv4_arr.push(new Vector(25,i));
		}

		for(i = 15;i < (50-15);i++){
			lv4_arr.push(new Vector(96-25,i));
		}
		for(i = 35;i < (50-16);i++){
			lv4_arr.push(new Vector(96-25,i));
		}

		for(i = 10;i < 20;i++){
			lv4_arr.push(new Vector(5,i));
		}
		for(i = 10;i < 20;i++){
			lv4_arr.push(new Vector(5,49-i));
		}
		for(i = 20;i < 29;i++){
			lv4_arr.push(new Vector(15,i));
		}
		for(i = 5;i < 15;i++){
			lv4_arr.push(new Vector(i,20));
		}
		for(i = 5;i < 16;i++){
			lv4_arr.push(new Vector(i,29));
		}


		for(i = 10;i < 20;i++){
			lv4_arr.push(new Vector(90,i));
		}
		for(i = 10;i < 20;i++){
			lv4_arr.push(new Vector(90,49-i));
		}
		for(i = 20;i < 29;i++){
			lv4_arr.push(new Vector(96-15,i));
		}
		for(i = 5;i < 15;i++){
			lv4_arr.push(new Vector(95-i,49-20));
		}
		for(i = 5;i < 15;i++){
			lv4_arr.push(new Vector(95-i,29));
		}
		for(i = 5;i < 15;i++){
			lv4_arr.push(new Vector(95-i,20));
		}

		return lv4_arr;
	}()
	}
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
	var rand_map = [DATA.NIBBLES_MAPS.level1,DATA.NIBBLES_MAPS.level2,DATA.NIBBLES_MAPS.level3,DATA.NIBBLES_MAPS.level4];
	var rand_index = Math.floor(4*Math.random());
	this.map.setWallPositions(rand_map[rand_index]);
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
	this.sound = DATA.SOUNDS || [new Audio('audio/eat.ogg'), new Audio('audio/die.ogg')];

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
		this.map.circularCorrectCell(head);
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
