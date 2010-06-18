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

	this.BACKGROUNDS = ["white","green","yellow","DarkSlategray", "orange"];
}

Graphic.prototype.render = function (worms, food, MAX_SCORE, level) {
	this.ctxBuffer.save();

	//Limpa Buffer
	this.renderBufferBackground(level - 1);
	/*
	this.ctxBuffer.save();
	this.ctxBuffer.fillStyle = this.BACKGROUNDS[(level - 1)% this.BACKGROUNDS.length];
	this.ctxBuffer.fillRect(0,0,this.canvasBuffer.width,this.canvasBuffer.height);
	this.ctxBuffer.restore();
	*/
	var x, y;
	this.ctxBuffer.beginPath();
	//Renderiza Worms
	for(var i = 0;i < worms.length; i++){
		//renderiza um worm por vez
		this.renderBufferWorm(worms[i]);
		/*this.ctxBuffer.save();
		this.ctxBuffer.beginPath();
		for(var i = 0;i <  worms[j].corpo.length; i++){
			x = worms[j].corpo[i].x * this.TILEWIDTH;
			y = worms[j].corpo[i].y * this.TILEHEIGHT;
			this.ctxBuffer.rect(x, y, this.TILEWIDTH, this.TILEHEIGHT);
		}
		this.ctxBuffer.fillStyle = worms[j].color;
		this.ctxBuffer.fill();
		this.ctxBuffer.restore();*/
	}

	//Renderiza Food
	this.ctxBuffer.beginPath();
	if (food.isVisible()) {
		this.renderBufferDiamond(food);
		/*this.ctxBuffer.fillStyle = food.style;
		x = food.getPos().x * this.TILEWIDTH;
		y = food.getPos().y * this.TILEHEIGHT;
		this.ctxBuffer.rect(x, y, this.TILEWIDTH, this.TILEHEIGHT);
		this.ctxBuffer.fill();
		if(food.isToxic()){
			this.ctxBuffer.stroke();
		}*/
	}
	//Renderiza Score
	for(var i = 0;i < worms.length; i++){
		this.renderBufferScore(i+1, worms[i].score, (i * 125)+ 10);
	}
	/*this.ctxBuffer.fillStyle = "black";
	this.ctxBuffer.strokeStyle = "white";
	this.ctxBuffer.font = "12pt Arial";
	var content = "Score: " + worms[0].score + "pt ";
	this.ctxBuffer.fillText(content, 5, this.canvasBuffer.height - 10);
	*/
	this.renderBufferLevel(level);
	/*
	var content = "Nivel: " + level;
	this.ctxBuffer.fillText(content, 5, 5);
	*/
	this.renderBufferRecord(MAX_SCORE);
	/*
	content = "Recorde: " + MAX_SCORE + "pt ";
	this.ctxBuffer.fillText(content, 5, 25);
	*/
	//Renderiza Propaganda
	this.renderBufferTitle("SUKURI");
	/*this.ctxBuffer.textAlign = 'center';
	this.ctxBuffer.textBaseline = 'middle';
	this.ctxBuffer.fillText("SUKURI",(this.canvasBuffer.width / 2), 12);
	*/
	this.renderBufferCopyright();
	/*this.ctxBuffer.textAlign = 'end';
	this.ctxBuffer.font = "8pt Arial";
	this.ctxBuffer.fillText("\u00A9POWERED BY LABORATÓRIO DE PÓS GRADUAÇÃO",
			this.canvasBuffer.width - 10, this.canvasBuffer.height - 10);
	*/
	this.renderBufferVersion("0.02");
	/*this.ctxBuffer.fillText("versão: 0.02",this.canvasBuffer.width - 10, 10);
	this.ctxBuffer.restore();
	*/
	//Aplica Buffer Secundario no Principal
	this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
	this.ctx.drawImage(this.canvasBuffer,0,0);
};

