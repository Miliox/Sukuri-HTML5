var xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = maxScoreProcess;
function loadRemoteScore(score)
{
	if(score){
		score = "?setscore="+score;
	}
	else{
		score = "";
	}
	xmlHttp.open("GET","/nibbles/db/max_score.php"+score, true);
	xmlHttp.send();
}
function maxScoreProcess()
{
	// apenas quando o estado for "completado"
	if (xmlHttp.readyState == 4) {
		// apenas se o servidor retornar "OK"
		if (xmlHttp.status == 200) {
			game.maxScore = parseInt(xmlHttp.responseText);
		}
	}
}
