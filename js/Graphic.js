/*	Atributos:
 *		HTMLCanvasElement canvas:
 *		CanvasRenderingContext2D ctx:
 *		HTMLCanvasElement canvasBuffer: 
 *		CanvasRenderingContext2D ctxBuffer:
 *		TILEWIDTH:	dimensao horizontal base
 *		TILEHEIGHT:	dimensao vertical base
 *	Classe Graphic:
 *		Graphic(HTMLCanvasElement canvas, Number tileX, Number tileY):
 *		render(Array<Worm> worms,Diamond food, Number MAX_SCORE, Number level);
 *
 */

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
	this.ctxBuffer.beginPath();
	//Renderiza Worms
	for(var j = 0;j < worms.length; j++){
		//renderiza um worm por vez
		for(var i = 0;i <  worms[j].corpo.length; i++){
			x = worms[j].corpo[i].x * this.TILEWIDTH;
			y = worms[j].corpo[i].y * this.TILEHEIGHT;
			this.ctxBuffer.rect(x, y, this.TILEWIDTH, this.TILEHEIGHT);
		}
	}
	this.ctxBuffer.fill();

	//Renderiza Food
	this.ctxBuffer.beginPath();
	if (food.visible) {
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
	this.ctxBuffer.fillText(content, 5, this.canvasBuffer.height - 10);
	content = "Nivel: " + level;
	this.ctxBuffer.fillText(content, 5, this.canvasBuffer.height - 25);
	content = "Recorde: " + MAX_SCORE + "pt ";
	this.ctxBuffer.fillText(content, 5, 25);

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

