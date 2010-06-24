//Classe Worm: SuperClasse das Classes Worms
function Worm(initialBody, direction, color){
	//Corpo e Direcoes Iniciais
	this.initialBody = initialBody || [];
	this.initialDirection = Math.floor(Math.abs(direction) % 4) || 0;
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
		case 0: /*UP*/
			vetorUnit = new Vector(0,-1);
			break;
		case 2: /*DOWN*/
			vetorUnit = new Vector(0,1);
			break;
		case 3: /*LEFT*/
			vetorUnit = new Vector(-1,0);
			break;
		case 1: /*RIGHT*/
			vetorUnit = new Vector(1,0);
			break;
		default :
			vetorUnit = new Vector(0,0);
			break;
	}
	return this.body[0].add(vetorUnit);
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
				if (this.direction != 2) {
					this.desiredDirection = 0;
				}
				break;
			case this.teclado.down:
				if (this.direction != 0) {
					this.desiredDirection = 2;
				}
				break;
			case this.teclado.left:
				if (this.direction != 1) {
					this.desiredDirection = 3;
				}
				break;
			case this.teclado.right:
				if (this.direction != 3) {
					this.desiredDirection = 1;
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
		case 0:
			validDirection = [0,1,3];
			break;
		case 1:
			validDirection = [0,1,2];
			break;
		case 2:
			validDirection = [1,2,3];
			break;
		case 3:
			validDirection = [0,2,3];
			break;
	}
	if(Math.random() > 0.97){
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
