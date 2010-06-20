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
