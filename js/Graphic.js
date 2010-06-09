/*
	Classe Graphic descreve as propriedades do Canvas.
*/

function Graphic(canvas, divx, divy){
	this.canvas = canvas;
	this.ctx = this.canvas.ctx('2d');

	this.div.x = divx;
	this.div.y = divy;

	this.dx = this.canvas.width / this.div.x;
	this.dy = this.canvas.height / this.div.y;

}

Graphic.prototype.render(Worm){
	this.ctx.save();
	this.ctx.beginPath();
	var x, y;

	for(var celula in Worm.corpo){
		x = celula.x * this.dx;
		y = celula.y * this.dy;
		this.ctx.rect(x, y, this.dx, this.dy);
	}

	this.ctx.fill();
	this.ctx.restore();
}
