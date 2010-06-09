/*
	Descreve o Funcionamento do Jogo
*/
function gameInit(){
	if(!Graphic && !Vector){
		document.setTimeOut(gameInit, 150);
	}
	else {
		var display = new Graphic(document.getElementById('nibbles'), 128, 80);
		display.render([ new Vector(1, 3),
						 new Vector(1, 4),
						 new Vector(1, 5),
						 new Vector(2, 5)
					   ]);
	}
	
	/*Esboço
	if(Graphic && Worm && Nibbles){
		game = new Nibbles;
		game.start();
	}
	else{
		document.setTimeOut(gameInit, 150);
	}*/

}


window.onload = gameInit;
