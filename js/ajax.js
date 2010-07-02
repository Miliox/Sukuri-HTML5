var xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = maxScoreProcess;
function loadRemoteScore(score){
	var url = '/nibbles/db/max_score.php';
	var method = function (score) {
			if(typeof score == "number") { return 'POST' };
			return 'GET';
		} (score);

	xmlHttp.open(method, url, true);
	if(method === 'POST'){
		score = "setscore=" + score;
		xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlHttp.setRequestHeader("Content-length",score.length);
		xmlHttp.setRequestHeader("Connection","close");
	}
	xmlHttp.send(score);
}
function maxScoreProcess(score)
{
	// apenas quando o estado for "completado"
	if ((xmlHttp.readyState === 4) && (xmlHttp.status === 200)) {
		game.maxScore = parseInt(xmlHttp.responseText);
	}
}
