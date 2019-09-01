var quan = function(game) {
	this.game = game;
	this.white = null;
	this.black = null;
	this.state = null;
	this.available = null;
	this.character = null;
	this.rook = [
		[0, 1], [1, 0], [-1, 0], [0, -1]
	]
	this.knight = [
		[1, 2], [1, -2], [-1, 2], [-1, -2], [-2, -1], [-2, 1], [2, -1], [2, 1]
	]
	this.queen = [
		[0, 1], [1, 0], [-1, 0], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]
	]
	this.king = [
		[0, 1], [1, 0], [-1, 0], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]
	]
	this.bishop = [
		[1, 1], [1, -1], [-1, 1], [-1, -1]
	]
	this.on = {
		x: 0,
		y: 0,
		turn: -1
	}

	var self = this;

	this.init = function() {
		this.state = new Array(8);
		this.available = new Array(8);
		this.character = new Array(8);
		for(let i = 0; i <= 7; i++) {
			this.state[i] = new Array(8);
			this.available[i] = new Array(8);
			this.character[i] = new Array(8);
			for(let j = 0; j <= 7; j++) {
				this.state[i][j] = 0;
				this.available[i][j] = 0;
				this.character[i][j] = null;
			}
		}

		this.white = new Array(10);
		for(let i = 0; i <= 7; i++) {
			this.white[i] = new Object();
		}

		this.white[0] = {
			src: 'bishop-white.png',
			x: 2,
			y: 0,
			type: 3
		}

		this.white[1] = {
			src: 'bishop-white.png',
			x: 5,
			y: 0,
			type: 3
		}

		this.white[2] = {
			src: 'rook-white.png',
			x: 0,
			y:0,
			type: 1
		}

		this.white[3] = {
			src: 'rook-white.png',
			x: 7,
			y: 0,
			type: 1
		}

		this.white[4] = {
			src: 'knight-white.png',
			x: 1,
			y:0,
			type: 2
		}

		this.white[5] = {
			src: 'knight-white.png',
			x: 6,
			y: 0,
			type: 2
		}

		this.white[6] = {
			src: 'queen-white.png',
			x: 3,
			y: 0,
			type: 4
		}

		this.white[7] = {
			src: 'king-white.png',
			x: 4,
			y: 0,
			type: 5
		}

		for(let i = 0;i <= 7; i++) {
			let img = new Image();
			img.onload = function() {
				self.game.context.drawImage(img, self.white[i].x * DOT_SIZE, 0);
				self.character[0][self.white[i].x] = img;
			}
			img.src = 'images/' + self.white[i].src;
			this.white[i].img = img;
			this.state[0][this.white[i].x] = this.white[i].type + 10;
		}

		let pawnWhite = new Image();
		pawnWhite.src = 'images/pawn-white.png';
		pawnWhite.onload = function() {
			for(let i = 0; i <= 7; i++) {
				self.game.context.drawImage(pawnWhite, i * DOT_SIZE, DOT_SIZE);
				self.state[1][i] = 16;
				self.character[1][i] = pawnWhite;
			}
		}

		this.black = new Array(10);

		for(let i = 0; i <= 7; i++) {
			this.black[i] = new Object();
			this.black[i].src = 'images/' + this.white[i].src.replace('-white.png', '.png');
			this.black[i].x = this.white[i].x;
			this.black[i].type = this.white[i].type;
		}

		for(let i = 0; i <= 7; i++) {
			let img = new Image();
			img.src = this.black[i].src;
			img.onload = function() {
				self.game.context.drawImage(img, self.black[i].x * DOT_SIZE, 7 * DOT_SIZE);
				self.character[7][self.black[i].x] = img;
			}
			this.state[7][this.black[i].x] = this.black[i].type;
		}

		let pawn = new Image();
		pawn.src = 'images/pawn.png';
		pawn.onload = function() {
			for(let i = 0; i <= 7; i++) {
				self.game.context.drawImage(pawn, i * DOT_SIZE, 6 * DOT_SIZE);
				self.state[6][i] = 6;
				self.character[6][i] = pawn;
			}
		}
	}

	this.resetAvailable = function() {
		for(let i = 0; i <= 7; i++) {
			for(let j = 0; j <= 7; j++) {
				this.available[i][j] = 0;
				if((i + j) % 2 == 0) {
					this.game.context.fillStyle = '#AD1A05';
					this.game.context.fillRect(j * DOT_SIZE, i * DOT_SIZE, DOT_SIZE, DOT_SIZE);
				}
				else {
					this.game.context.fillStyle = '#B49305';
					this.game.context.fillRect(j * DOT_SIZE, i * DOT_SIZE, DOT_SIZE, DOT_SIZE);
				}
				if(this.character[i][j] != null)
				this.game.context.drawImage(this.character[i][j], j * DOT_SIZE, i * DOT_SIZE);
			}
		}
	}

	this.checkWin = function() {
		let whiteKing = 0, blackKing = 0;
		this.state.forEach(el => {
			el.forEach(dot => {
				if(dot == 5) blackKing = 1;
				if(dot == 15) whiteKing = 1;
			})
		})
		if(whiteKing == 0 ) {
			alert('Black win!!!');
		}
		if(blackKing == 0) {
			alert('White win!!!');
		}
	}

	this.update = function(x, y) {
	    let turn = this.on.turn;
		if(this.available[x][y] > 0) {
			let u = this.on.x, v = this.on.y;
			this.character[x][y] = this.character[u][v];
			this.state[x][y] = this.state[u][v];
			this.state[u][v] = 0;
			this.character[u][v] = null;
			this.resetAvailable();
			this.checkWin();
			this.on.turn *= -1;
			return;
		}

		this.resetAvailable();

		if(this.state[x][y] == 0) return;

		if(turn == 1 && this.state[x][y] > 10) return;
		if(turn == -1 && this.state[x][y] < 10) return;

		if(this.state[x][y] % 10 == 1) {
			this.updateRook(x, y, turn);
		}

		if(this.state[x][y] % 10 == 2) {
			this.updateKnight(x, y, turn);
		} 

		if(this.state[x][y] % 10 == 3) {
			this.updateBishop(x, y, turn);
		}

		if(this.state[x][y] % 10 == 4) {
			this.updateQueen(x, y, turn);
		}

		if(this.state[x][y] % 10 == 5) {
			this.updateKing(x, y, turn);
		}

		if(this.state[x][y] % 10 == 6) {
			this.updatePawn(x, y, turn);
		}

		if(this.state[x][y] != 0) {
			this.on = {x, y, turn};
		}

		for(let i = 0; i <= 7; i++) {
			for(let j = 0; j <= 7; j++) {
				if(this.available[i][j] == 0) continue;
				if(this.available[i][j] == 1) {
					this.game.context.fillStyle = '#157905';
					this.game.context.fillRect(j * DOT_SIZE, i * DOT_SIZE, DOT_SIZE, DOT_SIZE);
				}
				else {
					this.game.context.fillStyle = '#053EA2';
					this.game.context.fillRect(j * DOT_SIZE, i * DOT_SIZE, DOT_SIZE, DOT_SIZE);
				}

				if(this.character[i][j] != null)
				this.game.context.drawImage(this.character[i][j], j * DOT_SIZE, i * DOT_SIZE);
			}
		}
	}

	this.updateRook = function(x, y, turn) {
		this.rook.forEach((el) => {
			let u = x + el[0];
			let v = y + el[1];
			while(u >= 0 && u <= 7 && v >= 0 && v <= 7) {
				if(this.state[u][v] == 0) {
					this.available[u][v] = 1;
				}
				else {
					if(turn == 1 && this.state[u][v] > 10) {
						this.available[u][v] = 2;
					}
					if(turn == -1 && this.state[u][v] < 10 && this.state[u][v]) {
						this.available[u][v] = 2;
					}
					break;
				}
				u += el[0];
				v += el[1];
			}
		})
	}

	this.updateKnight = function(x, y, turn) {
		for(let i = 0; i <= 7; i++) {
			let u = x + this.knight[i][0];
			let v = y + this.knight[i][1];

			if(u >= 0 && u <= 7 && v >= 0 && v <= 7) {
				if(this.state[u][v] == 0) {
					this.available[u][v] = 1;
				}
				else {
					if(turn == -1 && this.state[u][v] < 10 && this.state[u][v] > 0) {
						this.available[u][v] = 2;
					}
					if(turn == 1 && this.state[u][v] > 10) {
						this.available[u][v] = 2;
					}
				}
			}
		}
	}

	this.updateBishop = function(x, y, turn) {
		this.bishop.forEach((el) => {
			let u = x + el[0];
			let v = y + el[1];
			while(u >= 0 && u <= 7 && v >= 0 && v <= 7) {
				if(this.state[u][v] == 0) {
					this.available[u][v] = 1;
				}
				else {
					if(turn == 1 && this.state[u][v] > 10) {
						this.available[u][v] = 2;
					}
					if(turn == -1 && this.state[u][v] < 10) {
						this.available[u][v] = 2;
					}
					break;
				}
				u += el[0];
				v += el[1];
			}
		})
	}

	this.updateQueen = function(x, y, turn) {
		this.queen.forEach((el) => {
			let u = x + el[0];
			let v = y + el[1];
			while(u >= 0 && u <= 7 && v >= 0 && v <= 7) {
				if(this.state[u][v] == 0) {
					this.available[u][v] = 1;
				}
				else {
					if(turn == 1 && this.state[u][v] > 10) {
						this.available[u][v] = 2;
					}
					if(turn == -1 && this.state[u][v] < 10) {
						this.available[u][v] = 2;
					}
					break;
				}
				u += el[0];
				v += el[1];
			}
		})
	}

	this.updateKing = function(x, y, turn) {
		this.king.forEach((el) => {
			let u = x + el[0];
			let v = y + el[1];
			if(u >= 0 && u <= 7 && v >= 0 && v <= 7) {
				if(this.state[u][v] == 0) this.available[u][v] = 1;
				else {
					if(turn == 1 && this.state[u][v] > 10) {
						this.available[u][v] = 2;
					}
					if(turn == -1 && this.state[u][v] < 10) {
						this.available[u][v] = 2;
					}
				}
			}
		})
	}

	this.updatePawn = function(x, y, turn) {
		if(turn == 1) {
			if(this.state[x - 1][y] == 0) {
				this.available[x - 1][y] = 1;
			}
			if(y >= 1 && this.state[x - 1][y - 1] > 10) {
				this.available[x - 1][y - 1] = 2;
			}
			if(y <= 6 && this.state[x - 1][y + 1] > 10) {
				this.available[x - 1][y + 1] = 2;
			} 
		}
		else {
			if(this.state[x + 1][y] == 0) {
				this.available[x + 1][y] = 1;
			}
			if(y <= 6 && this.state[x + 1][y + 1] < 10 && this.state[x + 1][y + 1] > 0) {
				this.available[x + 1][y + 1] = 2;
			}
			if(y >= 1 && this.state[x + 1][y - 1] < 10 && this.state[x + 1][y - 1] > 0) {
				this.available[x + 1][y - 1] = 2;
			}
		}
	}
}