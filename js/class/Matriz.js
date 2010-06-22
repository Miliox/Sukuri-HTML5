/* Classe que representa matricialmente a fase
 *
 * 	Matriz(Number width, Number height, Number valorInicial): Construtor
 *
 * 	clearPositions(Array<Vector> lista): aplica o valor padrao as celulas presentes no Array lista
 * 	clearCell(Vector cell): aplica o valor padrao a uma unica celula na matriz
 * 	atribPositions(Array<Vector> lista, Number value): aplica as celulas indicadas no Array lista, o valor de value
 * 	atribCell(Vector cell, Number value):	aplica na celula da matriz o valor indicado em value
 * 	getCell(Vector cell): Obtem o valor na posicao da matriz indicada pelo vetor cell
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
Matriz.prototype.isValidPos = function (cell) {
	if(cell.x >= this.COLUMS || cell.x < 0 ||
		cell.y >= this.LINES || cell.y < 0) {
			return false;
	}
	return true;
};
Matriz.prototype.getCell = function (cell) {
	if(this.isValidPos(cell)) {
		return this.matriz[cell.y][cell.x];
	}
	else {
		return this.WALLVALUE;
	}
};
