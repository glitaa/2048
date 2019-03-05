var canvas;
var canvasCtx;
var margin;
var innerMargin;
var maxLength;
var fieldsInRow = 4;
var fieldLength;
var tiles;
var leftPressed, rightPressed, upPressed, downPressed;
var speed = 4;
var counter = 0;
var somethingChanged;
var backgroundColor = "#fff2e6";
var boardLength;

window.onload = function() {
	canvasSetup();
	
	document.body.style.backgroundColor = backgroundColor;

	tilesArrayInit();

	drawNewTile(2);

	setAndInitInterval();
}

function update() {
	updateVariables();

	drawEverything(); //drawing function
	moveEverything(); //moving function

	/*for (var i = 0; i<fieldsInRow; i++) {
	for (var j = 0; j<fieldsInRow; j++) {
		console.log("x, y: "+tiles[i][j].getX()+", "+tiles[i][j].getY()+"; i, j: "+i+", "+j+"; value: "+tiles[i][j].getValue()+"; xSpeed: "+tiles[i][j].getXSpeed());
	}}
	console.log("\n");*/
}

function moveEverything() {
	updateTileSpeed();

	if (leftPressed) {
		for (var i = 0; i<fieldsInRow; i++) {
		for (var j = 0; j<fieldsInRow; j++) {
			if (tiles[i][j].getValue() > 0) {
				if (i-1 < 0) //there's a wall on the left
					break;
				if (tiles[i-1][j].getValue() > 0) { //there's a tile on the left
					if (tiles[i-1][j].getValue() !== tiles[i][j].getValue()) //the tile on the left has got other value
						break;
					if (tiles[i-1][j].getValue() == tiles[i][j].getValue()) { //the tile on the left has got the same value (merging)
						if (tiles[i][j].getTempX() == 0)
							tiles[i][j].setTempX(margin+innerMargin+tiles[i][j].getX()*fieldLength);
						tiles[i][j].setXSpeed(tiles[i][j].getXSpeed()-fieldLength/speed);
						if (margin+innerMargin+tiles[i][j].getX()*fieldLength+tiles[i][j].getXSpeed()<=tiles[i][j].getTempX()-fieldLength) {
							tiles[i-1][j].setValue(tiles[i-1][j].getValue()*2);
							tiles[i][j].clear();
							somethingChanged = true;
						}
					}
				} else { //there isn't a tile on the left
					if (tiles[i][j].getTempX() == 0)
						tiles[i][j].setTempX(margin+innerMargin+tiles[i][j].getX()*fieldLength);
					tiles[i][j].setXSpeed(tiles[i][j].getXSpeed()-fieldLength/speed);
					if (margin+innerMargin+tiles[i][j].getX()*fieldLength+tiles[i][j].getXSpeed()<=tiles[i][j].getTempX()-fieldLength) {
						tiles[i-1][j].setValue(tiles[i][j].getValue());
						tiles[i-1][j].setX(tiles[i][j].getX()-1);
						tiles[i-1][j].setY(tiles[i][j].getY());
						tiles[i][j].clear();
						somethingChanged = true;
					}
				} 
			}
		}}

		leftPressed = callCounter();
	} else if (rightPressed) {
		for (var i = fieldsInRow-1; i>-1; i--) {
		for (var j = 0; j<fieldsInRow; j++) {
			if (tiles[i][j].getValue() > 0) {
				if (i+1 > fieldsInRow-1) //there's a wall on the right
					break;
				if (tiles[i+1][j].getValue() > 0) { //there's a tile on the right
					if (tiles[i+1][j].getValue() !== tiles[i][j].getValue()) //the tile on the right has got other value
						break;
					if (tiles[i+1][j].getValue() == tiles[i][j].getValue()) { //the tile on the right has got the same value (merging)
						if (tiles[i][j].getTempX() == 0)
							tiles[i][j].setTempX(margin+innerMargin+tiles[i][j].getX()*fieldLength);
						tiles[i][j].setXSpeed(tiles[i][j].getXSpeed()+fieldLength/speed);
						if (margin+innerMargin+tiles[i][j].getX()*fieldLength+tiles[i][j].getXSpeed()>=tiles[i][j].getTempX()+fieldLength) {
							tiles[i+1][j].setValue(tiles[i+1][j].getValue()*2);
							tiles[i][j].clear();
							somethingChanged = true;
						}
					}
				} else { //there isn't a tile on the right
					if (tiles[i][j].getTempX() == 0)
						tiles[i][j].setTempX(margin+innerMargin+tiles[i][j].getX()*fieldLength);
					tiles[i][j].setXSpeed(tiles[i][j].getXSpeed()+fieldLength/speed);
					if (margin+innerMargin+tiles[i][j].getX()*fieldLength+tiles[i][j].getXSpeed()>=tiles[i][j].getTempX()+fieldLength) {
						tiles[i+1][j].setValue(tiles[i][j].getValue());
						tiles[i+1][j].setX(tiles[i][j].getX()+1);
						tiles[i+1][j].setY(tiles[i][j].getY());
						tiles[i][j].clear();
						somethingChanged = true;
					}
				} 
			}
		}}

		rightPressed = callCounter();
	} else if (upPressed) {
		for (var i = 0; i<fieldsInRow; i++) {
		for (var j = 0; j<fieldsInRow; j++) {
			if (tiles[j][i].getValue() > 0) {
				if (i-1 < 0) //there's a wall on the top
					break;
				if (tiles[j][i-1].getValue() > 0) { //there's a tile on the top
					if (tiles[j][i-1].getValue() !== tiles[j][i].getValue()) //the tile on the top has got other value
						break;
					if (tiles[j][i-1].getValue() == tiles[j][i].getValue()) { //the tile on the top has got the same value (merging)
						if (tiles[j][i].getTempY() == 0)
							tiles[j][i].setTempY(margin+innerMargin+tiles[j][i].getY()*fieldLength);
						tiles[j][i].setYSpeed(tiles[j][i].getYSpeed()-fieldLength/speed);
						if (margin+innerMargin+tiles[j][i].getY()*fieldLength+tiles[j][i].getYSpeed()<=tiles[j][i].getTempY()-fieldLength) {
							tiles[j][i-1].setValue(tiles[j][i-1].getValue()*2);
							tiles[j][j].clear();
							somethingChanged = true;
						}
					}
				} else { //there isn't a tile on the top
					if (tiles[j][i].getTempY() == 0)
						tiles[j][i].setTempY(margin+innerMargin+tiles[j][i].getY()*fieldLength);
					tiles[j][i].setYSpeed(tiles[j][i].getYSpeed()-fieldLength/speed);
					if (margin+innerMargin+tiles[j][i].getY()*fieldLength+tiles[j][i].getYSpeed()<=tiles[j][i].getTempY()-fieldLength) {
						tiles[j][i-1].setValue(tiles[j][i].getValue());
						tiles[j][i-1].setX(tiles[j][i].getX());
						tiles[j][i-1].setY(tiles[j][i].getY()-1);
						tiles[j][i].clear();
						somethingChanged = true;
					}
				} 
			}
		}}

		upPressed = callCounter();
	} else if (downPressed) {
		for (var i = fieldsInRow-1; i>-1; i--) {
		for (var j = 0; j<fieldsInRow; j++) {
			if (tiles[j][i].getValue() > 0) {
				if (i+1 > fieldsInRow-1) //there's a wall on the bottom
					break;
				if (tiles[j][i+1].getValue() > 0) { //there's a tile on the bottom
					if (tiles[j][i+1].getValue() !== tiles[j][i].getValue()) //the tile on the bottom has got other value
						break;
					if (tiles[j][i+1].getValue() == tiles[j][i].getValue()) { //the tile on the bottom has got the same value (merging)
						if (tiles[j][i].getTempY() == 0)
							tiles[j][i].setTempY(margin+innerMargin+tiles[j][i].getY()*fieldLength);
						tiles[j][i].setYSpeed(tiles[j][i].getYSpeed()+fieldLength/speed);
						if (margin+innerMargin+tiles[j][i].getY()*fieldLength+tiles[j][i].getYSpeed()>=tiles[j][i].getTempY()+fieldLength) {
							tiles[j][i+1].setValue(tiles[j][i+1].getValue()*2);
							tiles[j][j].clear();
							somethingChanged = true;
						}
					}
				} else { //there isn't a tile on the bottom
					if (tiles[j][i].getTempY() == 0)
						tiles[j][i].setTempY(margin+innerMargin+tiles[j][i].getY()*fieldLength);
					tiles[j][i].setYSpeed(tiles[j][i].getYSpeed()+fieldLength/speed);
					if (margin+innerMargin+tiles[j][i].getY()*fieldLength+tiles[j][i].getYSpeed()>=tiles[j][i].getTempY()+fieldLength) {
						tiles[j][i+1].setValue(tiles[j][i].getValue());
						tiles[j][i+1].setX(tiles[j][i].getX());
						tiles[j][i+1].setY(tiles[j][i].getY()+1);
						tiles[j][i].clear();
						somethingChanged = true;
					}
				} 
			}
		}}

		downPressed = callCounter();
	}
}

