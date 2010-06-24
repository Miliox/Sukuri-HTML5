var pattern_title = new Image();
pattern_title.src = "img/title.png";

function menu() {
	var canvas = document.getElementById('nibbles');
	var ctx = canvas.getContext('2d');

	ctx.save();
	//background
	ctx.save()
	if(!pattern_title.complete){
		ctx.fillStyle = "green";
	}
	else{
		ctx.fillStyle = ctx.createPattern(pattern_title,'repeat');
	}
	ctx.fillRect(0,0, canvas.width, canvas.height);
	ctx.restore();
	//title
	ctx.font = '54pt Georgia';
	ctx.textBaseline = 'middle';
	ctx.textAlign = 'center';
	ctx.fillStyle = 'white';
	ctx.fillText('SUKURI', canvas.width / 2, canvas.height / 2);
	ctx.strokeStyle = 'black';
	ctx.strokeText('SUKURI', canvas.width / 2, canvas.height / 2);

	//start button
	ctx.font = 'bold 16pt Tahoma';
	ctx.fillText('START', canvas.width / 2, (canvas.height / 2) + 110);
	ctx.font = '12pt Tahoma';
	ctx.fillText('- Press Enter -', canvas.width / 2, (canvas.height / 2) + 130);

	//about button
	ctx.font = 'bold 12pt Tahoma';
	ctx.fillText('ABOUT', canvas.width / 2, (canvas.height / 2) + 170);
	ctx.font = '10pt Tahoma';
	ctx.fillText('- Press Space -', canvas.width / 2, (canvas.height / 2) + 190);
	//creditos
	ctx.font = '10pt Times New Roman';
	ctx.fillText('\u00A9 Laboratorio de Pós Graduação', canvas.width / 2, (canvas.height / 2) + 230);

	//versao
	ctx.textAlign = 'end';
	ctx.fillText('v.0.04', canvas.width - 5, canvas.height -5);
	ctx.restore();

	//aguarda o apertar o enter
	if (!document.addEventListener && document.attachEvent){
		document.attachEvent('onkeydown', waitEnter);
	} else {
		window.addEventListener('keydown', waitEnter, true);
	}
}

function about() {
	var canvas = document.getElementById('nibbles');
	var ctx = canvas.getContext('2d');

	ctx.save();
	//background
	ctx.save()
	if(!pattern_title.complete){
		ctx.fillStyle = "green";
	}
	else{
		ctx.fillStyle = ctx.createPattern(pattern_title,'repeat');
	}
	ctx.fillRect(0,0, canvas.width, canvas.height);
	ctx.fillStyle = "rgba(0,0,0,0.5)";
	ctx.fillRect(45,45, canvas.width - 90, canvas.height - 90);
	ctx.restore();
	//title
	ctx.font = '54pt Georgia';
	ctx.textBaseline = 'middle';
	ctx.textAlign = 'center';
	ctx.fillStyle = 'white';
	ctx.fillText('SUKURI', canvas.width / 2, canvas.height / 4);
	ctx.strokeStyle = 'black';
	ctx.strokeText('SUKURI', canvas.width / 2, canvas.height / 4);

	//message
	ctx.font = 'bold 14pt Courier';
	ctx.fillText('Autor: Emiliano Carlos de Moraes Firmino',canvas.width/2,canvas.height * (3 / 4) - 60);
	ctx.fillText('Orientador: Jucimar Maia Junior', canvas.width / 2,canvas.height * (3/ 4) - 20);
	ctx.fillText('Projeto: Desenvolvimento de Interface WEB em HTML5 para MMOG.', canvas.width / 2, canvas.height * (3 / 4) + 27);
	ctx.fillText('\u00A9 Laboratorio de Pós Graduação', canvas.width /2,canvas.height * (3 / 4) + 60);

	ctx.font = 'sans-serif 12pt';
	ctx.fillText('- Press Enter -', canvas.width / 2, (canvas.height / 2));

	ctx.restore();
}
