/* Classe Worm: Minhoca no jogo Nibbles */
function Worm(corpoInicial, direcao){
	//Corpo e Direcoes Iniciais
	this.corpoInicial = corpoInicial;
	this.direcaoInicial = Math.floor(Math.abs(direcao) % 4);
	//Inicializa o Corpo
	this.restart();
	//Score Inicial
	this.resetScore();
}

//Manipulacao da Pontuacao
Worm.prototype.addScore = function (point) {
	this.score += point;
};
Worm.prototype.resetScore = function () {
	this.score = 0;
};

//Movimentacao do Corpo
Worm.prototype.removeCauda = function (){
	this.corpo.pop();
};
Worm.prototype.moveCabeca = function (){
	switch (this.direcaoPretendida)
	{
		case 0: /*UP*/
			this.direcao = 0;
			this.corpo.unshift( this.corpo[0].add(new Vector(0,-1)));
			break;
		case 1: /*DOWN*/
			this.direcao = 1;
			this.corpo.unshift( this.corpo[0].add(new Vector(0,1)));
			break;
		case 2: /*LEFT*/
			this.direcao = 2;
			this.corpo.unshift( this.corpo[0].add(new Vector(-1,0)));
			break;
		case 3: /*RIGHT*/
			this.direcao = 3;
			this.corpo.unshift( this.corpo[0].add(new Vector(1,0)));
			break;
	}
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
