var xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = maxScoreProcess;

//obtem o record no servidor
function loadRemoteScore(score){
	var url = '/nibbles/db/max_score.php';
	var method = function (score) {
			if(typeof score == "number") { return 'POST' };
			return 'GET';
		} (score);
	var content = null;

	xmlHttp.open(method, url, true);
	if(method === 'POST'){
		param = "setscore=" + score;
		xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlHttp.setRequestHeader("Content-length",content.length);
		xmlHttp.setRequestHeader("Connection","close");
	}
	xmlHttp.send(content);
}

function maxScoreProcess(){
	//aguardar ter "completado"
	if ((xmlHttp.readyState === 4) && (xmlHttp.status === 200)) {
		game.maxScore = parseInt(xmlHttp.responseText);
	}
}
