//mapas implementados
var NIBBLES_MAPS = {
	level1 : function(max_width,max_height){
		var lv_arr = [];
		var i, j;
		/*
		 *	MAPA
		 *	.................
		 *	:____	    ____:
		 *	:	|	:
		 *	:    -------	:
		 *	:____	|   ____:
		 *	:		:
		 *	:...............:
		 */
		//barra vertical central
		for(i = 25; i < max_width - 25; i++){
			lv_arr.push(new Vector(i,Math.floor(max_height / 2)));
		}
		//barra horizontal central
		for(i = 10; i < 36; i++){
			lv_arr.push(new Vector(Math.floor(max_width / 2),i));
		}
		for(i = 0; i < 25; i++){
			//barras paralelas da esquerda
			lv_arr.push(new Vector(i,10));
			lv_arr.push(new Vector(max_width -1 -i,10));
			//barras paralelas da direita
			lv_arr.push(new Vector(i,max_height - 10));
			lv_arr.push(new Vector(max_width -1 -i,max_height - 10));
		}
		return lv_arr;
	}(96,46),
	level2: function(max_width, max_height){
		var lv_arr = [];
		var i;
		/*
		 *	MAPA
		 *	-----------------
		 *	|		|
		 *	|		|
		 *	|		|
		 *	|		|
		 *	|		|
		 *	-----------------
		 *
		 */
		//barras horizontal superior e inferior
		for(i = 0; i < max_width; i++){
			lv_arr.push(new Vector(i,0));
			lv_arr.push(new Vector(i,max_height-1));
		}
		//barras verticais da esquerda e direita
		for(i = 0; i < max_height; i++){
			lv_arr.push(new Vector(0,i));
			lv_arr.push(new Vector(max_width-1,i));
		}
		return lv_arr;
	}(96,46),
	level3: function(max_width, max_height){
		var lv_arr = [];
		var i;
		/*
		 *	MAPA
		 *	.................
		 *	:	|	:
		 *	:	|	:
		 *	:-------|-------:
		 *	:	|	:
		 *	:	|	:
		 *	:...............:
		 *
		 */

		for(i = 0; i < max_width; i++){
			lv_arr.push(new Vector(i,Math.floor(max_height / 2)));
		}
		for(i = 0; i < max_height; i++){
			lv_arr.push(new Vector(Math.floor(max_width / 2),i));
		}
		return lv_arr;
	}(96,46),
	level4: function(max_width, max_height){
		var lv_arr = [];
		var i;
		/*
		 *	MAPA
		 *	______......_____
		 *	| 	|       |
		 *	||_   __|__  |_	|
		 *	:  ||_______|  |: 
		 *	: _|| _____ | _|:
		 *	||	|    |  |
		 *	|____...|...____|
		 *
		 */
		//barras verticais das extremidades superior e inferior
		for(i = 0; i < 18; i++){
			lv_arr.push(new Vector(0,i));
			lv_arr.push(new Vector(0,max_height-1-i));
			lv_arr.push(new Vector(max_width-1,max_height-1-i));
			lv_arr.push(new Vector(max_width-1,i));
		}
		//barras verticais da extremidade superior e inferior
		for(i = 0; i <= 35; i++){
			lv_arr.push(new Vector(i,0));
			lv_arr.push(new Vector(max_width-1-i,0));
			lv_arr.push(new Vector(i,max_height-1));
			lv_arr.push(new Vector(max_width-1-i,max_height-1));
		}
		//barras horizontais centrais
		for(i = 35;i < (max_width-35);i++){
			lv_arr.push(new Vector(i,Math.floor(max_height / 3)));
			lv_arr.push(new Vector(i,Math.floor(max_height * (2 / 3))));
		}
		//barras verticais centrais
		for(i = 0;i < Math.floor(max_height / 3);i++){
			lv_arr.push(new Vector(Math.round((max_width-1) / 2),i));
			lv_arr.push(new Vector(Math.round((max_width-1)/ 2),max_height-1-i));
			lv_arr.push(new Vector(Math.floor((max_width-1) / 2),i));
			lv_arr.push(new Vector(Math.floor((max_width-1)/ 2),max_height-1-i));
		}
		//barras verticais entre o centro e as laterais
		for(i = 0;i < 12;i++){
			lv_arr.push(new Vector(i+8,17));
			lv_arr.push(new Vector(i+8,max_height-17-1));
			lv_arr.push(new Vector(max_width-1-i-8,17));
			lv_arr.push(new Vector(max_width-1-i-8,max_height-17-1));
		}
		//as 4 barras verticais que formam -_- da lateral
		for(i = 0; i < max_height - 2 * 17; i++){
			lv_arr.push(new Vector(20,17+i));
			lv_arr.push(new Vector(8,29+i));
			lv_arr.push(new Vector(max_width-1-8,29+i));
			lv_arr.push(new Vector(8,6+i));
			lv_arr.push(new Vector(max_width-1-8,6+i));
			lv_arr.push(new Vector(max_width-20-1,17+i));
		}
		//barra horizontal centralizada
		for(i = 0; i < Math.floor( max_width / 3);i++){
			lv_arr.push(new Vector(Math.floor(Math.floor(max_width / 3)+i),Math.floor(max_height / 2)));
		}
		//barras verticais ligadas no centro a barra hozintal do centro
		for(i = 0;i < Math.floor(max_height / 2);i++){
			lv_arr.push(new Vector(Math.floor(max_width / 3),i+Math.floor(max_height / 4)));
			lv_arr.push(new Vector(Math.floor(2 * (max_width / 3)),i+Math.floor(max_height / 4)));
		}
		return lv_arr;
	}(96,46)
};
