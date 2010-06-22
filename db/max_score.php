<?php 
	if(isset($_POST['setscore'])){
		$score = (int) $_POST['setscore'];
	}
	else{
		$score = 0;
	}

	$user = 'nibbles';
	$password = '';
	$query = "SELECT max(record) AS max_score FROM scores";

	mysql_connect('localhost',$user,$password) or die(mysql_error());
	mysql_select_db('nibbles') or die(mysql_error());

	$result = mysql_query($query);
	$row = mysql_fetch_assoc($result);

	$max_score = (int) $row['max_score'];
	
	if($max_score < $score){
		mysql_query("INSERT INTO scores (record) values (" . $score . ")") or die(mysql_error());
		
		$result = mysql_query($query);
		$row = mysql_fetch_assoc($result);
		$max_score = (int) $row['max_score'];
	}
	
	echo $max_score;
?>
