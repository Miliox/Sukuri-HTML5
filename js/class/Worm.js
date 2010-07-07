/*
Classe Worm:
 Atributos
 	--constantes--
 	Number UP(0)
 	Number RIGHT(1)
 	Number DOWN(2)
 	Number LEFT(3)
	
	--estados iniciais--
	Array<Vector> initialBody: Corpo inicial do worm
	Number initialDirection: Direcao inicial

 	--estado atual--
	Array<Vector> body:
	Number direction: Direcao atual do worm
	Number desiredDirection: direcao pretendida

 	--outros--
	String color: Cor do Worm definido no padrao css
	Number score: pontuacao atual
 
 Métodos
 	Construtor Worm(Array<Vector> initialBody, Number direction, String color)
	--scores--
	null resetScore(): retorna score a zero
	null addScore(Number point): adiciona pontos ao score
	--Worm actions--
	null restart(): worm volta ao estado inicial
	Array<Vector> dieAndReborn(): apaga status antigos, reinicia worm e retorna o cadaver
	Vector newHeadPosition(): retorna proxima posicao do Worm
	null movesHead(Vector head): move a cabeca para posicao indicada
	Vector removeTail(): remove a cauda, retorna a posicao

	--outros--
	Array<Vector> getValidDirections(): retorna um array com vetores direcao validos para a direcao atual
	Array<Vector> getOtherValidDirections(): retorna um array com vetores direcao validos, exceto o da direcao atual
	
	--decisoes--
	null inputProcess(Array<Number> inputList,Matriz matriz, Diamond food): decide nova direcao a partir dos inputs (implementado nas subclasses) 

*/
function Worm(initialBody, direction, color){
	//Corpo e Direcoes Iniciais
	this.initialBody = initialBody || [];
	//Define direcao em valor numerico
	if(typeof(direction)== 'number'){
		direction = Math.floor(Math.abs(direction) % 4);
	}
	else if (typeof(direction) == 'string'){
		switch(direction)
		{
			case "up":
				direction = this.UP;
			case "down":
				direction = this.DOWN;
			case "left":
				direction = this.LEFT;
			case "right":
				direction = this.RIGHT;
		}
	}
	else
	{
		direction = 0;
	}
	this.initialDirection = direction;
	this.color = color || "blue";
	//Inicializa o Corpo
	this.restart();
	this.resetScore();
}
Worm.prototype.UP = 0;
Worm.prototype.RIGHT = 1;
Worm.prototype.DOWN = 2;
Worm.prototype.LEFT = 3;
Worm.prototype.resetScore = function () { this.score = 0; };
Worm.prototype.addScore = function (point) {
	this.score += point;
};
Worm.prototype.restart = function (){
	this.body = function(initialBody){
		var body = [];
		//Produz um novo vetor que representa o corpo
		for(var i = 0; i < initialBody.length;i++){
			body.push(new Vector(initialBody[i].x,initialBody[i].y));
		};
		return body;
	}(this.initialBody);
	this.desiredDirection = this.initialDirection;
	this.direction = this.initialDirection;
};
Worm.prototype.dieAndReborn = function (){
	var dead = this.body;
	//Revive
	this.restart();
	this.resetScore();
	return dead;
};
Worm.prototype.newHeadPosition = function (){
	var vetorUnit;
	switch (this.desiredDirection)
	{
		case this.UP:
			vetorUnit = new Vector(0,-1);
			break;
		case this.DOWN:
			vetorUnit = new Vector(0,1);
			break;
		case this.LEFT:
			vetorUnit = new Vector(-1,0);
			break;
		case this.RIGHT:
			vetorUnit = new Vector(1,0);
			break;
	}
	return this.body[0].add(vetorUnit);
};
Worm.prototype.movesHead = function (head){
	this.direction = this.desiredDirection;
	this.body.unshift(head);
};
Worm.prototype.removeTail = function (){ return this.body.pop(); };
//Constantes de Direcao
Worm.prototype.getValidDirections = function (){
	switch (this.direction){
		case this.UP:
			return [this.UP,this.RIGHT,this.LEFT];
		case this.RIGHT:
			return [this.UP,this.RIGHT,this.DOWN];
		case this.DOWN:
			return [this.RIGHT,this.DOWN,this.LEFT];
		case this.LEFT:
			return [this.UP,this.DOWN,this.LEFT];
	}
};
Worm.prototype.getOtherValidDirections = function (){
	switch (this.direction){
		case this.UP:
			return [this.RIGHT,this.LEFT];
		case this.RIGHT:
			return [this.UP,this.RIGHT];
		case this.DOWN:
			return [this.RIGHT,this.LEFT];
		case this.LEFT:
			return [this.UP,this.DOWN];
	}
};
//Reinicia a minhoca
Worm.prototype.inputProcess = function (inputList, matriz, food){
	//Implementada nas subclasses
};

