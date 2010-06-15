function Diamond (time, width, height) {
	//Coordenadas
	this.pos = new Vector(0,0);
	//Metricas
	this.WIDTH = width;
	this.HEIGHT = height;
	//Inicia numa Posicao e em tempo aleatorio
	this.randomPosition();
	this.randomTime(time);
	this.randomStyle;

	this.visible = false;
}

Diamond.prototype.randomPosition = function () {
	this.pos.x = Math.floor(Math.random() * this.WIDTH);
	this.pos.y = Math.floor(Math.random() * this.HEIGHT);
};

Diamond.prototype.randomTime = function (time) {
	this.duration = Math.round(Math.random() * time);
};
Diamond.prototype.randomStyle = function () {
	var r = Math.floor(Math.random() * 255);
	var g = Math.floor(Math.random() * 255);
	var b = Math.floor(Math.random() * 255);
	this.style = "rgb("+r +","+g+","+b+")";
};

Diamond.prototype.getPos = function (){
	return this.pos;
};
