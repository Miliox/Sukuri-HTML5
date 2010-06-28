//Classe Worm: SuperClasse das Classes Worms
function Worm(initialBody, direction, color){
	//Corpo e Direcoes Iniciais
	this.initialBody = initialBody || [];
	//Define direcao em valor numerico
	if(typeof(direction)== 'number'){
		direction = Math.floor(Math.abs(direction) % 4);
	}
	else if (typeof(direction) == 'string'){
		switch(direction)
		{
			case "up":
				direction = this.UP;
			case "down":
				direction = this.DOWN;
			case "left":
				direction = this.LEFT;
			case "right":
				direction = this.RIGHT;
		}
	}
	else
	{
		direction = 0;
	}
	this.initialDirection = direction;
	this.color = color || "blue";
	//Inicializa o Corpo
	this.restart();
	this.resetScore();
}
Worm.prototype.addScore = function (point) {
	this.score += point;
};
Worm.prototype.resetScore = function () { this.score = 0; };
Worm.prototype.removeTail = function (){ return this.body.pop(); };
Worm.prototype.movesHead = function (head){
	this.direction = this.desiredDirection;
	this.body.unshift(head);
};
Worm.prototype.newHeadPosition = function (){
	var vetorUnit;
	switch (this.desiredDirection)
	{
		case this.UP:
			vetorUnit = new Vector(0,-1);
			break;
		case this.DOWN:
			vetorUnit = new Vector(0,1);
			break;
		case this.LEFT:
			vetorUnit = new Vector(-1,0);
			break;
		case this.RIGHT:
			vetorUnit = new Vector(1,0);
			break;
		/*
		default :
			vetorUnit = new Vector(0,0);
			break;
		*/
	}
	return this.body[0].add(vetorUnit);
};
//Constantes de Direcao
Worm.prototype.UP = 0;
Worm.prototype.RIGHT = 1;
Worm.prototype.DOWN = 2;
Worm.prototype.LEFT = 3;
Worm.prototype.getValidDirections = function (){
	switch (this.direction){
		case this.UP:
			return [this.UP,this.RIGHT,this.LEFT];
		case this.RIGHT:
			return [this.UP,this.RIGHT,this.DOWN];
		case this.DOWN:
			return [this.RIGHT,this.DOWN,this.LEFT];
		case this.LEFT:
			return [this.UP,this.DOWN,this.LEFT];
	}
};
//Reinicia a minhoca
Worm.prototype.restart = function (){
	this.body = function(initialBody){
		var body = [];
		//Produz um novo vetor que representa o corpo
		for(var i = 0; i < initialBody.length;i++){
			body.push(new Vector(initialBody[i].x,initialBody[i].y));
		};
		return body;
	}(this.initialBody);
	this.desiredDirection = this.initialDirection;
	this.direction = this.initialDirection;
};
Worm.prototype.dieAndReborn = function (){
	var dead;
	//Restaura Velocidade Inicial
	dead = this.body;
	//Revive
	this.restart();
	this.resetScore();
	return dead;
};
Worm.prototype.inputProcess = function (inputList, matriz, food){
	//Implementada nas subclasses
};

//WormHuman: SubClass de Worm
function WormHuman(initialBody, direction, color, teclado){
	Worm.call(this,initialBody, direction,color);
	//Teclado Input
	this.teclado = teclado || {up:38, down: 40, left: 37, right: 39};
}

WormHuman.prototype = new Worm();
delete WormHuman.prototype.initialBody;
delete WormHuman.prototype.initialDirection;
delete WormHuman.prototype.desiredDirection;
delete WormHuman.prototype.body;
delete WormHuman.prototype.color;
delete WormHuman.prototype.direction;
delete WormHuman.prototype.score;
WormHuman.prototype.constructor = WormHuman;
WormHuman.prototype.inputProcess = function (inputList, matriz, food){
	var directions = this.getValidDirections();
	for(var i = 0;i < inputList.length;i++){
		switch (inputList[i]){
			//Player controls
			case this.teclado.up:
				if (this.direction != this.DOWN) {
					this.desiredDirection = this.UP;
				}
				break;
			case this.teclado.down:
				if (this.direction != this.UP) {
					this.desiredDirection = this.DOWN;
				}
				break;
			case this.teclado.left:
				if (this.direction != this.RIGHT) {
					this.desiredDirection = this.LEFT;
				}
				break;
			case this.teclado.right:
				if (this.direction != this.LEFT) {
					this.desiredDirection = this.RIGHT;
				}
				break;
		}//switch
	}//for
};

//WormBot: SubClass de Worm
function WormBot(initialBody, direction, color){
	Worm.call(this,initialBody, direction,color);
	this.computedPath = false;
	this.wait = 0;
}

