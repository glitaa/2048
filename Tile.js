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
				canvasCtx.fillStyle = "#e67700";
				break;
			case 32:
				canvasCtx.fillStyle = "#ff8533";
				break;
			case 64:
				canvasCtx.fillStyle = "#ff6600";
				break;
			case 128:
				canvasCtx.fillStyle = "#ffad33";
				break;
			default:
				canvasCtx.fillStyle = "brown";
				break;
		}
		canvasCtx.fillRect(margin + innerMargin + this.x * fieldLength + this.xSpeed, margin + innerMargin + this.y * fieldLength + this.ySpeed, fieldLength - innerMargin, fieldLength - innerMargin);
		canvasCtx.font = 56 / this.value.toString().length + "px Verdana";
		canvasCtx.fillStyle = "black";
		canvasCtx.textAlign = "center";
		canvasCtx.fillText(this.value, margin + innerMargin + this.x * fieldLength + (fieldLength - innerMargin) / 2 + this.xSpeed, margin + innerMargin + this.y * fieldLength + (fieldLength - innerMargin) / 2 + maxLength / 36 + this.ySpeed);
	}
}