/*
Class WormHuman (especializacao de Worm)
 Atributos:
 	Object teclado: descreve os keyCode para cada movimento

 Métodos:
	Construtor WormHuman(Array<Vector> initialBody, Number direction, String color, Object teclado)

	null inputProcess(Array<Number> inputList,Matriz matriz, Diamond food): implementacao para controle por teclado

*/
function WormHuman(initialBody, direction, color, teclado){
	Worm.call(this,initialBody, direction,color);
	this.teclado = teclado || {up:38, down: 40, left: 37, right: 39};
}
WormHuman.prototype = new Worm();
//remove atributos indesejados
delete WormHuman.prototype.initialBody;
delete WormHuman.prototype.initialDirection;
delete WormHuman.prototype.desiredDirection;
delete WormHuman.prototype.body;
delete WormHuman.prototype.color;
delete WormHuman.prototype.direction;
delete WormHuman.prototype.score;
//redireciona construtor
WormHuman.prototype.constructor = WormHuman;
//controles de direcao
WormHuman.prototype.inputProcess = function (inputList, matriz, food){
	var directions = this.getValidDirections();
	for(var i = 0;i < inputList.length;i++){
		switch (inputList[i]){
			//Player controls
			case this.teclado.up:
				if (this.direction != this.DOWN) {
					this.desiredDirection = this.UP;
				}
				break;
			case this.teclado.down:
				if (this.direction != this.UP) {
					this.desiredDirection = this.DOWN;
				}
				break;
			case this.teclado.left:
				if (this.direction != this.RIGHT) {
					this.desiredDirection = this.LEFT;
				}
				break;
			case this.teclado.right:
				if (this.direction != this.LEFT) {
					this.desiredDirection = this.RIGHT;
				}
				break;
		}//switch
	}//for
};

/*
Class WormBot (especializacao de Worm)
 Atributos:
	bool computedPath: indica se um caminho existe
	Array<Number> path: comandos necessario para seguir o path
	Number radius: alcance minimo para iniciar perseguicao ao Diamond
 Métodos:
	Construtor WormBot(Array<Vector> initialBody, Number direction, String color)

 	--IA--
	null inputProcess(Array<Number> inputList,Matriz matriz, Diamond food): implementacao de controle pela IA
	
	--FSM transicao de estado--
	Number defineNewState(bool visible, bool toxic, Number distance): define transicao de estado do FSM
	
	--path find--
	null searchPath(Matriz map, Vector destiny): Executa o pathfind
	null bfsPathFind(Matriz map, Array< Array<Object> > limitedMap, Vector destiny): implementacao do pathfind em BFS
	
	--movimentacao--
	null randomMove(Matriz matriz): movimenta arbitrariamente, preferencialmente mantendo a direcao atual
	null runAway(Vector position): move-se em direcao oposta a indicada
	
	--deteccao de colisao--
	bool willCollide(Matriz matriz): indica se dada a direcaoDesejada colidiram no proximo movimento
	
*/
function WormBot(initialBody, direction, color){
	Worm.call(this,initialBody, direction,color);
	//WormBot variaveis de controle
	this.computedPath = false;
	this.radius = 18;
}

