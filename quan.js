var quan = function(game) {
	this.game = game;
	this.white = null;
	this.black = null;
	this.colKhaiCuoc = 0;

	var self = this;

	this.init = function() {
		this.white = new Array(10);
		for(let i = 0; i <= 7; i++) {
			this.white[i] = new Object();
		}

		this.white[0] = {
			src: 'bishop-white.png',
			x: 2,
			y: 0
		}

		this.white[1] = {
			src: 'bishop-white.png',
			x: 5,
			y: 0
		}

		this.white[2] = {
			src: 'rook-white.png',
			x: 0,
			y:0
		}

		this.white[3] = {
			src: 'rook-white.png',
			x: 7,
			y: 0
		}

		this.white[4] = {
			src: 'knight-white.png',
			x: 1,
			y:0
		}

		this.white[5] = {
			src: 'knight-white.png',
			x: 6,
			y: 0
		}

		this.white[6] = {
			src: 'queen-white.png',
			x: 3,
			y: 0
		}

		this.white[7] = {
			src: 'king-white.png',
			x: 4,
			y: 0
		}

		for(let i = 0;i <= 7; i++) {
			let img = new Image();
			img.onload = function() {
				self.game.context.drawImage(img, self.white[i].x * DOT_SIZE, self.colKhaiCuoc * DOT_SIZE);
			}
			img.src = 'images/' + self.white[i].src;
			this.white[i].img = img;
		}

		setTimeout(() => {
			this.colKhaiCuoc = 7;
			for(let i = 0; i <= 7; i++) {
			this.white[i].img.src = this.white[i].img.src.replace('-white.png','.png');
		}

		let pawnWhite = new Image();
		pawnWhite.src = 'images/pawn-white.png';
		pawnWhite.onload = function() {
			for(let i = 0; i <= 7; i++) {
				self.game.context.drawImage(pawnWhite, i * DOT_SIZE, DOT_SIZE);
			}
		}

		let pawn = new Image();
		pawn.src = 'images/pawn.png';
		pawn.onload = function() {
			for(let i = 0; i <= 7; i++) {
				self.game.context.drawImage(pawn, i * DOT_SIZE, 6 * DOT_SIZE);
			}
		}

	}, 1000);
	}
}