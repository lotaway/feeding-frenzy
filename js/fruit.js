+function () {
    //  果实
    window.fruit = {
        init: function () {

            this.alive = [];
            this.maxNum = 30;
            this.static = [];
            this.maxSize = 15;
            this.fType = [];
            this.ane_id = [];   //保存出生果实对应的那一株海葵的下标
            this.x = [];
            this.y = [];
            this._size = [];
            this.speedX = [];
            this.speedY = [];
            this.orange = new Image();
            this.blue = new Image();
            this.orange.src = "./src/orange-fruit.png";
            this.blue.src = "./src/blue-fruit.png";

            for (var i = 0, l = this.maxNum; i < l; i++) {
                fruit.born(i);
            }
        },
        //    绘制
        draw: function () {
            for (var i = 0, l = this.maxNum; i < l; i++) {
                if (this.alive[i]) {
                    //  成长
                    if (this._size[i] <= this.maxSize) {
                        this._size[i] += 0.01 * delta_time;
                        this.x[i] = anemone.topX[this.ane_id[i]];
                    }
                    //  脱离
                    else if (this.y[i] < 0 || this.x[i] < 0 || this.x[i] > width) {
                        fruit.dead(i);
                        //continue;
                    }
                    //  移动
                    else {
                        this.x[i] += 0.01 * this.speedX[i] * delta_time;
                        this.y[i] -= 0.01 * this.speedY[i] * delta_time;
                    }
                    ct_bot.drawImage(this.fType[i], this.x[i] - this._size[i] * 0.5, this.y[i] - this._size[i] * 0.5, this._size[i], this._size[i]);
                }
            }
            fruit.checkNum();
        },
        //  检测
        checkNum: function () {
            //for (var j = 0, m = this.static.length; j < m; j++) {
            if (this.static.length > Math.random() * this.maxNum * 0.5) {
                var t = Math.floor(Math.random() * this.static.length);
                fruit.born(this.static[t]);
                this.static.splice(t, 1);
                //break;
                //j--;
                //m = this.static.length;
            }
            //}
        },
        //  杀死
        //kill: function (i) {
        //},
        dead: function (i) {
            this.alive[i] = false;
            this.static.push(i);
        },
        //  出生
        born: function (i) {
            //var ane_id;
            do {
                this.ane_id[i] = Math.floor(Math.random() * anemone.maxNum);
            }
            while (this.alive[this.ane_id[i]]);
            //console.log(ane_id);

            this.alive[this.ane_id[i]] = true;
            this.x[i] = anemone.topX[this.ane_id[i]];
            this.y[i] = anemone.topY[this.ane_id[i]];
            this._size[i] = 0;
            if (Math.random() >= 0.8) this.fType[i] = this.blue;
            else this.fType[i] = this.orange;
            this.speedX[i] = Math.ceil(Math.random() * 5 + Math.random() * -5);
            this.speedY[i] = Math.ceil(Math.random() * 10);
        }
    }
}()