WormBot.prototype = new Worm();
delete WormBot.prototype.initialBody;
delete WormBot.prototype.initialDirection;
delete WormBot.prototype.desiredDirection;
delete WormBot.prototype.body;
delete WormBot.prototype.color;
delete WormBot.prototype.direction;
delete WormBot.prototype.score;
WormBot.prototype.constructor = WormBot;
WormBot.prototype.inputProcess = function (inputList, matriz, food){
	//FSM
	var distance = matriz.getDistance(this.body[0],food.getPos());
	switch (this.defineNewState(food.isVisible(),food.isToxic(),distance)){
		case 1: /*Move-se aleatoriamente*/
			this.randomMove(matriz);
			this.computedPath = false;
			break;
		case 2: /*Persegue o Diamond*/
			//DUMMY MOVE
			if (this.wait > 0) {
				this.wait--;
				this.randomMove(matriz);
			}
			else {
				var dx = food.getPos().x - this.body[0].x;
				if(dx > 48){
					dx =  this.body[0].x - food.getPos().x;
				}
				var dy = food.getPos().y - this.body[0].y;
					if(dy > 23){
					dy =  this.body[0].y - food.getPos().y;
				}
				if(Math.abs(dx) > Math.abs(dy)){
					if (dx > 0) {
						this.desiredDirection = this.RIGHT;
					}
					else if (dx < 0){
						this.desiredDirection = this.LEFT;
					}
				}
				else {
					if (dy > 0) {
						this.desiredDirection = this.DOWN;
					}
					else if (dy < 0) {
						this.desiredDirection = this.UP;
					}
				}
				//verifica colisao
				if (this.willCollide(matriz)){
					this.wait = Math.round(Math.random() * 15);
					this.randomMove(matriz);
				}
			}
			/*Comentado para futura implementacao
			if(!this.computedPath){
				this.searchPath();
			}
			switch(this.path.length)
			{
				case 0:
					//"nao existe caminho valido";
					//this.randomMove(matriz);
					break;
				default :
					//"remove uma direcao do path";
					//"seta direcao no worm";
					break;
			}
			*/
			break;
		case 3: /*Foge do Diamond envenenado*/
			//DUMMY MOVE
			var dx = food.getPos().x - this.body[0].x;
			if(dx > 48){
				dx =  this.body[0].x - food.getPos().x;
			}
			var dy = food.getPos().y - this.body[0].y;
			if(dy > 23){
				dx =  this.body[0].y - food.getPos().y;
			}
			if(Math.abs(dx) > Math.abs(dy)){
				if (dx < 0) {
					this.desiredDirection = this.RIGHT;
				}
				else if (dx > 0){
					this.desiredDirection = this.LEFT;
				}
			}
			else {
				if (dy < 0) {
					this.desiredDirection = this.DOWN;
				}
				else if (dy > 0) {
					this.desiredDirection = this.UP;
				}
			}
			//verifica se existe colisao
			if (this.willCollide(matriz)) { this.randomMove(matriz); }
			this.computedPath = false;
			break;
	}
};
WormBot.prototype.defineNewState = function (visible, toxic, distance){
	if(visible && !toxic && distance < 25){	return 2; }
	else if(visible && toxic && distance < 10){ return 3; }
	else{ return 1;	}
};
WormBot.prototype.searchPath = function (matriz, destiny) {
	//path armazena-ra as decisoes
	this.path = [];
	this.computedPath = true;

	var old_node = []; //array de nodos encontrados
	var new_node = []; //array de novos nodos, preenchido durante o processamento dos old

	var relative_map = new Array(51);

	var i, j;
	//cria matriz
	for(i = 0; i < relative_map.length; i++){
		relative_map[i] = new Array(51);
	}

	//inicializa matriz
	for(i = 0; i < relative_map.length; i++){
		for(j = 0; j < relative_map[i].length; j++){
			relative_map[i][j] = null;
		}
	}

	//fator de correcao
	var fator = new Vector(25,25);

	//referencia
	var root = this.body[0];
	var root_refer = new Vector(25,25);

	//
	var deep = 0;
	var max_deep = 25;
	var vd = [-1,new Vector()];

	//inicia busca em largura
	old_node = [root_refer];
	relative_map[old_node[0].y][old_node[0].x] = [null,null];
	//continua busca
	for (deep = 1; deep < max_deep; deep++){
		new_node = [];
		//percorre os nodes ja encontrados
		for(j = 0; j < old_node.length; j++){
			//encontra novos nodos
			for(i = 0; i < old_node[j].length; i++){
				//se nodo estiver livre
				if(true /*LookUp in matriz*/){
					//registra
					new_node.push();
					if( true /*Encontrou ?*/){
						//obtem caminho
						//path = function () {} ();
						//return;
					}
				}
				else{
					//marca como vazio
				}
			}
		}
		old_node = new_node;
	}
};
WormBot.prototype.randomMove = function (matriz) {
	var validDirection = this.getValidDirections();
	//aleatoriamente muda direcao do Worm
	if(Math.random() < 0.1){
		this.desiredDirection = validDirection[Math.floor(Math.random()*(validDirection.length))]; 
	}

	//Verificar se existe colisao, muda de direcao se houver
	var count = 0;
	var index;
	do {
		if (!this.willCollide(matriz)) { return; }
		else if(validDirection.length > 0) {
			//Tente outra direcao aleatoria
			index = Math.floor(Math.random() * validDirection.length);
			this.desiredDirection = validDirection[index];
			//remove direcao aleatoria das possibilidades
			validDirection.splice(index,1);
		}
		count++;
	} while(count < 4);
};
WormBot.prototype.willCollide = function (matriz) {
	var headNextPosition = this.newHeadPosition();
	matriz.circularCorrectCell(headNextPosition);
	var cellValue =  matriz.getCell(headNextPosition);
	if (cellValue == 0) {
		return false;
	}
	return true;
};
