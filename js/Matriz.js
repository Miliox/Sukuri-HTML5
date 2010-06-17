function Matriz (width, height, valorInicial){
	//Metricas	
	this.LINES = height;
	this.COLUMS = width;

	//Valor
	this.DEFAULTVALUE = valorInicial;

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

Matriz.prototype.atribPositions = function (lista, value) {
	var cell, i;
	for(i = 0; i < lista.length; i++) {
		cell = lista[i];
		this.atribCell(cell, value);
	}
};

Matriz.prototype.atribCell = function (cell, value){
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
		return -1;
	}
};
