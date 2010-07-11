/*
Classe Diamond:
 Atributos:
	Vector position: posicao no Mapa
	Number duration: duracao do Diamond em um estado
 
	--metricas--
 	Number maxWidth:	intervalo valido, 0 <= pos.x < maxWidth
	Number maxHeight:	intervalo valido, 0 <= pos.y < maxHeight
	
	--outros--
	bool visible: indica se o Diamond esta visivel
	bool toxic: indica se esta envenenado
 Métodos:
	Construtor Diamond(Number maxWaitTime, Number maxWidth, Number maxHeight)

	--random--
	null randomPosition(): define aleatoriamente uma posicao
	null randomTime(Number maxWaitTime): define aleatoriamente o numero de frames de duracao
	null randomType(): aleatoriamente o tipo normal ou toxico, 5% de chance de ser toxico

 	--consulta--
 	bool isToxic(): indica se esta envenenado
 	bool isVisible(): indica se esta visivel

 	--definir--
	null setVisible(): torna visivel
	null setInvisible(): torna invisivel
	null setPos(Vector newPos): move para posicao indicada

	--outros--
	Vector getPos(): obtem posicao atual
*/
function Diamond (maxWidth, maxHeight) {
	//Coordenadas
	this.position = new Vector(0,0);
	//Metricas
	this.maxWidth = maxWidth;
	this.maxHeight = maxHeight;

	//Inicia numa Posicao e em tempo aleatorio
	this.randomPosition();
	this.randomTime(5);
	this.randomType();
	this.setInvisible();
}
Diamond.prototype.randomPosition = function () {
	var x = Math.floor(Math.random() * this.maxWidth);
	var y = Math.floor(Math.random() * this.maxHeight);
	this.setPos(new Vector(x, y));
};
Diamond.prototype.randomTime = function (maxWaitTime) {
	this.duration = Math.round(Math.random() * maxWaitTime);
};
Diamond.prototype.randomType = function () {
	var prob = 0.95;
	var rand = Math.random();

	if (prob < rand){
		this.toxic = true;
	}
	else {
		this.toxic = false;
	}
};
Diamond.prototype.isToxic = function () { return this.toxic; };
Diamond.prototype.isVisible = function () { return this.visible };
Diamond.prototype.setVisible = function () { this.visible = true; };
Diamond.prototype.setInvisible = function () { this.visible = false; };
Diamond.prototype.setPos = function (newPos) { this.position = newPos; };
Diamond.prototype.getPos = function () { return this.position; };
