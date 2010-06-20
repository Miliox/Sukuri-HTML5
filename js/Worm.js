//Classe Worm: SuperClasse das Classes Worms
function Worm(corpoInicial, direcao, color){
	//Corpo e Direcoes Iniciais
	this.corpoInicial = corpoInicial;
	this.direcaoInicial = Math.floor(Math.abs(direcao) % 4);
	this.color = color;
	//Inicializa o Corpo
	this.restart();
	this.resetScore();
}
Worm.prototype.addScore = function (point) {
	this.score += point;
};
Worm.prototype.resetScore = function () { this.score = 0; };
Worm.prototype.removeCauda = function (){ return this.corpo.pop(); };
Worm.prototype.moveCabeca = function (head){
	this.direcao = this.direcaoPretendida;
	this.corpo.unshift(head);
};
Worm.prototype.newHeadPosition = function (){
	var vetorUnit;
	switch (this.direcaoPretendida)
	{
		case 0: /*UP*/
			vetorUnit = new Vector(0,-1);
			break;
		case 1: /*DOWN*/
			vetorUnit = new Vector(0,1);
			break;
		case 2: /*LEFT*/
			vetorUnit = new Vector(-1,0);
			break;
		case 3: /*RIGHT*/
			vetorUnit = new Vector(1,0);
			break;
		default :
			vetorUnit = new Vector(0,0);
			break;
	}
	return this.corpo[0].add(vetorUnit);
};
//Reinicia a minhoca
Worm.prototype.restart = function (){
	this.corpo = function(corpoInicial){
		var body = [];
		//Produz um novo vetor que representa o corpo
		for(var i = 0; i < corpoInicial.length;i++){
			body.push(new Vector(corpoInicial[i].x,corpoInicial[i].y));
		};
		return body;
	}(this.corpoInicial);
	this.direcaoPretendida = this.direcaoInicial;
	this.direcao = this.direcaoInicial;
};
Worm.prototype.dieAndReborn = function (){
	var dead;
	//Restaura Velocidade Inicial
	dead = this.corpo;
	//Revive
	this.restart();
	this.resetScore();
	return dead;
};
Worm.prototype.inputProcess = function (inputList, matriz){
	//Implementada nas subclasses
};

//WormHuman: SubClass de Worm
function WormHuman(corpoInicial, direcao, color, teclado){
	Worm.call(this,corpoInicial, direcao,color);
	//Teclado Input
	if(teclado !== undefined){
		this.teclado = teclado;
	} else {
		//Default usar teclas direcionais
		this.teclado = {up:38, down: 40, left: 37, right: 39};
	}
}
WormHuman.prototype = new Worm();
WormHuman.prototype.inputProcess = function (inputList, matriz){
	for(var i = 0;i < inputList.length;i++){
		switch (inputList[i]){
			//Player controls
			case this.teclado.up:
				if (this.direcao != 1) {
					this.direcaoPretendida = 0;
				}
				break;
			case this.teclado.down:
				if (this.direcao != 0) {
					this.direcaoPretendida = 1;
				}
				break;
			case this.teclado.left:
				if (this.direcao != 3) {
					this.direcaoPretendida = 2;
				}
				break;
			case this.teclado.right:
				if (this.direcao != 2) {
					this.direcaoPretendida = 3;
				}
				break;
		}//switch
	}//for
};
