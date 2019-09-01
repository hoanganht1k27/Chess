const GAME_WIDTH = 400;
const GAME_HEIGHT = 400;
const DOT_SIZE = 50;
const KC = 5;

var game = function() {
	this.canvas = null;
	this.context = null;
	this.quan = null;

	var self = this;

	this.init = function() {
		this.canvas = document.createElement("canvas");
		this.context = this.canvas.getContext('2d');
		this.canvas.width = GAME_WIDTH;
		this.canvas.height = GAME_HEIGHT;
		this.drawBoard();

		document.getElementById('container').appendChild(this.canvas);

		this.quan = new quan(this);
		this.quan.init();

		this.listenEvent();
	}

	this.listenEvent = function() {
		this.canvas.addEventListener('click', function(event) {
			let left = $('#container canvas').offset().left;
			let top = $('#container canvas').offset().top;
			let x = event.clientX;
			let y = event.clientY;
			x -= left;
			y -= top;
			x = Math.floor(x / DOT_SIZE);
			y = Math.floor(y / DOT_SIZE);
			self.update(y, x);
		})
	}

	this.update = function(x, y) {
		this.quan.update(x, y);
	}

	this.drawBoard = function() {
		for(let i = 1; i <= 7; i++) {
			this.context.beginPath();
			this.context.moveTo(0, i * DOT_SIZE);
			this.context.lineTo(GAME_WIDTH, i * DOT_SIZE);
			this.context.lineWidth = 1;
			this.context.stroke();
		}

		for(let i = 1; i <= 7; i++) {
			this.context.beginPath();
			this.context.moveTo(i * DOT_SIZE, 0);
			this.context.lineTo(i * DOT_SIZE, GAME_HEIGHT);
			this.context.lineWidth = 1;
			this.context.stroke();
		}

		for(let i = 0; i <= 7; i++) {
			for(let j = 0; j <= 7; j++) {
				if((i + j) % 2 == 0) {
					this.context.fillStyle = '#AD1A05';
					this.context.fillRect(i * DOT_SIZE, j * DOT_SIZE, DOT_SIZE, DOT_SIZE);
				}
				else {
					this.context.fillStyle = '#B49305';
					this.context.fillRect(i * DOT_SIZE, j * DOT_SIZE, DOT_SIZE, DOT_SIZE);
				}
			}
		}
	}

	this.loop = function() {
		setTimeout(self.loop, 50);
	}
}

var g = new game();
g.init();

