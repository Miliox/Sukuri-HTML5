/*
Classe Graphic:
 Atributos:
 	--Canvas primário--
	HTMLCanvasElement canvas: canvas de saida
	CanvasRenderingContext2D ctx: contexto para manipulacao

	--Canvas(Buffer) Secundário--
	HTMLCanvasElement canvasBuffer: canvas para Double Buffering
	CanvasRenderingContext2D ctxBuffer: contexto para manipulacao

	--métricas--
	Number TILEWIDTH:	dimensao horizontal base
	Number TILEHEIGHT:	dimensao vertical base
	Number TILESX: numero de quadros na horizontal
	Number TILESY: numero de quadros na vertical
	Number HEADERHEIGHT: altura do cabecalho
	Number FOOTERHEIGHT: altura do rodape

	--texturas--
	Array<String> BACKGROUNDS: texturas do fundo (por enquanto a cor em CSS)
	Array<image> DIAMOND: textura dos diamantes
	
 Métodos:
	Construtor Graphic(HTMLCanvasElement canvas, Number tileX, Number tileY):
	--renderiza jogo--	
	null render(Array<Worm> worms,Diamond food, Number MAX_SCORE, Number level): renderiza um frame
	
	--subdivisões de render, processamento no buffer secundário--
	null renderBufferBackground(Number value): renderiza o fundo, cor definida pelo value
	null renderBufferWalls(Matriz matriz): pre-renderiza paredes
	null renderBufferWorm(Worm worm): renderiza o worm
	null renderBufferDiamond(Diamond food): renderiza Diamond
	null renderBufferScore(Number i, Number score, String color, Number position): renderiza o score
	null renderBufferTitle(String text): renderiza o titulo na parte superior central
	null renderBufferCopyright(): renderiza ©
	null renderBufferLevel(Number level): renderiza level
	null renderBufferRecord(Number recorde): renderiza record atual
	null renderBufferFooter(): renderiza rodape
	null renderBufferHeader(): renderiza cabecalho
	null setBufferTextFormat(String aling, String baseline, String font): formata caracteristica do texto

	--renderizacao das telas iniciais--
	null renderGameMenu(): tela inicial
	null renderGameAbout(): tela de informacoes

 */