WormBot.prototype = new Worm();
//remove atributos indesejaveis
delete WormBot.prototype.initialBody;
delete WormBot.prototype.initialDirection;
delete WormBot.prototype.desiredDirection;
delete WormBot.prototype.body;
delete WormBot.prototype.color;
delete WormBot.prototype.direction;
delete WormBot.prototype.score;
//redireciona construtor
WormBot.prototype.constructor = WormBot;
WormBot.prototype.inputProcess = function (inputList, matriz, food){
	var distance = matriz.getDistance(this.body[0],food.getPos());
	//FSM
	switch (this.defineNewState(food.isVisible(),food.isToxic(),distance)){
		case 1: /*Move-se aleatoriamente*/
			this.randomMove(matriz);
			this.computedPath = false;
			break;
		case 2: /*Persegue o Diamond*/
			if(!this.computedPath){
				this.searchPath(matriz,food.getPos());
			}
			switch(this.path.length)
			{
				case 0:
					//"nao existe caminho valido";
					this.randomMove(matriz);
					if (Math.random() < 0.35) {
						//busca novo caminho apos um tempo aleatorio
						this.computedPath = false;
					}
					break;
				default :
					//consome um item do path encontrado
					this.desiredDirection = this.path.shift();
					//verifica possibilidade de colisao
					if(this.willCollide(matriz)) {
						//muda de direcao
						this.randomMove(matriz);
						//calcula novo caminho
						this.computedPath = false;
					}
					break;
			}
			break;
		case 3: /*Foge do Diamond envenenado*/
			this.runAway(food.getPos());
			//verifica se existe colisao
			if (this.willCollide(matriz)) {
				this.randomMove(matriz);
			}
			this.computedPath = false;
			break;
	}
};
WormBot.prototype.defineNewState = function (visible, toxic, distance){
	if(visible && !toxic && distance < this.radius){ return 2; }
	else if(visible && toxic && distance < 10){ return 3; }
	else{ return 1;	}
};
WormBot.prototype.searchPath = function (map, destinyInMap) {
	this.path = [];
	this.computedPath = true;
	var order = Math.round(this.radius * 2) + 3;

	var center = Math.floor(order / 2);
	var rootInMap = this.body[0];
	var rootInLimitedMap = new Vector(center, center);
	var referenceNodeInMap = rootInMap.subtract(rootInLimitedMap);
	map.circularCorrectCell(referenceNodeInMap);
	var destinyInLimitedMap = destinyInMap.subtract(referenceNodeInMap);
	map.circularCorrectCell(destinyInLimitedMap);

	//Matriz
	var nodeInMap, nodeInLimitedMap, nodeInMapContent;
	var lin, col;
	var limitedMap = new Matriz(order, order, 0, -1);
	for(lin = 0; lin < order; lin++){
		for(col = 0; col < order; col++){
			nodeInLimitedMap = new Vector(col, lin);
			nodeInMap = nodeInLimitedMap.add(referenceNodeInMap);
			map.circularCorrectCell(nodeInMap);
			nodeInMapContent = map.getCell(nodeInMap);
			if (nodeInMapContent !== 0) {
				limitedMap.setWallCell(nodeInLimitedMap);
			}
		}
	}
	//cerca matriz, simplifica verificacao de limites
	for(var n = 0; n < order; n++) {
		limitedMap.setWallCell(new Vector(n,0));
		limitedMap.setWallCell(new Vector(0,n));
		limitedMap.setWallCell(new Vector(order-1,n));
		limitedMap.setWallCell(new Vector(n,order-1));
	}
	this.bfsPathFind(rootInLimitedMap, destinyInLimitedMap, limitedMap)
	//this.aStarPathFind(rootInLimitedMap, destinyInLimitedMap, limitedMap);
};
WormBot.prototype.randomMove = function (matriz) {
	var validDirection = this.getOtherValidDirections();
	//aleatoriamente muda direcao do Worm
	var valor = Math.random();
	if ((valor > 0.45 && valor < 0.5)){
		this.desiredDirection = validDirection[Math.floor(Math.random() * (validDirection.length))];
	}

	//Verificar se existe colisao, muda de direcao se houver
	var count = 0;
	var index;
	var validDirection = this.getValidDirections();
	do {
		if (!this.willCollide(matriz)) { return; }
		else if(validDirection.length > 0) {
			//Tente outra direcao aleatoria
			index = Math.floor(Math.random() * validDirection.length);
			this.desiredDirection = validDirection[index];
			//remove direcao aleatoria das possibilidades
			validDirection.splice(index,1);
		}
		count++;
	} while(count < 4);
};
WormBot.prototype.runAway = function (position) {
	var dx = position.x - this.body[0].x;
	var dy = position.y - this.body[0].y;
	//corrige matriz circular
	var opposite_direction;
	if (Math.abs(dx) > Math.abs(dy)) {
		if (dx < 0) {
			opposite_direction = this.RIGHT;
		} else if (dx > 0){
			opposite_direction = this.LEFT;
		}
	} else {
		if (dy < 0) {
			opposite_direction = this.DOWN;
		} else if (dy > 0) {
			opposite_direction = this.UP;
		}
	}

	this.desiredDirection = opposite_direction;
};
WormBot.prototype.willCollide = function (matriz) {
	var headNextPosition = this.newHeadPosition();
	matriz.circularCorrectCell(headNextPosition);
	var cellValue =  matriz.getCell(headNextPosition);
	if (cellValue == 0) { return false; }
	return true;
};
WormBot.prototype.bfsPathFind = function (rootInLimitedMap, destinyInLimitedMap, limitedMap){
	//direcoes
	var vec_unit =	[
			new Vector( 0,-1), /*UP   - 0*/
			new Vector( 1, 0), /*RIGHT- 1*/
			new Vector( 0, 1), /*DOWN - 2*/
			new Vector(-1, 0)  /*LEFT - 3*/
			];

	var nodeContent;
	var nodeInLimitedMap;
	var nodesToEvaluate = [];
	var nodesFounded = [];

	nodesToEvaluate.push(rootInLimitedMap);
	limitedMap.setCell(rootInLimitedMap,{sentido : null, origem : null});
	//Breadth First Search
	var i, direcao;
	while (nodesToEvaluate.length > 0) {
		nodesFounded = [];
		for(i = 0; i < nodesToEvaluate.length; i++){
			for(direcao = 0; direcao < vec_unit.length; direcao++){
				nodeInLimitedMap = nodesToEvaluate[i].add(vec_unit[direcao]);
				if (limitedMap.getCell(nodeInLimitedMap) === 0){
					nodesFounded.push(nodeInLimitedMap);
					limitedMap.setCell(nodeInLimitedMap, {sentido : direcao, origem : nodesToEvaluate[i]});
					if (nodeInLimitedMap.equals(destinyInLimitedMap)) {
						nodeContent = limitedMap.getCell(nodeInLimitedMap);
						while((nodeContent.sentido !== null) && (nodeContent.origem !== null)){
							this.path.unshift(limitedMap.getCell(nodeInLimitedMap).sentido);
							nodeInLimitedMap = limitedMap.getCell(nodeInLimitedMap).origem;
							nodeContent = limitedMap.getCell(nodeInLimitedMap);
						}
						return;
					}
				}
			}
		}
		nodesToEvaluate = nodesFounded;
	}
};
WormBot.prototype.aStarPathFind = function (originInLimitedMap, destinyInLimitedMap, limitedMap){
	//funcoes
	var createNodeContent = function (_sentido, _origem, _custo, _estimado){
		return {
			sentido : _sentido,
			origem : _origem,
			custo : _custo,
			estimado : _estimado
			};
	};
	var estimatedCost = function (nodeStart, nodeEnd) {
		var dx = nodeStart.x - nodeEnd.x;
		var dy = nodeStart.y - nodeEnd.y;

		var d = Math.abs(dx) + Math.abs(dy);
		return d;
	};
	var typeOfNode = function (nodeInLimitedMap, destinyInLimitedMap, limitedMap) {
		var nodeContent = limitedMap.getCell(nodeInLimitedMap);
		if (nodeInLimitedMap.equals(destinyInLimitedMap)) { return 0; } //destino
		else if (nodeContent === 0) { return 1; } //não visitado
		else if (nodeContent === -1) { return 3; } //parede
		else { return 2; } //visitado
	};
	var insertNodeInPQ = function (priorQueue, limitedMap, nodeToInsertPos) {
		var nodePos, nodeContent;
		var nodeToInsertContent = limitedMap.getCell(nodeToInsertPos);
		var nodeToInsertTotal = nodeToInsertContent.custo + nodeToInsertContent.estimado;
		if(priorQueue.length === 0){
			priorQueue.unshift(nodeToInsertPos);
			return;
		}
		else{
			for(var i = 0; i < priorQueue.length; i++){
				nodePos = priorQueue[i];
				nodeContent = limitedMap.getCell(nodePos);
				if(nodeContent.custo + nodeContent.estimado > nodeToInsertTotal){
					priorQueue.splice(i,0,nodeToInsertPos);
					return;
				}
			}
			priorQueue.push(nodeToInsertPos);
			return;
		}
	};
	//direcoes
	var vec_unit =	[
			new Vector( 0,-1), /*UP   - 0*/
			new Vector( 1, 0), /*RIGHT- 1*/
			new Vector( 0, 1), /*DOWN - 2*/
			new Vector(-1, 0)  /*LEFT - 3*/
			];

	var nodeToEvaluate;
	var nodeToEvaluateContent;
	var nodeInLimitedMap;	//posicao do mesmo nodo mas no sandbox
	var nodesPriorityQueue = [];	//lista de nodos a processar

	nodesPriorityQueue.push(originInLimitedMap);
	limitedMap.setCell(originInLimitedMap,
			createNodeContent(null, null, 0, estimatedCost(originInLimitedMap, destinyInLimitedMap)));

	while(nodesPriorityQueue.length > 0){
		nodeToEvaluate = nodesPriorityQueue.shift();
		nodeToEvaluateContent = limitedMap.getCell(nodeToEvaluate);
		for(var direcao = 0; direcao < vec_unit.length; direcao++){
			nodeInLimitedMap = nodeToEvaluate.add(vec_unit[direcao]);
			switch(typeOfNode(
					nodeInLimitedMap,
					destinyInLimitedMap,
					limitedMap
				)){
				case 0://destino
					limitedMap.setCell(nodeInLimitedMap,
						createNodeContent(direcao, nodeToEvaluate, nodeToEvaluateContent.custo+1,
								estimatedCost(nodeInLimitedMap, destinyInLimitedMap)));
					insertNodeInPQ(nodesPriorityQueue,limitedMap,nodeInLimitedMap);
					for(var i = 0; i < 70; i++){
						this.path.unshift((limitedMap.getCell(nodeInLimitedMap)).sentido);
						nodeInLimitedMap = (limitedMap.getCell(nodeInLimitedMap)).origem;
						if(nodeInLimitedMap.equals(originInLimitedMap)){ return; }
					}
					return;
				case 1://nao visitado
					limitedMap.setCell(nodeInLimitedMap,
						createNodeContent(direcao, nodeToEvaluate, nodeToEvaluateContent.custo+1,
							estimatedCost(nodeInLimitedMap, destinyInLimitedMap)));
					insertNodeInPQ(nodesPriorityQueue,limitedMap,nodeInLimitedMap);
					break;
				case 2://visitado
					break;
				case 3://invalido
					limitedMap.setWallCell(nodeInLimitedMap);
					break;
			}
		}
	}

};
