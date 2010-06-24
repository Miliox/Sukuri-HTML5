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
DIAMOND = [new Image(), new Image()];
DIAMOND[0].src = 'img/fruit.gif';
DIAMOND[1].src = 'img/fruit_venom.gif';
WALL = new Image();
WALL.src = 'img/wall.gif';
BACKGROUND_IMG = new Image();
BACKGROUND_IMG.src = 'img/patter.gif';

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

	this.DY = 20;
	this.TILEWIDTH = this.canvas.width/ tileX;
	this.TILEHEIGHT = (this.canvas.height - 40) / tileY;

	this.BACKGROUNDS = ["white","green","yellow","DarkSlategray", "orange"];
	this.DIAMOND = DIAMOND || [new Image(), new Image()];
	this.WALL = WALL || new Image();
	if(!DIAMOND){
		this.DIAMOND[0].src = 'img/fruit.gif';
		this.DIAMOND[1].src = 'img/fruit_venom.gif';
	}
	if(!WALL){
		this.WALL.src = 'img/wall.gif';
	}
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

	//renderiza footer e header
	this.renderBufferHeader();
	this.renderBufferFooter();
	//renderiza scores
	for(var i = 0;i < worms.length; i++){
		this.renderBufferScore(i+1, worms[i].score, worms[i].color, (i * 125)+5);
	}
	this.renderBufferLevel(level);
	this.renderBufferRecord(MAX_SCORE);

	//renderiza propaganda
	this.renderBufferTitle("SUKURI");
	this.renderBufferCopyright();
	this.renderBufferVersion("0.04");

	//aplica no canvas principal
	this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
	this.ctx.drawImage(this.canvasBuffer,0,0);
};
Graphic.prototype.renderBufferBackground = function (value) {
	this.ctxBuffer.save();
	this.ctxBuffer.save();
	this.ctxBuffer.fillStyle = this.ctxBuffer.createPattern(BACKGROUND_IMG,'repeat');
	this.ctxBuffer.fillRect(0,0,this.canvasBuffer.width,this.canvasBuffer.height);
	this.ctxBuffer.restore();
	this.ctxBuffer.globalAlpha = 0.2;
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
				if(this.WALL.complete){
					ctx.drawImage(this.WALL, x * this.TILEWIDTH, y * this.TILEHEIGHT + this.DY,this.TILEWIDTH,this.TILEHEIGHT);
				}
				else{
					ctx.rect(x * this.TILEWIDTH, y * this.TILEHEIGHT + this.DY, this.TILEWIDTH, this.TILEHEIGHT);
				}
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
	for(var i = 0;i <  worm.body.length; i++) {
		x = worm.body[i].x * this.TILEWIDTH;
		y = worm.body[i].y * this.TILEHEIGHT;
		this.ctxBuffer.rect(x, y + this.DY, this.TILEWIDTH, this.TILEHEIGHT);
	}
	this.ctxBuffer.fillStyle = worm.color;
	this.ctxBuffer.fill();
	this.ctxBuffer.beginPath();
	this.ctxBuffer.fillStyle = 'rgba(0,0,0,0.25)';
	x = worm.body[0].x * this.TILEWIDTH;
	y = worm.body[0].y * this.TILEHEIGHT;
	this.ctxBuffer.fillRect(x, y + this.DY, this.TILEWIDTH, this.TILEHEIGHT);
	this.ctxBuffer.restore();
};
Graphic.prototype.renderBufferDiamond = function (food) {
	var x = food.getPos().x * this.TILEWIDTH;
	var y = food.getPos().y * this.TILEHEIGHT;
	if(this.DIAMOND[0].complete && this.DIAMOND[1].complete){
		if(food.isToxic()){
			this.ctxBuffer.drawImage(this.DIAMOND[1], x, y+this.DY,this.TILEWIDTH,this.TILEHEIGHT);
		}
		else{
			this.ctxBuffer.drawImage(this.DIAMOND[0], x, y+this.DY, this.TILEWIDTH,this.TILEHEIGHT);
		}
	}
};
Graphic.prototype.renderBufferScore = function (i, score, color, position) {
	var text_score = "Worm" + i + ": " + score + "pt ";

	this.ctxBuffer.save();
	this.setBufferTextFormat('start','alphabetic','bold 8pt Verdana');
	this.ctxBuffer.fillStyle = color;
	this.ctxBuffer.fillText(text_score, position, this.canvasBuffer.height - 5);
	//this.ctxBuffer.strokeText(text_score, position, this.canvasBuffer.height - 5);
	this.ctxBuffer.restore();
};
Graphic.prototype.renderBufferTitle = function (text) {
	this.ctxBuffer.save();
	this.setBufferTextFormat('center','top','bold 12pt Georgia');
	this.ctxBuffer.fillText(text,(this.canvasBuffer.width / 2), 2);
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
Graphic.prototype.renderBufferFooter = function (){
	this.ctxBuffer.save();
	this.ctxBuffer.beginPath();
	this.ctxBuffer.fillStyle = 'darkgray';
	this.ctxBuffer.rect(0,(this.canvasBuffer.height-20),this.canvasBuffer.width,20);
	this.ctxBuffer.fill();
	this.ctxBuffer.beginPath();
	this.ctxBuffer.restore();
};
Graphic.prototype.renderBufferHeader = function (){
	this.ctxBuffer.save();
	this.ctxBuffer.beginPath();
	this.ctxBuffer.fillStyle = 'darkgray';
	this.ctxBuffer.rect(0,0,this.canvasBuffer.width,20);
	this.ctxBuffer.fill();
	this.ctxBuffer.beginPath();
	this.ctxBuffer.restore();
};
