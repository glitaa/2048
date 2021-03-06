var canvas, canvasCtx;
var margin, innerMargin;
var maxLength;
var fieldsInRow = 4;
var fieldLength;
var tiles;
var direction = "none";
var speed;
var speedDivider = 3.5;
var somethingChanged;
var movedOnce, merged, movedTwice;
var backgroundColor = "#fff2e6";
var boardLength;
var tilesAreInMove;
var intervalID;

window.onload = function() {
	canvasSetup();

	document.body.style.backgroundColor = backgroundColor;

	tilesArrayInit();

	drawNewTile(2);

	setAndInitInterval();
}

function update() {
	updateVariables();

	moveEverything();
	drawEverything();
}

function drawEverything() {
	drawBackground();

	drawBoard();

	drawFields();

	drawTiles();
}

function moveEverything() {
	if (!movedOnce) {
		moveTiles();

		areTilesInMove();

		if (!tilesAreInMove && direction != "none")
			movedOnce = true;
	}

	if (movedOnce && !merged) {
		mergeTiles();

		areTilesInMove();

		if (!tilesAreInMove && direction != "none")
			merged = true;
	}

	if (movedOnce && merged && !movedTwice) {
		moveTiles();

		areTilesInMove();

		if (!tilesAreInMove && direction != "none")
			movedTwice = true;
	}

	if (movedTwice) {
		if (somethingChanged) {
			drawNewTile(1);
			somethingChanged = false;
		}
		direction = "none";
		movedOnce = merged = movedTwice = false;
	}
}

function moveTiles() {
	switch (direction) {
		case "left":
			for (var j = 0; j < fieldsInRow; j++) {
				for (var i = 1; i < fieldsInRow; i++) {
					if (tiles[i][j].getValue() > 0) {
						if (tiles[i - 1][j].getValue() > 0 && tiles[i - 1][j].getValue() != tiles[i][j].getValue())
							continue;
						else if (tiles[i - 1][j].getValue() == 0) {
							if (tiles[i][j].getTempX() == 0)
								tiles[i][j].setTempX(margin + innerMargin + tiles[i][j].getX() * fieldLength);
							tiles[i][j].setXSpeed(tiles[i][j].getXSpeed() - speed);
							if (margin + innerMargin + tiles[i][j].getX() * fieldLength + tiles[i][j].getXSpeed() <= tiles[i][j].getTempX() - fieldLength) {
								tiles[i][j].move(i - 1, j);
								if (i - 2 < 0)
									continue;
								else if (tiles[i - 2][j].getValue() == 0)
									tiles[i - 1][j].setXSpeed(tiles[i - 1][j].getXSpeed() - speed);
							}
						}
					}
				}
			}
			break;
		case "up":
			for (var j = 0; j < fieldsInRow; j++) {
				for (var i = 1; i < fieldsInRow; i++) {
					if (tiles[j][i].getValue() > 0) {
						if (tiles[j][i - 1].getValue() > 0 && tiles[j][i - 1].getValue() != tiles[j][i].getValue())
							continue;
						else if (tiles[j][i - 1].getValue() == 0) {
							if (tiles[j][i].getTempY() == 0)
								tiles[j][i].setTempY(margin + innerMargin + tiles[j][i].getY() * fieldLength);
							tiles[j][i].setYSpeed(tiles[j][i].getYSpeed() - speed);
							if (margin + innerMargin + tiles[j][i].getY() * fieldLength + tiles[j][i].getYSpeed() <= tiles[j][i].getTempY() - fieldLength) {
								tiles[j][i].move(j, i - 1);
								if (i - 2 < 0)
									continue;
								else if (tiles[j][i - 2].getValue() == 0)
									tiles[j][i - 1].setYSpeed(tiles[j][i - 1].getYSpeed() - speed);
							}
						}
					}
				}
			}
			break;
		case "right":
			for (var j = 0; j < fieldsInRow; j++) {
				for (var i = fieldsInRow - 2; i > -1; i--) {
					if (tiles[i][j].getValue() > 0) {
						if (tiles[i + 1][j].getValue() > 0 && tiles[i + 1][j].getValue() != tiles[i][j].getValue())
							continue;
						else if (tiles[i + 1][j].getValue() == 0) {
							if (tiles[i][j].getTempX() == 0)
								tiles[i][j].setTempX(margin + innerMargin + tiles[i][j].getX() * fieldLength);
							tiles[i][j].setXSpeed(tiles[i][j].getXSpeed() + speed);
							if (margin + innerMargin + tiles[i][j].getX() * fieldLength + tiles[i][j].getXSpeed() >= tiles[i][j].getTempX() + fieldLength) {
								tiles[i][j].move(i + 1, j);
								if (i + 2 > fieldsInRow - 1)
									continue;
								else if (tiles[i + 2][j].getValue() == 0)
									tiles[i + 1][j].setXSpeed(tiles[i + 1][j].getXSpeed() + speed);
							}
						}
					}
				}
			}
			break;
		case "down":
			for (var j = 0; j < fieldsInRow; j++) {
				for (var i = fieldsInRow - 2; i > -1; i--) {
					if (tiles[j][i].getValue() > 0) {
						if (tiles[j][i + 1].getValue() > 0 && tiles[j][i + 1].getValue() != tiles[j][i].getValue())
							continue;
						else if (tiles[j][i + 1].getValue() == 0) {
							if (tiles[j][i].getTempY() == 0)
								tiles[j][i].setTempY(margin + innerMargin + tiles[j][i].getY() * fieldLength);
							tiles[j][i].setYSpeed(tiles[j][i].getYSpeed() + speed);
							if (margin + innerMargin + tiles[j][i].getY() * fieldLength + tiles[j][i].getYSpeed() >= tiles[j][i].getTempY() + fieldLength) {
								tiles[j][i].move(j, i + 1);
								if (i + 2 > fieldsInRow - 1)
									continue;
								else if (tiles[j][i + 2].getValue() == 0)
									tiles[j][i + 1].setYSpeed(tiles[j][i + 1].getYSpeed() + speed);
							}
						}
					}
				}
			}
			break;
	}
}

