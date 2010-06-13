/*
	Descrição da Classe Worm que representa a minhoca no jogo Nibbles.


*/
var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGTH = 3;

function Worm(corpoInicial, direcao){
	this.corpoInicial = corpoInicial;
	this.direcaoInicial = Math.floor(Math.abs(direcao) % 4);
	this.restart();
	this.score = 0;
}

Worm.prototype.addScore = function (point) {
	this.score += point;
};

Worm.prototype.resetScore = function () {
	this.score = 0;
};

Worm.prototype.removeCauda = function (){
	this.corpo.pop();	
};

Worm.prototype.moveCabeca = function (){
	switch (this.direcao)
	{
		case 0:
			this.corpo.unshift( this.corpo[0].add(new Vector(0,-1)));
			break;
		case 1:
			this.corpo.unshift( this.corpo[0].add(new Vector(0,1)));
			break;
		case 2:
			this.corpo.unshift( this.corpo[0].add(new Vector(-1,0)));
			break;
		case 3:
			this.corpo.unshift( this.corpo[0].add(new Vector(1,0)));
			break;
	}
};

Worm.prototype.restart = function (){
	this.corpo = function(corpoInicial){
		var body = [];
		for(var i = 0; i < corpoInicial.length;i++){
			body.push(new Vector(corpoInicial[i].x,corpoInicial[i].y));
		};
		return body;
	}(this.corpoInicial);
	this.direcao = this.direcaoInicial;
};