function drawEverything() {
	drawBackground();

	drawBoard();

	drawFields();

	drawTiles();
}

function drawNewTile(numberOfTiles) {
	//add randomness
	for(var i = 0; i<numberOfTiles; i++) {
		let x = Math.floor(Math.random() * fieldsInRow);
		let y = Math.floor(Math.random() * fieldsInRow);
		while(!(tiles[x][y].getValue()==0)) {
			x = Math.floor(Math.random() * fieldsInRow);
			y = Math.floor(Math.random() * fieldsInRow);
		}
		tiles[x][y].setX(x);
		tiles[x][y].setY(y);
		tiles[x][y].setValue(2);
	}
}

function updateTileSpeed() {
	subtractFromXSpeedIfIsNegative();
	addToXSpeedIfIsPositive();
	subtractFromYSpeedIfIsNegative();
	addToYSpeedIfIsPositive();
}

function subtractFromXSpeedIfIsNegative() {
	for (var i = 0; i < fieldsInRow; i++) {
		for (var j = 0; j < fieldsInRow; j++) {
			if (tiles[i][j].getXSpeed() < 0)
				tiles[i][j].setXSpeed(tiles[i][j].getXSpeed() - fieldLength / speed);
		}
	}
}

function addToXSpeedIfIsPositive() {
	for (var i = 0; i < fieldsInRow; i++) {
		for (var j = 0; j < fieldsInRow; j++) {
			if (tiles[i][j].getXSpeed() > 0)
				tiles[i][j].setXSpeed(tiles[i][j].getXSpeed() + fieldLength / speed);
		}
	}
}

