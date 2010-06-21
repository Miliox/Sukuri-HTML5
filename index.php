<?php  
  header('Content-type: text/html; charset=utf-8'); 
?>
<!doctype html>
<html>
	<head>
		<title>SUKURI 0.03</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		<script type="text/javascript" src="js/class/Vector.js"></script>
		<script type="text/javascript" src="js/class/Diamond.js"></script>
		<script type="text/javascript" src="js/class/Worm.js"></script>
		<script type="text/javascript" src="js/class/Matriz.js"></script>
		<script type="text/javascript" src="js/class/Graphic.js"></script>				
		<script type="text/javascript" src="js/class/Nibbles.js"></script>
		<script type="text/javascript" src="js/ajax.js"></script>
		<script type="text/javascript" src="js/intro.js"></script>
		<script type="text/javascript" src="js/main.js"></script>
		<style type="text/css">
			canvas {
				/*Centraliza*/
				position: absolute;
				top: 50%;
				left: 50%;
				
				/*Corrigi alinhamento para o centro*/
				margin-left: -480px;
				margin-top: -250px;

				/*Destaca o Elemento do Fundo*/
				border: 1px solid black;
			}
		</style>
	</head>
	<body>
		<canvas id="nibbles" width="960" height="500">
			<p>Seu Browser não suporta o Elemento Canvas</p>
		</canvas>
	</body>
</html>
