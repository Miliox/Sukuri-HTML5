var xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = maxScoreProcess;
function loadRemoteScore(score)
{
	if(score){
		score = "setscore=" + score;
		xmlHttp.open("POST","/nibbles/db/max_score.php", true);
		xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlHttp.setRequestHeader("Content-length",score.length);
		xmlHttp.setRequestHeader("Connection","close");
	}
	else{
		xmlHttp.open("GET","/nibbles/db/max_score.php", true);
		score = null;
	}
	xmlHttp.send(score);
}
function maxScoreProcess(score)
{
	// apenas quando o estado for "completado"
	if (xmlHttp.readyState == 4) {
		// apenas se o servidor retornar "OK"
		if (xmlHttp.status == 200) {
			game.maxScore = parseInt(xmlHttp.responseText);
		}
	}
}
