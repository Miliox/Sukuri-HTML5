/* Descreve o Funcionamento do Jogo */

var game;	//solucao temporaria para BUG001

function menu() {
	var canvas = document.getElementById('nibbles');
	var ctx = canvas.getContext('2d');

	ctx.save();
	//background
	ctx.fillStyle = "green";
	ctx.fillRect(0,0, canvas.width, canvas.height);

	//title
	ctx.font = '54pt Georgia';
	ctx.textBaseline = 'middle';
	ctx.textAlign = 'center';
	ctx.fillStyle = 'white';
	ctx.fillText('SUKURI', canvas.width / 2, canvas.height / 2);
	ctx.strokeStyle = 'black';
	ctx.strokeText('SUKURI', canvas.width / 2, canvas.height / 2);

	//start Button
	ctx.font = 'bold 16pt Tahoma';
	ctx.fillText('START', canvas.width / 2, (canvas.height / 2) + 150);
	ctx.fillText('START', canvas.width / 2, (canvas.height / 2) + 150);
	ctx.font = '12pt Tahoma';
	ctx.fillText('- Press Enter -', canvas.width / 2, (canvas.height / 2) + 180);

	//creditos
	ctx.font = '10pt Times New Roman';
	ctx.fillText('\u00A9 Laboratorio de Pós Graduação', canvas.width / 2, (canvas.height / 2) + 230);

	//versao
	ctx.textAlign = 'end';
	ctx.fillText('v.0.018a', canvas.width - 5, canvas.height -5);
	ctx.restore();

	//aguarda o apertar o enter
	if (!document.addEventListener && document.attachEvent){
		document.attachEvent('onkeydown', waitEnter);
	} else {
		window.addEventListener('keydown', waitEnter, true);
	}
}

function waitEnter (event) {
	switch (event.keyCode){
		//player controls
		case 13: //Enter
			window.removeEventListener('keydown', waitEnter, true);
			gameInit();
			break;
		}
}

function gameInit(){
	/*Execute o Jogo*/
	if (Graphic === undefined ||
		Nibbles === undefined ||
		Vector === undefined||
		Worm === undefined ||
		Diamond === undefined ||
		Matriz === undefined) {
		//Aguarda ate que as Classes estejam carregadas
		window.setTimeOut(gameInit, 150);
	}
	else {
		//Inicializa Jogo
		var w0 = new Worm([new Vector(4,3),new Vector(3,3),new Vector(2,3),new
				Vector(1,3)],3, "red");
		var teclado_codes_w1 = {up : 87, down : 83, left : 65, right: 68};
		var w1 = new Worm([new Vector(52,38),new Vector(53,38),new Vector(54,38),new Vector(55,38)],2, "blue", teclado_codes_w1);
		game = new Nibbles(document.getElementById('nibbles'),[w0,w1]);
		//Registra Controle
		if (!document.addEventListener && document.attachEvent){
			document.attachEvent('onkeydown', keyboardInput);
		} else {
			window.addEventListener('keydown', keyboardInput, true);
		}
		//Inicia Jogo
		game.start();
	}
}

function keyboardInput (event) {
	game.inputRegister(event.keyCode);
};
window.onload = menu;