function mergeTiles() {
	switch (direction) {
		case "left":
			for (var j = 0; j < fieldsInRow; j++) {
				for (var i = 1; i < fieldsInRow; i++) {
					if (tiles[i][j].getValue() > 0 && tiles[i - 1][j].getValue() == tiles[i][j].getValue()) {
						if (tiles[i][j].getTempX() == 0)
							tiles[i][j].setTempX(margin + innerMargin + tiles[i][j].getX() * fieldLength);
						tiles[i][j].setXSpeed(tiles[i][j].getXSpeed() - speed);
						if (margin + innerMargin + tiles[i][j].getX() * fieldLength + tiles[i][j].getXSpeed() <= tiles[i][j].getTempX() - fieldLength) {
							tiles[i][j].merge(tiles[i - 1][j]);
						}
						i++;
					}
				}
			}
			break;
		case "up":
			for (var j = 0; j < fieldsInRow; j++) {
				for (var i = 1; i < fieldsInRow; i++) {
					if (tiles[j][i].getValue() > 0 && tiles[j][i - 1].getValue() == tiles[j][i].getValue()) {
						if (tiles[j][i].getTempY() == 0)
							tiles[j][i].setTempY(margin + innerMargin + tiles[j][i].getY() * fieldLength);
						tiles[j][i].setYSpeed(tiles[j][i].getYSpeed() - speed);
						if (margin + innerMargin + tiles[j][i].getY() * fieldLength + tiles[j][i].getYSpeed() <= tiles[j][i].getTempY() - fieldLength) {
							tiles[j][i].merge(tiles[j][i - 1]);
						}
						i++;
					}
				}
			}
			break;
		case "right":
			for (var j = 0; j < fieldsInRow; j++) {
				for (var i = fieldsInRow - 2; i > -1; i--) {
					if (tiles[i][j].getValue() > 0 && tiles[i + 1][j].getValue() == tiles[i][j].getValue()) {
						if (tiles[i][j].getTempX() == 0)
							tiles[i][j].setTempX(margin + innerMargin + tiles[i][j].getX() * fieldLength);
						tiles[i][j].setXSpeed(tiles[i][j].getXSpeed() + speed);
						if (margin + innerMargin + tiles[i][j].getX() * fieldLength + tiles[i][j].getXSpeed() >= tiles[i][j].getTempX() + fieldLength) {
							tiles[i][j].merge(tiles[i + 1][j]);
						}
						i--;
					}
				}
			}
			break;
		case "down":
			for (var j = 0; j < fieldsInRow; j++) {
				for (var i = fieldsInRow - 2; i > -1; i--) {
					if (tiles[j][i].getValue() > 0 && tiles[j][i + 1].getValue() == tiles[j][i].getValue()) {
						if (tiles[j][i].getTempY() == 0)
							tiles[j][i].setTempY(margin + innerMargin + tiles[j][i].getY() * fieldLength);
						tiles[j][i].setYSpeed(tiles[j][i].getYSpeed() + speed);
						if (margin + innerMargin + tiles[j][i].getY() * fieldLength + tiles[j][i].getYSpeed() >= tiles[j][i].getTempY() + fieldLength) {
							tiles[j][i].merge(tiles[j][i + 1]);
						}
						i--;
					}
				}
			}
			break;
	}
}

