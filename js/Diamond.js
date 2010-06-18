function Diamond (time, width, height) {
	//Coordenadas
	this.pos = new Vector(0,0);
	//Metricas
	this.WIDTH = width;
	this.HEIGHT = height;
	//Inicia numa Posicao e em tempo aleatorio
	this.randomPosition();
	this.randomTime(time);
	this.randomStyle();
	this.randomType();

	this.setInvisible();
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

Diamond.prototype.randomType = function () {
	var prob = 0.85;
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
