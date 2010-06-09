/*
	Classe Graphic descreve as propriedades do Canvas.
*/

function Graphic(canvas, divx, divy){
	this.canvas = canvas;
	this.ctx = this.canvas.getContext('2d');
	
	this.div = new Vector(divx,divy);
	/*
	this.div.x = divx;
	this.div.y = divy;
	*/
	this.dx = this.canvas.width / this.div.x;
	this.dy = this.canvas.height / this.div.y;

}

Graphic.prototype.render = function (corpo) {
	this.ctx.save();
	this.ctx.beginPath();
	var x, y;
	var i;
	for(i = 0;i <  corpo.length; i++){
		x = corpo[i].x * this.dx;
		y = corpo[i].y * this.dy;
		this.ctx.rect(x, y, this.dx, this.dy);
	}

	this.ctx.fill();
	this.ctx.restore();
};