//texturas
DIAMOND = [new Image(), new Image()];
DIAMOND[0].src = 'img/fruit.gif';
DIAMOND[1].src = 'img/fruit_venom.gif';
WALL = new Image();
WALL.src = 'img/wall.gif';
BACKGROUND_IMG = new Image();
BACKGROUND_IMG.src = 'img/patter.gif';
PATTERNTITLE = new Image();
PATTERNTITLE.src = "img/title.png";

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

	this.HEADERHEIGHT = 20;
	this.FOOTERHEIGHT = 20;

	this.TILEWIDTH = this.canvas.width/ tileX;
	this.TILEHEIGHT = (this.canvas.height - this.HEADERHEIGHT - this.FOOTERHEIGHT) / tileY;

	this.BACKGROUNDS = ["white","green","yellow","DarkSlategray", "orange",
		"red", "brown", "darkgreen", "gold", "maroon", "olive", "lightgreen"];
	this.DIAMOND = DIAMOND;
	this.WALL = WALL;
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
	this.renderBufferVersion("0.05");

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
	ctx.clearRect(0,0,this.canvasBufferWalls.width,this.canvasBufferWalls.height);
	ctx.beginPath();
	var x, y;
	var i, j;
	if(matriz === undefined){ return; };
	for(j = 0; j < this.TILESY; j++){
		for(i = 0; i < this.TILESX; i++) {
			if(matriz.getCell(new Vector(i, j)) < 0){
				x = i * this.TILEWIDTH;
				y = j * this.TILEHEIGHT + this.HEADERHEIGHT;
				ctx.drawImage(this.WALL, x, y,this.TILEWIDTH,this.TILEHEIGHT);
			}
		}
	}
};
Graphic.prototype.renderBufferWorm = function (worm) {
	var x, y;

	this.ctxBuffer.save();
	this.ctxBuffer.beginPath();
	for(var i = 0;i <  worm.body.length; i++) {
		x = worm.body[i].x * this.TILEWIDTH;
		x += this.TILEWIDTH / 2;
		y = worm.body[i].y * this.TILEHEIGHT + this.HEADERHEIGHT;
		y += this.TILEHEIGHT / 2;
		this.ctxBuffer.arc(x, y, this.TILEWIDTH / 2, 0, 2*Math.PI+0.01,false);
		this.ctxBuffer.fillStyle = worm.color;
		this.ctxBuffer.fill();
		this.ctxBuffer.globalAlpha = 0.3;
		this.ctxBuffer.stroke();
		this.ctxBuffer.globalAlpha = 1;
		this.ctxBuffer.beginPath();
	}
	this.ctxBuffer.restore();
};
Graphic.prototype.renderBufferDiamond = function (food) {
	var x = food.getPos().x * this.TILEWIDTH;
	var y = food.getPos().y * this.TILEHEIGHT + this.HEADERHEIGHT;
	if(food.isToxic()){
		this.ctxBuffer.drawImage(this.DIAMOND[1], x, y,this.TILEWIDTH,this.TILEHEIGHT);
	}
	else{
		this.ctxBuffer.drawImage(this.DIAMOND[0], x, y, this.TILEWIDTH,this.TILEHEIGHT);
	}
};
Graphic.prototype.renderBufferScore = function (i, score, color, position) {
	var text_score = "Worm" + i + ": " + score + "pt ";

	this.ctxBuffer.save();
	this.setBufferTextFormat('start','alphabetic','bold 8pt Verdana');
	this.ctxBuffer.fillStyle = color;
	this.ctxBuffer.fillText(text_score, position, this.canvasBuffer.height - 5);
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
	var y = this.canvasBuffer.height - this.FOOTERHEIGHT;
	this.ctxBuffer.beginPath();
	this.ctxBuffer.fillStyle = 'darkgray';
	this.ctxBuffer.rect(0, y,this.canvasBuffer.width,this.FOOTERHEIGHT);
	this.ctxBuffer.fill();
	this.ctxBuffer.beginPath();
	this.ctxBuffer.restore();
};
Graphic.prototype.renderBufferHeader = function (){
	this.ctxBuffer.save();
	this.ctxBuffer.beginPath();
	this.ctxBuffer.fillStyle = 'darkgray';
	this.ctxBuffer.rect(0,0,this.canvasBuffer.width,this.HEADERHEIGHT);
	this.ctxBuffer.fill();
	this.ctxBuffer.beginPath();
	this.ctxBuffer.restore();
};
Graphic.prototype.renderGameMenu = function () {
	this.ctx.save();
	var centerX = this.canvas.width / 2;
	var centerY = this.canvas.height / 2;
	//background
	this.ctx.save();
	if(!PATTERNTITLE.complete){
		this.ctx.fillStyle = "green";
	}
	else{
		this.ctx.fillStyle = this.ctx.createPattern(PATTERNTITLE,'repeat');
	}
	this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);
	this.ctx.restore();
	//title
	this.ctx.font = '54pt Georgia';
	this.ctx.textBaseline = 'middle';
	this.ctx.textAlign = 'center';
	this.ctx.fillStyle = 'white';
	this.ctx.fillText('SUKURI', centerX, centerY);
	this.ctx.strokeStyle = 'black';
	this.ctx.strokeText('SUKURI', centerX, centerY);

	//start button
	this.ctx.font = 'bold 16pt Tahoma';
	this.ctx.fillText('START', centerX, centerY + 110);
	this.ctx.font = '12pt Tahoma';
	this.ctx.fillText('- Press Enter -', centerX, centerY + 130);

	//about button
	this.ctx.font = 'bold 12pt Tahoma';
	this.ctx.fillText('ABOUT', centerX, centerY + 170);
	this.ctx.font = '10pt Tahoma';
	this.ctx.fillText('- Press Space -', centerX, centerY + 190);
	//creditos
	this.ctx.font = '10pt Times New Roman';
	this.ctx.fillText('\u00A9 Laboratorio de Pós Graduação', centerX, centerY + 230);

	//versao
	this.ctx.textAlign = 'end';
	this.ctx.fillText('v.0.05', this.canvas.width - 10, this.canvas.height -10);
	this.ctx.restore();
};
Graphic.prototype.renderGameAbout = function () {
	this.ctx.save();
	var centerX = this.canvas.width / 2;
	var quarterY = this.canvas.height / 4;
	//background
	this.ctx.save()
	if(!PATTERNTITLE.complete){
		this.ctx.fillStyle = "green";
	}
	else{
		this.ctx.fillStyle = this.ctx.createPattern(PATTERNTITLE,'repeat');
	}
	this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);
	this.ctx.fillStyle = "rgba(0,0,0,0.5)";
	this.ctx.fillRect(45,45, this.canvas.width - 90, this.canvas.height - 90);
	this.ctx.restore();
	//title
	this.ctx.font = '54pt Georgia';
	this.ctx.textBaseline = 'middle';
	this.ctx.textAlign = 'center';
	this.ctx.fillStyle = 'white';
	this.ctx.fillText('SUKURI', centerX, quarterY);
	this.ctx.strokeStyle = 'black';
	this.ctx.strokeText('SUKURI', centerX, quarterY);

	//message
	this.ctx.font = 'bold 14pt Courier';
	this.ctx.fillText('Autor: Emiliano Carlos de Moraes Firmino', centerX, (3 * quarterY) - 60);
	this.ctx.fillText('Orientador: Jucimar Maia Junior', centerX, (3 * quarterY) - 20);
	this.ctx.fillText('Projeto: Desenvolvimento de Interface WEB em HTML5 para MMOG.', centerX, (3 * quarterY) + 27);
	this.ctx.fillText('\u00A9 Laboratorio de Pós Graduação', centerX, (3 * quarterY) + 60);

	this.ctx.font = 'sans-serif 12pt';
	this.ctx.fillText('- Press Enter -', centerX, 2 * quarterY);

	this.ctx.restore();
}
