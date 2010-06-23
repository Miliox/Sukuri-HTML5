NIBBLES_MAPS = {
	level1 : function(){
		var lv1_arr = [];
		var i;
		/*
		 *	MAPA
		 *	.................
		 *	:____	    ____:
		 *	:	|	:       :
		 *	:    -------	:
		 *	:____	|   ____:
		 *	:		:       :
		 *	:...............:
		 */
		//
		for(i = 25; i < 71; i++){
			lv1_arr.push(new Vector(i,25));
		}
		for(i = 10; i < 40; i++){
			lv1_arr.push(new Vector(48,i));
		}
		for(i = 0; i < 25; i++){
			lv1_arr.push(new Vector(i,10));
		}
		for(i = 0; i < 25; i++){
			lv1_arr.push(new Vector(i,40));
		}
		for(i = 0; i < 25; i++){
			lv1_arr.push(new Vector(95-i,10));
		}
		for(i = 0; i < 25; i++){
			lv1_arr.push(new Vector(95-i,40));
		}
		return lv1_arr;
	}(),
	level2: function(){
		var lv2_arr = [];
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
		for(i = 0; i < 96; i++){
			lv2_arr.push(new Vector(i,0));
		}
		for(i = 0; i < 50; i++){
			lv2_arr.push(new Vector(0,i));
		}
		for(i = 0; i < 96; i++){
			lv2_arr.push(new Vector(i,49));
		}
		for(i = 0; i < 50; i++){
			lv2_arr.push(new Vector(95,i));
		}
		return lv2_arr;
	}(),
	level3: function(){
		var lv3_arr = [];
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

		for(i = 0; i < 96; i++){
			lv3_arr.push(new Vector(i,25));
		}
		for(i = 0; i < 50; i++){
			lv3_arr.push(new Vector(48,i));
		}
		return lv3_arr;
	}(),
	level4: function(){
		var lv4_arr = [];
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

		for(i = 0; i < 20; i++){
			lv4_arr.push(new Vector(0,i));
		}
		for(i = 0; i < 20; i++){
			lv4_arr.push(new Vector(0,49-i));
		}
		for(i = 0; i < 20; i++){
			lv4_arr.push(new Vector(95,i));
		}
		for(i = 0; i < 20; i++){
			lv4_arr.push(new Vector(95,49-i));
		}

		for(i = 0; i <= 35; i++){
			lv4_arr.push(new Vector(i,0));
		}
		for(i = 0; i < 35; i++){
			lv4_arr.push(new Vector(95-i,0));
		}
		for(i = 0; i < 35; i++){
			lv4_arr.push(new Vector(95-i,49));
		}
		for(i = 0; i <= 35; i++){
			lv4_arr.push(new Vector(i,49));
		}

		for(i = 35;i < (96-35);i++){
			lv4_arr.push(new Vector(i,15));
		}
		for(i = 35;i < (96-35);i++){
			lv4_arr.push(new Vector(i,35));
		}

		for(i = 0;i < 15;i++){
			lv4_arr.push(new Vector(48,i));
		}
		for(i = 0;i < 15;i++){
			lv4_arr.push(new Vector(48,49-i));
		}

		for(i = 25;i < (96-25);i++){
			lv4_arr.push(new Vector(i,25));
		}

		for(i = 15;i < (50-15);i++){
			lv4_arr.push(new Vector(25,i));
		}
		for(i = 35;i < (50-16);i++){
			lv4_arr.push(new Vector(25,i));
		}

		for(i = 15;i < (50-15);i++){
			lv4_arr.push(new Vector(96-25,i));
		}
		for(i = 35;i < (50-16);i++){
			lv4_arr.push(new Vector(96-25,i));
		}

		for(i = 10;i < 20;i++){
			lv4_arr.push(new Vector(5,i));
		}
		for(i = 10;i < 20;i++){
			lv4_arr.push(new Vector(5,49-i));
		}
		for(i = 20;i < 29;i++){
			lv4_arr.push(new Vector(15,i));
		}
		for(i = 5;i < 15;i++){
			lv4_arr.push(new Vector(i,20));
		}
		for(i = 5;i < 16;i++){
			lv4_arr.push(new Vector(i,29));
		}


		for(i = 10;i < 20;i++){
			lv4_arr.push(new Vector(90,i));
		}
		for(i = 10;i < 20;i++){
			lv4_arr.push(new Vector(90,49-i));
		}
		for(i = 20;i < 29;i++){
			lv4_arr.push(new Vector(96-15,i));
		}
		for(i = 5;i < 15;i++){
			lv4_arr.push(new Vector(95-i,49-20));
		}
		for(i = 5;i < 15;i++){
			lv4_arr.push(new Vector(95-i,29));
		}
		for(i = 5;i < 15;i++){
			lv4_arr.push(new Vector(95-i,20));
		}

		return lv4_arr;
	}()
};
