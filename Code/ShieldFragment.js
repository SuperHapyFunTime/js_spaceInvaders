function ShieldFragment(x, y, r) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.radius = r;
    this.counter = 0;
    this.shouldDestroy = false;


    this.update = function () {

    }

    this.show = function () {
        push();
        rect(this.x, this.y, this.radius * 2, this.radius * 2);
        fill(0, 255, 0);
        pop();
        if (this.counter >= 1) {
            this.destroy();
        }
    }

    this.hit = function () {
        this.counter++;
    }

    this.destroy = function () {
        this.shouldDestroy = true;
    }

}