Graphic.prototype.renderBufferBackground = function (value) {
	this.ctxBuffer.save();
	this.ctxBuffer.fillStyle = this.BACKGROUNDS[ value % this.BACKGROUNDS.length];
	this.ctxBuffer.fillRect(0,0,this.canvasBuffer.width,this.canvasBuffer.height);
	this.ctxBuffer.restore();
};
Graphic.prototype.renderBufferWorm = function (worm) {
	var x, y;

	this.ctxBuffer.save();
	this.ctxBuffer.beginPath();
	for(var i = 0;i <  worm.corpo.length; i++){
		x = worm.corpo[i].x * this.TILEWIDTH;
		y = worm.corpo[i].y * this.TILEHEIGHT;
		this.ctxBuffer.rect(x, y, this.TILEWIDTH, this.TILEHEIGHT);
	}
	this.ctxBuffer.fillStyle = worm.color;
	this.ctxBuffer.fill();
	this.ctxBuffer.restore();
};
Graphic.prototype.renderBufferDiamond = function (food){
	this.ctxBuffer.save();
	this.ctxBuffer.fillStyle = food.style;
	var x = food.getPos().x * this.TILEWIDTH;
	var y = food.getPos().y * this.TILEHEIGHT;
	this.ctxBuffer.rect(x, y, this.TILEWIDTH, this.TILEHEIGHT);
	this.ctxBuffer.fill();
	if(food.isToxic()){
		this.ctxBuffer.stroke();
	}
	this.ctxBuffer.restore();
};
Graphic.prototype.renderBufferScore = function (i, score, position) {
	var text_score = "Worm_" + i + ": " + score + "pt ";

	this.ctxBuffer.save();

	this.ctxBuffer.textAlign = "start";
	this.ctxBuffer.textBaseline = "alphabetic"
	this.ctxBuffer.fillStyle = "black";
	this.ctxBuffer.strokeStyle = "white";
	this.ctxBuffer.font = "12pt Arial";
	this.ctxBuffer.fillText(text_score, position, this.canvasBuffer.height - 10);

	this.ctxBuffer.restore();
};
Graphic.prototype.renderBufferTitle = function (text) {
	this.ctxBuffer.save();
	this.ctxBuffer.textAlign = 'center';
	this.ctxBuffer.textBaseline = 'top';
	this.ctxBuffer.font = '12pt Arial';
	this.ctxBuffer.fillText(text,(this.canvasBuffer.width / 2), 12);
	this.ctxBuffer.restore();
};
Graphic.prototype.renderBufferCopyright = function (){
	var copyright = "\u00A9POWERED BY LABORATÓRIO DE PÓS GRADUAÇÃO";
	this.ctxBuffer.save();
	this.ctxBuffer.textAlign = 'end';
	this.ctxBuffer.textBaseline = 'bottom';
	this.ctxBuffer.font = "8pt Arial";
	this.ctxBuffer.fillText(copyright,this.canvasBuffer.width - 10, this.canvasBuffer.height - 10);
	this.ctxBuffer.restore();
};
Graphic.prototype.renderBufferVersion = function (version) {
	this.ctxBuffer.save();
	this.ctxBuffer.textAlign = 'end';
	this.ctxBuffer.textBaseline = 'middle';
	this.ctxBuffer.font = "8pt Arial";
	this.ctxBuffer.fillText("v." + version,this.canvasBuffer.width - 10, 10);
	this.ctxBuffer.restore();
};
Graphic.prototype.renderBufferLevel = function (level){
	this.ctxBuffer.save();
	this.ctxBuffer.textAlign = 'start';
	this.ctxBuffer.textBaseline = 'top';
	this.ctxBuffer.font = "8pt Arial";
	this.ctxBuffer.fillText("Nivel: " + level, 5, 5);
	this.ctxBuffer.restore();
};
Graphic.prototype.renderBufferRecord = function (recorde){
	this.ctxBuffer.save();
	this.ctxBuffer.textAlign = 'start';
	this.ctxBuffer.textBaseline = 'top';
	this.ctxBuffer.font = "8pt Arial";
	this.ctxBuffer.fillText("Recored: " + recorde +"pt", 5, 25);
	this.ctxBuffer.restore();
};
