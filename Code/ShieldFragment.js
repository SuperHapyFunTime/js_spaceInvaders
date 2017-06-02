function ShieldFragment(x, y, r) {
  this.x = x;
  this.y = y;
  this.height = height;
  this.width = width;
  this.radius = r;
  this.counter = 0;
  this.hitTwice = false;



  this.update = function() {

  }

  this.show = function() {
    if(this.counter === 0){
      fill(0,255,0);
    }else if(this.counter ===1){
      fill(0,150,0);
    } 
    else{
      this.destroy();
    }

    noStroke();
    rect(this.x, this.y, this.radius*2, this.radius*2);
  }

  this.hit = function(){
    this.counter++;
  }

  this.destroy = function(){
    this.hitTwice = true;
  }

}