function subtractFromYSpeedIfIsNegative() {
	for (var i = 0; i < fieldsInRow; i++) {
		for (var j = 0; j < fieldsInRow; j++) {
			if (tiles[i][j].getYSpeed() < 0)
				tiles[i][j].setYSpeed(tiles[i][j].getYSpeed() - fieldLength / speed);
		}
	}
}

function addToYSpeedIfIsPositive() {
	for (var i = 0; i < fieldsInRow; i++) {
		for (var j = 0; j < fieldsInRow; j++) {
			if (tiles[i][j].getYSpeed() < 0)
				tiles[i][j].setYSpeed(tiles[i][j].getYSpeed() + fieldLength / speed);
		}
	}
}

function callCounter() {
	if (counter < speed*fieldsInRow) {
		if (counter + 1 == speed*fieldsInRow) {
			counter = 0;
			if (somethingChanged) {
				drawNewTile(1);
				somethingChanged = false;
			}
			return false;
		}
		counter++;
		return true;
	}
}

function canvasSetup() {
	canvas = document.getElementById('gameCanvas');
	canvasCtx = canvas.getContext('2d');
}

function tilesArrayInit() {
	tiles = [];	
	for(var i = 0; i<fieldsInRow; i++)
		tiles[i] = [];
	for(var i = 0; i<fieldsInRow; i++) {
		for(var j = 0; j<fieldsInRow; j++)
			tiles[i][j] = new Tile();
	}
}

function setAndInitInterval() {
	var fps = 60;
	setInterval(update, 1000 / fps);
}

function updateVariables() {
	if (document.body.clientWidth >= document.body.clientHeight)
		maxLength = document.body.clientHeight;
	else
		maxLength = document.body.clientWidth;
	canvas.width = maxLength;
	canvas.height = maxLength;

	margin = maxLength/20;
	innerMargin = maxLength/60;
}

function drawBackground() {
	canvasCtx.fillStyle = backgroundColor;
	canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawBoard() {
	canvasCtx.fillStyle = "grey";
	canvasCtx.fillRect(0 + margin, 0 + margin, maxLength - 2 * margin, maxLength - 2 * margin);
	boardLength = maxLength - (2 * margin);
}

function drawFields() {
	fieldLength = (boardLength - innerMargin) / fieldsInRow;
	canvasCtx.fillStyle = backgroundColor;
	for (var i = 0; i < fieldsInRow; i++) {
	for (var j = 0; j < fieldsInRow; j++) {
			canvasCtx.fillRect(margin + innerMargin + i * (fieldLength), margin + innerMargin + j * (fieldLength), fieldLength - innerMargin, fieldLength - innerMargin);
	}}
}

function drawTiles() {
	for (var i = 0; i < fieldsInRow; i++) {
	for (var j = 0; j < fieldsInRow; j++) {
			if (tiles[i][j].getValue() > 0)
				tiles[i][j].drawTile();
	}}
}

document.addEventListener('keydown', function(event) {
	if (event.code == 'ArrowLeft') {
		if (!rightPressed && !upPressed && !downPressed) {
			somethingChanged = false;
			leftPressed = true;
		}
	}
	if (event.code == 'ArrowRight') {
		if (!leftPressed && !upPressed && !downPressed) {
			somethingChanged = false;
			rightPressed = true;
		}
	}
	if (event.code == 'ArrowUp') {
		if (!leftPressed && !rightPressed && !downPressed) {
			somethingChanged = false;
			upPressed = true;
		}
	}
	if (event.code == 'ArrowDown') {
		if (!leftPressed && !rightPressed && !upPressed) {
			somethingChanged = false;
			downPressed = true;
		}
	}
});