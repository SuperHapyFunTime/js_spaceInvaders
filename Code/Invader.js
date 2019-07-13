function Invader(x, y, r, invadersScoreWorth, invaderColour){
	this.x = x;
	this.xDir = 1
	this.y = y;
	this.radius = r;
	this.gotShot = false;
	this.invaderValue= invadersScoreWorth;
	this.colour;

	var blue_Invader = loadImage("../Sprites/Blue_Invader.png");
	var green_Invader = loadImage("../Sprites/Green_Invader.png");
	var neon_Invader = loadImage("../Sprites/Neon_Blue.png");
	var pink_Invader = loadImage("../Sprites/Pink_Invader.png");
	var red_Invader = loadImage("../Sprites/Red_Invader.png");

	this.show = function(){
		imageMode(CENTER);
		this.colourPicker();
		image(colour, this.x, this.y, this.radius*2, this.radius*2);
	}

	this.die = function(){
		this.gotShot =  true;
	}

	this.move = function(){
		this.x = this.x + this.xDir;
	} 

	this.shiftDown = function(){
		this.y += this.radius;
	}

	this.changeDir = function(){
		this.xDir *= -1;
	}
	this.colourPicker = function(){
		if(invaderColour === "BLUE"){
			colour = blue_Invader;
		}
		if(invaderColour === "GREEN"){
			colour = green_Invader;
		}
		if(invaderColour === "NEON"){
			colour = neon_Invader;
		}
		if(invaderColour === "PINK"){
			colour = pink_Invader;
		}
		if(invaderColour === "RED"){
			colour = red_Invader;
		}

	}

}