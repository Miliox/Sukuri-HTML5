<?php header('Content-type: text/html; charset=utf-8'); ?>
<!doctype html>
<html>
	<head>
		<title>NibblesCanvas</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		<script type="text/javascript" src="js/Vector.js"></script>
		<style type="text/css">
			body {
				background-image: url('img/wood.jpg');
				background-repeat: repeat; 
			}
			canvas {
				/*Centraliza*/
				position: absolute;
				top: 50%;
				left: 50%;
				
				/*Corrigi alinhamento para o centro*/
				margin-left: -300px;
				margin-top: -480px;

				/*Destaca o Elemento do Fundo*/
				border: 1px solid black;
			}
		</style>
	</head>
	<body>
		<canvas id="map" width="960" height="600">
			<p>Seu Browser não suporta o Elemento Canvas</p>
		</canvas>
	</body>
</html>
