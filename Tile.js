class Tile {
	constructor() {
		this.x = 0;
		this.y = 0;
		this.xSpeed = 0;
		this.ySpeed = 0;
		this.value = 0;
		this.tempX = 0;
		this.tempY = 0;
	}
	getValue() {
		return this.value;
	}
	setValue(val) {
		this.value = val;
	}
	getX() {
		return this.x;
	}
	setX(newX) {
		this.x = newX;
	}
	getY() {
		return this.y;
	}
	setY(newY) {
		this.y = newY;
	}
	getXSpeed() {
		return this.xSpeed;
	}
	setXSpeed(newXSpeed) {
		this.xSpeed = newXSpeed;
	}
	getYSpeed() {
		return this.ySpeed;
	}
	setYSpeed(newYSpeed) {
		this.ySpeed = newYSpeed;
	}
	getTempX() {
		return this.tempX;
	}
	setTempX(newTempX) {
		this.tempX = newTempX;
	}
	getTempY() {
		return this.tempY;
	}
	setTempY(newTempY) {
		this.tempY = newTempY;
	}
	clear() {
		this.x = 0;
		this.y = 0;
		this.xSpeed = 0;
		this.ySpeed = 0;
		this.value = 0;
		this.tempX = 0;
		this.tempY = 0;
	}
	drawTile() {
		switch (this.value) {
			case 2:
				canvasCtx.fillStyle = "#ffc180";
				break;
			case 4:
				canvasCtx.fillStyle = "#ffa94d";
				break;
			case 8:
				canvasCtx.fillStyle = "#ff901a";
				break;
			case 16:
				canvasCtx.fillStyle = "#ff7100";
				break;
			case 32:
				canvasCtx.fillStyle = "#ff6600";
				break;
			case 64:
				canvasCtx.fillStyle = "#ff5c00";
				break;
			case 128:
				canvasCtx.fillStyle = "#ff5000";
				break;
			default:
				canvasCtx.fillStyle = "#f46300";
				break;
		}
		canvasCtx.fillRect(boardX + innerMargin + this.x * fieldLength + this.xSpeed, boardY + innerMargin + this.y * fieldLength + this.ySpeed, fieldLength - innerMargin, fieldLength - innerMargin);
		canvasCtx.font = 56 / this.value.toString().length * (maxLength/600) + "px Verdana";
		canvasCtx.fillStyle = "#201E1D";
		canvasCtx.textAlign = "center";
		canvasCtx.fillText(this.value, boardX + innerMargin + this.x * fieldLength + (fieldLength - innerMargin) / 2 + this.xSpeed, boardY + innerMargin + this.y * fieldLength + (fieldLength - innerMargin) / 2 + maxLength / 30 + this.ySpeed);
	}
	move(toX, toY) {
		tiles[toX][toY].setValue(this.getValue());
		tiles[toX][toY].setX(toX);
		tiles[toX][toY].setY(toY);
		this.clear();
		somethingChanged = true;
	}
	merge(to) {
		to.setValue(this.getValue() * 2);
		this.clear();
		somethingChanged = true;
	}
}