function areTilesInMove() {
	tilesAreInMove = false;
	for (var i = 0; i < fieldsInRow; i++) {
		for (var j = 0; j < fieldsInRow; j++) {
			if (tiles[i][j].getXSpeed() != 0 || tiles[i][j].getYSpeed() != 0) {
				tilesAreInMove = true;
				return;
			}
		}
	}
}

function drawNewTile(numberOfTiles) {
	for (var i = 0; i < numberOfTiles; i++) {
		let x = Math.floor(Math.random() * fieldsInRow);
		let y = Math.floor(Math.random() * fieldsInRow);
		while (!(tiles[x][y].getValue() == 0)) {
			x = Math.floor(Math.random() * fieldsInRow);
			y = Math.floor(Math.random() * fieldsInRow);
		}
		tiles[x][y].setX(x);
		tiles[x][y].setY(y);
		tiles[x][y].setValue(Math.random() < 0.8 ? 2 : 4);
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
	intervalID = setInterval(update, 1000 / fps);
}

function updateVariables() {
	if (document.body.clientWidth >= document.body.clientHeight)
		maxLength = document.body.clientHeight;
	else
		maxLength = document.body.clientWidth;
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;

	margin = maxLength/20;
	innerMargin = maxLength/60;

	boardX = canvas.width / 2 - boardLength / 2;
	boardY = canvas.height / 2 - boardLength / 2;

	boardLength = maxLength - (2 * margin);
	fieldLength = (boardLength - innerMargin) / fieldsInRow;

	speed = fieldLength / speedDivider;
}

function drawBackground() {
	canvasCtx.fillStyle = backgroundColor;
	canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawBoard() {
	canvasCtx.fillStyle = "#757575";
	canvasCtx.fillRect(boardX, boardY, maxLength - 2 * margin, maxLength - 2 * margin);
}

function drawFields() {
	canvasCtx.fillStyle = backgroundColor;
	for (var i = 0; i < fieldsInRow; i++) {
	for (var j = 0; j < fieldsInRow; j++) {
			canvasCtx.fillRect(boardX + innerMargin + i * (fieldLength), boardY + innerMargin + j * (fieldLength), fieldLength - innerMargin, fieldLength - innerMargin);
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
	switch (event.code) {
		case 'ArrowLeft':
			if (direction == "none") {
				direction = "left";
			} break;
		case 'ArrowRight':
			if (direction == "none") {
				direction = "right";
			} break;
		case 'ArrowUp':
			if (direction == "none") {
				direction = "up";
			} break;
		case 'ArrowDown':
			if (direction == "none") {
				direction = "down";
			}
	}
});