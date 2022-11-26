+function () {
    //  大鱼
    window.bigFish = {
        init: function () {
            this.x = width * 0.5;
            this.y = height * 0.5;
            this.angle = 0;
            this.beye = new Image();
            this.bbody = new Image();
            this.beye.src = "src/bigEye0.png";
            this.bbody.src = "src/bigSwim0.png";
            this.bTimer = 0;    //时间累积
            this.bdis = 0;    //路程累积
            this.bCounter = 0;
            this.btail = []; //尾巴
            for (var i = 0; i < 8; i++) {
                this.btail[i] = new Image();
                this.btail[i].src = "src/bigTail" + i + ".png";
            }
        },
        //    绘制
        draw: function () {
            this.x = lerpDistance(mx, this.x, 0.95);
            this.y = lerpDistance(my, this.y, 0.95);
            var dx = mx - this.x;
            var dy = my - this.y;
            var tar = Math.atan2(dy, dx) + Math.PI;
            this.angle = lerpAngle(tar, this.angle, 0.8);
            //眨眼
            this.bTimer += delta_time;
            if (this.bTimer >= 1000) {
                this.bTimer %= 1000;
            }
            //距离与时间组成的尾巴摆动
            this.bdis += Math.abs(dx + dy) * 0.5 + 0.2 * delta_time;
            if (this.bdis >= 40) {
                //    if (this.bCounter < this.btail.length - 1) this.bCounter++;
                //    else this.bCounter = 0;
                //    this.bdis %= 1;
                //    this.btail.src = this.btail[this.bCounter];
                this.bdis %= 40;
                ++this.bCounter;
                this.bCounter %= 8;
            }

            ct_top.save();
            ct_top.translate(this.x, this.y);
            ct_top.rotate(this.angle);
            ct_top.drawImage(this.btail[this.bCounter], this.bbody.width * 0.5 - this.btail[this.bCounter].width * 0.35, -this.btail[this.bCounter].height * 0.5);
            ct_top.drawImage(this.bbody, -this.bbody.width * 0.5, -this.bbody.height * 0.5);
            ct_top.drawImage(this.beye, -this.beye.width * 0.5, -this.beye.height * 0.5);
            ct_top.restore();

            collide();
        }
    }
}()