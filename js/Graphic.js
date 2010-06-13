/* Classe Graphic: Manipula o Canvas */

function Graphic(canvas, divx, divy){
	//Buffer Principal
	this.canvas = canvas;
	this.ctx = this.canvas.getContext('2d');
	//Buffer Secundario
	this.canvasBuffer = document.createElement('canvas');
	this.canvasBuffer.width = this.canvas.width;
	this.canvasBuffer.height = this.canvas.height;
	this.ctxBuffer = this.canvasBuffer.getContext('2d');

	//Metricas
	this.div = new Vector(divx,divy);
	this.dx = this.canvas.width / this.div.x;
	this.dy = this.canvas.height / this.div.y;

}

Graphic.prototype.render = function (corpo, food, score) {
	
	this.ctxBuffer.save();
	
	//Limpa Buffer
	this.ctxBuffer.clearRect(0,0,this.canvasBuffer.width,this.canvasBuffer.height);
	
	var x, y;
	//Renderiza Worm
	this.ctxBuffer.beginPath();
	for(var i = 0;i <  corpo.length; i++){
		x = corpo[i].x * this.dx;
		y = corpo[i].y * this.dy;
		this.ctxBuffer.rect(x, y, this.dx, this.dy);
	}
	this.ctxBuffer.fill();
	
	//Renderiza Food
	if (food.visible) {
		this.ctxBuffer.beginPath();
		this.ctxBuffer.fillStyle = food.style;
		x = food.getPos().x * this.dx;
		y = food.getPos().y * this.dy;
		this.ctxBuffer.rect(x, y, this.dx, this.dy);
		this.ctxBuffer.fill();
	}
	//Renderiza Score
	this.ctxBuffer.fillStyle = "black";
	this.ctxBuffer.font = "12pt Arial";
	this.ctxBuffer.fillText("Score: " + score, 12 , 24);
		
	this.ctxBuffer.restore();
	//Aplica Buffer Secundario no Principal
	this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		//clearRect(0, 0, this.canvas.width, this.canvas.weight);
	this.ctx.drawImage(this.canvasBuffer,0,0);
};
