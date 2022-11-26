+function () {
    //  小鱼
    window.smallFish = {
        init: function () {
            this.x = width * 0.6;   //横坐标
            this.y = height * 0.6;  //纵坐标
            this.angle = 0; //转动
            this.beye = new Image(); //眼睛
            this.bbody = new Image();   //身体
            this.beye.src = "src/babyEye0.png";
            this.bbody.src = "src/babyFade0.png";
            this.bdis = 0;    //路程累积
            this.bCounter = 0;
            this.btail = []; //尾巴
            for (var i = 0; i < 8; i++) {
                this.btail[i] = new Image();
                this.btail[i].src = "src/babyTail" + i + ".png";
            }
        },
        //    绘制
        draw: function () {
            this.x = lerpDistance(bigFish.x, this.x, 0.98);
            this.y = lerpDistance(bigFish.y, this.y, 0.98);
            var dx = bigFish.x - this.x;
            var dy = bigFish.y - this.y;
            var tar = Math.atan2(dy, dx) + Math.PI;
            this.angle = lerpAngle(tar, this.angle, 0.95);

            this.bdis += Math.abs(dx + dy) * 0.6 + 0.3 * delta_time;    //距离与时间组成的摆动
            if (this.bdis >= 40) {
                //    if (this.bCounter < this.btail.length - 1) this.bCounter++;
                //    else this.bCounter = 0;
                //    this.bdis %= 1;
                //    this.btail.src = this.btail[this.bCounter];
                this.bdis %= 40;
                ++this.bCounter;
                this.bCounter %= 8;
            }
            //console.log(this.bdis + "  " + this.bCounter);
            //this.bdis += delta_time;
            //if (this.bdis > 40) {
            //    this.bdis %= 40;
            //    ++this.bCounter;
            //    this.bCounter %= 8;
            //}

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