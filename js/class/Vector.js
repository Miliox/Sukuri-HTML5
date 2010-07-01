"use strict";
/*
Classe Vector:
 Atributos:
	Number x,y: coordenadas Espaciais 2D

 Metodo:
	Construtor Vector (Number x,Number y):
	
	--comparação--
	bool equals(Vector vec): Verifica se o vec representa o mesmo vetor
	
	--operacoes--
	Vector add(Vector vec): soma vec e o vetor atual, retorna o novo Vector
	Vector subtract(Vector vec): subtrai vec ao vetor atual, retorna o novo Vector
	null addUpdate(Vector vec): soma vec ao vetor atual
*/
function Vector(x, y) {
	this.x = x || 0;
	this.y = y || 0;
}
Vector.prototype.equals = function (vec) {
	if ((this.x === vec.x) && (this.y === vec.y)) {
		return true;
	}
	return false;
};
Vector.prototype.add = function (vec) {
	return new Vector(this.x+vec.x,this.y+vec.y);
};
Vector.prototype.addUpdate = function(vec) {
	this.x += vec.x;
	this.y += vec.y;
};
Vector.prototype.subtract = function (vec) {
	return new Vector(this.x-vec.x,this.y-vec.y);
};
