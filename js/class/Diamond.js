/*
Classe Diamond:
 Atributos:
	Vector pos: posicao no Mapa
 
	--metricas--
 	Number WIDTH:	intervalo valido, 0 <= pos.x < WIDTH
	Number HEIGHT:	intervalo valido, 0 <= pos.y < HEIGHT
	
	--outros--
	bool visible: indica se o Diamond esta visivel
	bool toxic: indica se esta envenenado
 Métodos:
	Construtor Diamond(Number time, Number width, Number height)

	--random--
	null randomPosition: define aleatoriamente uma posicao
	null randomTime: define aleatoriamente o numero de frames de duracao
	null randomType: aleatoriamente o tipo normal ou toxico, 5% de chance de ser toxico

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
function Diamond (time, width, height) {
	//Coordenadas
	this.pos = new Vector(0,0);
	//Metricas
	this.WIDTH = width;
	this.HEIGHT = height;
	//Inicia numa Posicao e em tempo aleatorio
	this.randomPosition();
	this.randomTime(time);
	this.randomType();
	this.setInvisible();
}
Diamond.prototype.randomPosition = function () {
	var x = Math.floor(Math.random() * this.WIDTH);
	var y = Math.floor(Math.random() * this.HEIGHT);
	this.setPos(new Vector(x, y));
};
Diamond.prototype.randomTime = function (time) {
	this.duration = Math.round(Math.random() * time);
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
Diamond.prototype.getPos = function () { return this.pos; };
Diamond.prototype.setPos = function (newPos) { this.pos = newPos; };
