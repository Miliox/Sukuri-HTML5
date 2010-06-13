/*
	Classe Graphic descreve as propriedades do Canvas.
*/

function Graphic(canvas, divx, divy){
	this.canvas = canvas;
	this.ctx = this.canvas.getContext('2d');
	
	this.div = new Vector(divx,divy);

	this.dx = this.canvas.width / this.div.x;
	this.dy = this.canvas.height / this.div.y;

}

Graphic.prototype.render = function (corpo, food) {
	this.ctx.save();
	//Limpa Tela
	this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
	
	//Renderiza Worm
	this.ctx.beginPath();
	var x, y;
	var i;
	for(i = 0;i <  corpo.length; i++){
		x = corpo[i].x * this.dx;
		y = corpo[i].y * this.dy;
		this.ctx.rect(x, y, this.dx, this.dy);
	}
	this.ctx.fill();
	
	//Renderiza Food
	if (food.visible) {
		this.ctx.beginPath();
		this.ctx.fillStyle = "red";
		this.ctx.rect(food.pos.x * this.dx, food.pos.y * this.dy, this.dx, this.dy);
		this.ctx.fill();
	}
	this.ctx.restore();
};
