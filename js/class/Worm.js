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
		default :
			vetorUnit = new Vector(0,0);
			break;
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
Worm.prototype.inputProcess = function (inputList, matriz){
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
WormHuman.prototype.inputProcess = function (inputList, matriz){
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
WormBot.prototype.inputProcess = function (inputList, matriz){
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
	if(Math.random() > 0.9){
		this.desiredDirection = validDirection[Math.floor(Math.random()*(validDirection.length - 1))]; 
	}
	var nextPosition = this.newHeadPosition();
	matriz.circularCorrectCell(nextPosition);
	var cellValue = matriz.getCell(nextPosition);
	for(var i = 0;cellValue != 0 && i < 4;i++){
		this.desiredDirection++;
		this.desiredDirection %= 4;
		nextPosition = this.newHeadPosition();
		matriz.circularCorrectCell(nextPosition);
		cellValue = matriz.getCell(nextPosition);
	}
};
