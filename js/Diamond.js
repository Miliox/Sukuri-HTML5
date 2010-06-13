function Diamond (time){
	//Coordenadas
	this.pos = new Vector(0,0);
	//Inicia numa Posicao e em tempo aleatorio
	this.randomPosition();
	this.randomTime(time);
	
	this.visible = false;
}

Diamond.prototype.randomPosition = function () {
	this.pos.x = Math.floor(Math.random() * WIDTH);
	this.pos.y = Math.floor(Math.random() * HEIGHT);
};

Diamond.prototype.randomTime = function (time) {
	this.duration = Math.round(Math.random() * time);
};

Diamond.prototype.getPos = function (){
	return this.pos;
};
