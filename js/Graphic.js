/* Classe Graphic: Manipula o Canvas */

function Graphic(canvas, tileX, tileY){
	//Buffer Principal
	this.canvas = canvas;
	this.ctx = this.canvas.getContext('2d');
	//Buffer Secundario
	this.canvasBuffer = document.createElement('canvas');
	this.canvasBuffer.width = this.canvas.width;
	this.canvasBuffer.height = this.canvas.height;
	this.ctxBuffer = this.canvasBuffer.getContext('2d');

	//Metricas
	this.TILEWIDTH = this.canvas.width / tileX;
	this.TILEHEIGHT = this.canvas.height / tileY;

}

Graphic.prototype.render = function (worms, food, MAX_SCORE, level) {
	this.ctxBuffer.save();

	//Limpa Buffer
	this.ctxBuffer.clearRect(0,0,this.canvasBuffer.width,this.canvasBuffer.height);

	var x, y;
	//Renderiza Worm
	this.ctxBuffer.beginPath();
	for(var i = 0;i <  worms[0].corpo.length; i++){
		x = worms[0].corpo[i].x * this.TILEWIDTH;
		y = worms[0].corpo[i].y * this.TILEHEIGHT;
		this.ctxBuffer.rect(x, y, this.TILEWIDTH, this.TILEHEIGHT);
	}
	this.ctxBuffer.fill();

	//Renderiza Food
	if (food.visible) {
		this.ctxBuffer.beginPath();
		this.ctxBuffer.fillStyle = food.style;
		x = food.getPos().x * this.TILEWIDTH;
		y = food.getPos().y * this.TILEHEIGHT;
		this.ctxBuffer.rect(x, y, this.TILEWIDTH, this.TILEHEIGHT);
		this.ctxBuffer.fill();
	}
	//Renderiza Score
	this.ctxBuffer.fillStyle = "black";
	this.ctxBuffer.strokeStyle = "white";
	this.ctxBuffer.font = "12pt Arial";
	var content = "Score: " + worms[0].score + "pt ";
	content += "Recorde: " + MAX_SCORE + "pt ";
	content += "Nivel: " + level;
	this.ctxBuffer.fillText(content, 12, 24);

	//Renderiza Propaganda
	//this.ctxBuffer.textAlign("center");
	this.ctxBuffer.textAlign = 'center';
	this.ctxBuffer.textBaseline = 'middle';
	this.ctxBuffer.fillText("SUKURI 0.01",(this.canvasBuffer.width / 2), 12);
	this.ctxBuffer.textAlign = 'end';
	this.ctxBuffer.font = "8pt Arial";
	this.ctxBuffer.fillText("\u00A9POWERED BY LABORATÓRIO DE PÓS GRADUAÇÃO",
			this.canvasBuffer.width - 10, this.canvasBuffer.height - 10);
	this.ctxBuffer.restore();
	//Aplica Buffer Secundario no Principal
	this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
	this.ctx.drawImage(this.canvasBuffer,0,0);
};

