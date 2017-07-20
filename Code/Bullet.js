function Bullet(x,y){
	this.x = x;
	this.y = y;
	this.radius = 4;
	this.shotInvader = false;

	this.show = function(){
		push();
		stroke(200);
  		fill(198, 63, 63);
  		ellipse(this.x, this.y, this.radius*2, this.radius*2);
  		pop();
	}

	this.move = function(){
  		this.y  = this.y  - 5;
	}

	this.hits = function(invader){
		var d = dist(this.x, this.y, invader.x, invader.y);
		if(d < this.radius + invader.radius){
			return true;
		}else {
			return false;
		}
	}

	this.hitAInvader = function(){
		this.shotInvader = true;
	}
}
