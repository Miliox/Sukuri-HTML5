//Classe Worm: SuperClasse das Classes Worms
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
Worm.prototype.addScore = function (point) {
	this.score += point;
};
Worm.prototype.resetScore = function () { this.score = 0; };
Worm.prototype.removeTail = function (){ return this.body.pop(); };
Worm.prototype.movesHead = function (head){
	this.direction = this.desiredDirection;
	this.body.unshift(head);
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
//Constantes de Direcao
Worm.prototype.UP = 0;
Worm.prototype.RIGHT = 1;
Worm.prototype.DOWN = 2;
Worm.prototype.LEFT = 3;
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
//Reinicia a minhoca
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
Worm.prototype.inputProcess = function (inputList, matriz, food){
	//Implementada nas subclasses
};

//WormHuman: SubClass de Worm
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

//WormBot: SubClass de Worm
function WormBot(initialBody, direction, color){
	Worm.call(this,initialBody, direction,color);
	//WormBot variaveis de controle
	this.computedPath = false;
	this.radius = 25;
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
					if ( Math.random() < 0.2) {
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
WormBot.prototype.searchPath = function (map, destiny) {
	this.path = [];
	this.computedPath = true;

	//Matriz
	var lin, col;
	var order = Math.round(this.radius * 2) + 3;
	var sandbox_map = new Array(order);
	for(col = 0; col < sandbox_map.length; col++){
		sandbox_map[col] = new Array(order);
		for(lin = 0; lin < sandbox_map[col].length; lin++){
			sandbox_map[col][lin] = null;
		}
	}
	//cerca matriz
	for(var n = 0; n < order; n++){
		sandbox_map[0][n] = -1;
		sandbox_map[n][0] = -1;
		sandbox_map[order-1][n] = -1;
		sandbox_map[n][order-1] = -1;
	}

	//referencias
	var root_map = this.body[0];
	var root_sandbox = new Vector(Math.floor(order / 2), Math.floor(order / 2));
	var reference_map = root_map.subtract(root_sandbox);
	map.circularCorrectCell(reference_map);
	//direcoes
	var vec_unit =	[
			new Vector( 0,-1), /*UP   - 0*/
			new Vector( 1, 0), /*RIGHT- 1*/
			new Vector( 0, 1), /*DOWN - 2*/
			new Vector(-1, 0)  /*LEFT - 3*/
			];

	var node_map;		//posicao do nodo no mapa
	var node_sandbox;	//posicao do mesmo nodo mas no sandbox
	var old_nodes = [];	//lista de nodos a processar
	var new_nodes = [];	//lista de nodos encontrados

	//registra nodo root para iniciar BFS
	old_nodes.push(root_sandbox);
	sandbox_map[root_sandbox.y][root_sandbox.x] = {sentido : null, origem : null};

	//Breadth First Search
	var i, direcao;
	while (old_nodes.length > 0) {
		new_nodes = [];
		//percorre os nodes ja encontrados
		for(i = 0; i < old_nodes.length; i++){
			//encontra novos nodos
			for(direcao = 0; direcao < vecDir.length; direcao++){
				node_sandbox = old_nodes[i].add(vec_unit[direcao]);
				node_map = reference_map.add(node_sandbox);

				map.circularCorrectCell(node_map);
				if ( //verifica se a posicao esta livre
					(sandbox_map[node_sandbox.y][node_sandbox.x] === null) &&
					(map.getCell(node_map) === 0)
				){
					//registra como nodo encontrado
					new_nodes.push(node_sandbox);
					sandbox_map[node_sandbox.y][node_sandbox.x] = {sentido : direcao, origem : old_nodes[i]};
					if (node_map.equals(destiny)) {
						//encontrou, preenche o path para o food
						while(
							(sandbox_map[node_sandbox.y][node_sandbox.x].sentido !== null) &&
							(sandbox_map[node_sandbox.y][node_sandbox.x].origem !== null)
						){
							this.path.unshift(sandbox_map[node_sandbox.y][node_sandbox.x].sentido);
							node_sandbox = sandbox_map[node_sandbox.y][node_sandbox.x].origem;
						}
						return;
					}//if encontrou food?
				}//if node nao visitado
			}//for cada direcao
		}//for para cada nodo encontrado
		old_nodes = new_nodes;
	}//while existe nodo a processar
};
WormBot.prototype.randomMove = function (matriz) {
	var validDirection = this.getValidDirections();
	//aleatoriamente muda direcao do Worm
	if(Math.random() < 0.1 && Math.random() > 0.9){
		this.desiredDirection = validDirection[Math.floor(Math.random()*(validDirection.length))];
	}
	//Verificar se existe colisao, muda de direcao se houver
	var count = 0;
	var index;
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
	if(dx > 48){
		dx =  this.body[0].x - position.x;
	}
	if(dy > 23){
		dx =  this.body[0].y - position.y;
	}

	var opposite_direction;
	if(Math.abs(dx) > Math.abs(dy)){
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
	if (cellValue == 0) {
		return false;
	}
	return true;
};
