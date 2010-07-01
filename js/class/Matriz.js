/* Classe que representa matricialmente a fase
 * Atributos:
 * 	--constantes--
 * 	Number LINES
 * 	Number COLUMS
 * 	Number DEFAULTVALUE: valor inicial que representa um espaco vazio
 * 	Number WALLVALUE: valor que define uma parede
 *
 * 	--representacao da matriz--
 * 	Array< Array<Number> > matriz:
 *
 * Métodos:
 * 	Construtor Matriz(Number width, Number height, Number valorInicial):
 *	
 *	--metodos de limpeza--
 * 	null clearMatriz(): todos os itens da matriz com valor inicial
 * 	null clearPositions(Array<Vector> lista): aplica o valor padrao as celulas presentes no Array lista
 * 	null clearCell(Vector cell): aplica o valor padrao a uma unica celula na matriz
 * 	
 *	--metodos de atribuicao--
 * 	null setPositions(Array<Vector> lista, Number value): aplica as celulas indicadas na lista, o valor indicado
 * 	nulll setCell(Vector cell, Number value): aplica na celula da matriz o valor indicado em value
 *	null setWallCell(Vector cell): atribui na area indicada pelo cell como parede
 *	
 *	--metodo de acesso--
 *	Number getDistance(Vector firstCell, Vector secondCell):
 * 	Number getCell(Vector cell): Obtem o valor na posicao da matriz indicada pelo vetor cell
 *
 *	--outros--
 *	bool isValidPos(Vector cell): verifica limites da entrada na matriz
 *	null circularCorrectCell(cell): corrige cell para um valor dentro da matriz
 */

function Matriz (width, height, startValue, wallValue){
	//Metricas	
	this.LINES = height;
	this.COLUMS = width;

	//Valor
	this.DEFAULTVALUE = startValue || 0;
	this.WALLVALUE = wallValue || -1;
	this.matriz = new Array(this.LINES);

	//Inicializa Matriz
	this.clearMatriz();
};
Matriz.prototype.getCell = function (cell) {
	if(this.isValidPos(cell)) {
		return this.matriz[cell.y][cell.x];
	}
	else {
		return this.WALLVALUE;
	}
};
Matriz.prototype.clearMatriz = function () {
	var lin, col;
	for(lin = 0; lin < this.matriz.length; lin++) {
		this.matriz[lin] = new Array(this.COLUMS);
		for(col = 0; col < this.matriz[lin].length; col++){
			this.matriz[lin][col] = this.DEFAULTVALUE;
		}
	}
};
Matriz.prototype.clearPositions = function (lista) {
	var cell, i;
	for(i = 0; i < lista.length; i++) {
		cell = lista[i];
		this.clearCell(cell);
	}
};
Matriz.prototype.clearCell = function (cell){
	if(this.isValidPos(cell)) {
		this.matriz[cell.y][cell.x] = this.DEFAULTVALUE;
	}
};
Matriz.prototype.setPositions = function (lista, value) {
	var cell, i;
	for(i = 0; i < lista.length; i++) {
		cell = lista[i];
		this.setCell(cell, value);
	}
};
Matriz.prototype.setCell = function (cell, value){
	if(this.isValidPos(cell)) {
		this.matriz[cell.y][cell.x] = value;
	}
};
Matriz.prototype.setWallPositions = function (lista) {
	var cell, i;
	for(i = 0; i < lista.length; i++) {
		cell = lista[i];
		this.setWallCell(cell);
	}
};
Matriz.prototype.setWallCell = function (cell){
	if(this.isValidPos(cell)) {
		this.matriz[cell.y][cell.x] = this.WALLVALUE;
	}
};
Matriz.prototype.isValidPos = function (cell) {
	if(cell.x >= this.COLUMS || cell.x < 0 ||
		cell.y >= this.LINES || cell.y < 0) {
			return false;
	}
	return true;
};
Matriz.prototype.circularCorrectCell = function (cell) {
	cell.addUpdate(new Vector(this.COLUMS,this.LINES));
	cell.x %= this.COLUMS;
	cell.y %= this.LINES;
};
Matriz.prototype.getDistance = function (firstCell, secondCell) {
	var dx = firstCell.x - secondCell.x;
	if (Math.abs(dx) > Math.floor(this.LINES / 2)){
		dx = secondCell.x - firstCell.x;
	}
	var dy = firstCell.y - secondCell.y;
	if (Math.abs(dy) > Math.floor(this.COLUMS / 2)){
		dy = secondCell.y - firstCell.y;
	}

	var distance = Math.pow(dx,2);
	distance += Math.pow(dy,2);
	distance = Math.sqrt(distance);

	return distance;
};
