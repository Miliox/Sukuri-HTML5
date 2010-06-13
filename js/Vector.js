"use strict";
/*
	Classe Vector:
		Number x,y: coordenadas Espaciais
	Metodo:
		Construtor Vector (Number x,Number y);
		equals(Vector vec): Verifica dois vetores São Iguais 
*/
function Vector(x, y) {
	this.x = x;
	this.y = y;
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
