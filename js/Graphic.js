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

function Graphic(canvas, tileX, tileY, matriz){
	//Buffer Principal
	this.canvas = canvas;
	this.ctx = this.canvas.getContext('2d');
	//Buffer Secundario
	this.canvasBuffer = document.createElement('canvas');
	this.canvasBuffer.width = this.canvas.width;
	this.canvasBuffer.height = this.canvas.height;
	this.ctxBuffer = this.canvasBuffer.getContext('2d');
	//Buffer Paredes	
	this.canvasBufferWalls = document.createElement('canvas');
	this.canvasBufferWalls.width = this.canvas.width;
	this.canvasBufferWalls.height = this.canvas.height;

	//Metricas
	this.TILESX = tileX;
	this.TILESY = tileY;
	this.TILEWIDTH = this.canvas.width / tileX;
	this.TILEHEIGHT = this.canvas.height / tileY;

	this.BACKGROUNDS = ["white","green","yellow","DarkSlategray", "orange"];

	this.renderBufferWalls(matriz);
}
Graphic.prototype.render = function (worms, food, MAX_SCORE, level) {
	this.ctxBuffer.save();

	this.renderBufferBackground(level - 1);
	//renderiza paredes - pre-renderizado
	this.ctxBuffer.drawImage(this.canvasBufferWalls,0,0);

	//renderiza worms
	for(var i = 0;i < worms.length; i++){
		this.renderBufferWorm(worms[i]);
	}
	this.ctxBuffer.beginPath();

	//renderiza food
	if (food.isVisible()) {
		this.renderBufferDiamond(food);
	}
	//renderiza scores
	for(var i = 0;i < worms.length; i++){
		this.renderBufferScore(i+1, worms[i].score, worms[i].color, (i * 125)+5);
	}
	this.renderBufferLevel(level);
	this.renderBufferRecord(MAX_SCORE);

	//renderiza propaganda
	this.renderBufferTitle("SUKURI");
	this.renderBufferCopyright();
	this.renderBufferVersion("0.028");

	//aplica no canvas principal
	this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
	this.ctx.drawImage(this.canvasBuffer,0,0);
};
Graphic.prototype.renderBufferBackground = function (value) {
	this.ctxBuffer.save();
	this.ctxBuffer.fillStyle = this.BACKGROUNDS[ value % this.BACKGROUNDS.length];
	this.ctxBuffer.fillRect(0,0,this.canvasBuffer.width,this.canvasBuffer.height);
	this.ctxBuffer.restore();
};
Graphic.prototype.renderBufferWalls = function(matriz){
	var ctx = this.canvasBufferWalls.getContext('2d');
	ctx.beginPath();
	var x, y;
	if(matriz === undefined){
		return;
	};
	for(y = 0; y < this.TILESY; y++){
		for(x = 0; x < this.TILESX; x++) {
			if(matriz.getCell(new Vector(x, y)) < 0){
				ctx.rect(x * this.TILEWIDTH, y * this.TILEHEIGHT, this.TILEWIDTH, this.TILEHEIGHT);
			}
		}
	}
	ctx.fillStyle = 'gray';
	ctx.fill();
};
Graphic.prototype.renderBufferWorm = function (worm) {
	var x, y;

	this.ctxBuffer.save();
	this.ctxBuffer.beginPath();
	for(var i = 0;i <  worm.corpo.length; i++) {
		x = worm.corpo[i].x * this.TILEWIDTH;
		y = worm.corpo[i].y * this.TILEHEIGHT;
		this.ctxBuffer.rect(x, y, this.TILEWIDTH, this.TILEHEIGHT);
	}
	this.ctxBuffer.fillStyle = worm.color;
	this.ctxBuffer.fill();
	this.ctxBuffer.restore();
};
Graphic.prototype.renderBufferDiamond = function (food) {
	this.ctxBuffer.save();
	this.ctxBuffer.beginPath();
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
Graphic.prototype.renderBufferScore = function (i, score, color, position) {
	var text_score = "Worm" + i + ": " + score + "pt ";

	this.ctxBuffer.save();
	this.setBufferTextFormat('start','alphabetic','8pt Verdana');
	this.ctxBuffer.fillStyle = color;
	this.ctxBuffer.fillText(text_score, position, this.canvasBuffer.height - 5);

	this.ctxBuffer.restore();
};
Graphic.prototype.renderBufferTitle = function (text) {
	this.ctxBuffer.save();
	this.setBufferTextFormat('center','top','bold 12pt Georgia');
	this.ctxBuffer.fillText(text,(this.canvasBuffer.width / 2), 5);
	this.ctxBuffer.restore();
};
Graphic.prototype.renderBufferCopyright = function (){
	var copyright = "\u00A9POWERED BY LABORATÓRIO DE PÓS GRADUAÇÃO";
	this.ctxBuffer.save();
	this.setBufferTextFormat('end','bottom','8pt Arial');
	this.ctxBuffer.fillText(copyright,this.canvasBuffer.width - 5, this.canvasBuffer.height - 5);
	this.ctxBuffer.restore();
};
Graphic.prototype.renderBufferVersion = function (version) {
	this.ctxBuffer.save();
	this.setBufferTextFormat('end','top','8pt Arial');
	this.ctxBuffer.fillText("v." + version,this.canvasBuffer.width - 5, 5);
	this.ctxBuffer.restore();
};
Graphic.prototype.renderBufferLevel = function (level){
	this.ctxBuffer.save();
	this.setBufferTextFormat('start','top','8pt Verdana');
	this.ctxBuffer.fillText("Nivel: " + level, 5, 5);
	this.ctxBuffer.restore();
};
Graphic.prototype.renderBufferRecord = function (recorde){
	this.ctxBuffer.save();
	this.setBufferTextFormat('start','top','8pt Verdana');
	this.ctxBuffer.fillText("Record: " + recorde +"pt", 80, 5);
	this.ctxBuffer.restore();
};
Graphic.prototype.setBufferTextFormat = function (align, baseline, font){
	this.ctxBuffer.textAlign = align;
	this.ctxBuffer.textBaseline = baseline;
	this.ctxBuffer.font = font;
};
