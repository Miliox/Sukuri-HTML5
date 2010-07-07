/*
Classe Nibbles:
 Atributos:
	--constantes--
	Number WIDTH: Largura do Mapa
	Number HEIGHT: Altura do Mapa
	Number POINT: Incremento na Pontuacao por comer um Diamond
	Number DEFAULTFPS: Numero de frames iniciais
	Number INCFPS:	Numero de frames a mais ao passar de level
 	
 	--outros--
	Array<HTMLAudioElement> sound: Lista de sons do jogo
	Number loopCode: ID do Evento loopGame para manipulacao

 	--game objects--
	Array<Matriz> maps: Lista de Mapas 
	Matriz map: Mapa Atual
	Graphic display: Objeto que manipula o Canvas
	Array<Worm> worms: Lista de Jogadores
	Diamond food: Comida do Jogo

	--game variables--
	Number ate: Numero do Diamonds consumidos
	Number level: Level atual
	Number maxScore: Record Atual
	Number fps: numero de frames atual
	Array<Number> inputs: lista de inputs do teclado para processar
 	
 Métodos:
	Construtor Nibbles(HTMLCanvasElement canvas, Array<Worm> worms): Construtor
	--initial screens--
	null menu(): tela inicial
	null about(): informacoes sobre o autor
	
	--game states--
	null start(): inicia o jogo
	null pause(): pausa o jogo
	null end(): encerra o jogo
	null nextLevel()
	
	--worms actions--
	null reviveWorm(): worm morto é revivido na posicao inicial
	Number foundDiamond(): verifica colisao com a comida
	
	--event processes--
	null loopGame(): Loop de execucao do jogo
	null registerLoopGame(): adiciona o loopGame no event listener
	nulll unregisterLoopGame(): remove loopGame do event listener
	null inputRegister(code): registra o valor de caracter do teclado
	
	--score--
	null getMaxScore(): obtem de um servidor remoto o maior score alcancado
	null setMaxScore(): envia ao servidor seu score alcancado
*/
var DATA = {
	SOUNDS : [new Audio('audio/eat.ogg'), new Audio('audio/die.ogg')]
};
//Game Nibbles
function Nibbles(canvas, worms) {
	//Game Constants
	this.WIDTH = 96;
	this.HEIGHT = 46;
	this.POINT = 100;
	this.DEFAULTFPS = 20;
	this.INCFPS = 3;

	//Game Objects
	//Mapa
	this.maps = [NIBBLES_MAPS.level1,NIBBLES_MAPS.level2,NIBBLES_MAPS.level3,NIBBLES_MAPS.level4];
	//Grafico
	this.display = new Graphic(canvas, this.WIDTH, this.HEIGHT);
	//Worm
	this.worms = worms;	//Array de Worms
	//Diamond
	this.food = new Diamond(5, this.WIDTH, this.HEIGHT);

	//Sound Effect - only Firefox and maybe Chrome
	this.sound = DATA.SOUNDS || [new Audio('audio/eat.ogg'), new Audio('audio/die.ogg')];

	//ID do Evento
	this.loopCode = null;
}
Nibbles.prototype.menu = function () {
	this.display.renderGameMenu();
};
Nibbles.prototype.about = function () {
	this.display.renderGameAbout();
};
Nibbles.prototype.start = function () {
	//escolhe aleatoriamente um mapa
	var i = Math.floor(this.maps.length*Math.random());
	this.map = new Matriz(this.WIDTH, this.HEIGHT);
	this.map.setWallPositions(this.maps[i]);
	//Registra posicoes no map
	for(var line = 0; line < this.worms.length; line++){
		this.map.setPositions(this.worms[line].body, line + 1);
	}
	//Pre-renderiza mapa
	this.display.renderBufferWalls(this.map);
	//Game Variables
	this.ate = 0;
	this.level = 1;
	this.maxScore = 0;
	this.getMaxScore();
	this.fps = this.DEFAULTFPS;
	this.inputs = [];

	this.registerLoopGame();
};
Nibbles.prototype.pause = function () {
	if (this.loopCode === null) {
		this.registerLoopGame();
	}
	else {
		this.unregisterLoopGame();
	}
};
Nibbles.prototype.end = function () {
	this.unregisterLoopGame();
	//reinicia todas as minhocas
	for(var i = 0; i< this.worms.length; i++){
		this.worms[i].restart();
	}
};
Nibbles.prototype.nextLevel = function(){
	this.level++;
	this.fps += this.INCFPS;
	this.unregisterLoopGame();
	this.registerLoopGame();
};
Nibbles.prototype.reviveWorm = function (worm, i){
	var body = worm.dieAndReborn();
	this.sound[1].play();
	this.map.clearPositions(body);
	this.map.setPositions(worm.body, i+1);
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
	for (var i=0;i < this.worms.length;i++) {
		worm = this.worms[i];
		worm.inputProcess(this.inputs, this.map,this.food);
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
							this.nextLevel();
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
Nibbles.prototype.registerLoopGame = function () {
	var self = this;
	this.loopCode = window.setInterval(function () { self.loopGame(); }, 1000 / this.fps);
};
Nibbles.prototype.unregisterLoopGame = function (){
	window.clearInterval(this.loopCode);
	this.loopCode = null;
};
Nibbles.prototype.inputRegister = function (code) { this.inputs.push(code); };
Nibbles.prototype.getMaxScore = function () { loadRemoteScore(); };
Nibbles.prototype.setMaxScore = function (value) { loadRemoteScore(value); };
