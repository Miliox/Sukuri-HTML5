<?php header('Content-type: text/html; charset=utf-8'); ?>
<!doctype html>
<html>
	<head>
		<title>NibblesCanvas</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		<script type="text/javascript" src="js/Vector.js"></script>
		<script type="text/javascript" src="js/Diamond.js"></script>
		<script type="text/javascript" src="js/Worm.js"></script>
		<script type="text/javascript" src="js/Graphic.js"></script>
		<script type="text/javascript" src="js/Nibbles.js"></script>
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
