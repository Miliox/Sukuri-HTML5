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
		case 1:
			//movimenta-se aleatoriamente;
			this.randomMove(matriz);
			this.computedPath = false;
			break;
		case 2:
			//DUMMY MOVE
			var dx = food.getPos().x - this.body[0].x;
			var dy = food.getPos().y - this.body[0].y;
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
			//verifica se nao esta bloqueado
			var nextPosition = this.newHeadPosition();
			matriz.circularCorrectCell(nextPosition);
			var cellValue = matriz.getCell(nextPosition);
			if (cellValue != 0){
				this.randomMove(matriz);
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
		case 3:
			this.randomMove(matriz);
			this.computedPath = false;
			break;
	}
};
WormBot.prototype.defineNewState = function (visible, toxic, distance){
	if(visible && !toxic && distance < 50){
		return 2;
	}else if(visible && toxic && distance < 10){
		return 3;
	}
	else{
		return 1;
	}
};
WormBot.prototype.searchPath = function (matriz, destiny) {
	this.path = [];
	this.computedPath = true;
	//compute path
};
WormBot.prototype.randomMove = function (matriz) {
	var validDirection;
	switch (this.direction )
	{
		case this.UP:
			validDirection = [this.UP,this.RIGHT,this.LEFT];
			break;
		case this.RIGHT:
			validDirection = [this.UP,this.RIGHT,this.DOWN];
			break;
		case this.DOWN:
			validDirection = [this.RIGHT,this.DOWN,this.LEFT];
			break;
		case this.LEFT:
			validDirection = [this.UP,this.DOWN,this.LEFT];
			break;
	}
	if(Math.random() > 0.8){
		this.desiredDirection = validDirection[Math.floor(Math.random()*(validDirection.length))]; 
	}
	var nextPosition = this.newHeadPosition();
	matriz.circularCorrectCell(nextPosition);
	var cellValue = matriz.getCell(nextPosition);
	var index;
	for(var i = 0;(cellValue != 0) && (validDirection.length > 0);i++){
		index = Math.floor(Math.random() * validDirection.length);
		this.desiredDirection = validDirection[index];
		validDirection.splice(index,1);
		nextPosition = this.newHeadPosition();
		matriz.circularCorrectCell(nextPosition);
		cellValue = matriz.getCell(nextPosition);
	}
};
