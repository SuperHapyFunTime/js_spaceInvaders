function Ship(){
	this.x = width/2;
	this.radius = 32.5;
	this.xDir = 0;
	this.score = 0;

	var shipPic = loadImage("/Sprites/Hero.png"); 

	this.show = function(){
		imageMode(CENTER)
		 image(shipPic, this.x, height -75, this.radius*2, this.radius*2);
	}

	this.move = function(dir){
		this.x += this.xDir *4;
	}

	this.setDir = function(dir){
		this.xDir = dir;
	}

	this.updateScore = function(invaderValue){
		this.score += invaderValue;
	}
}