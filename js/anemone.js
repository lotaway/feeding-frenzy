+function () {
    //海葵
    window.anemone = {
        init: function () {

            this.botX = []; //底部定点X轴，Y固定为底部即画布的高度值
            this.midX = []; //中间控制点X轴
            this.midY = []; //中间控制点Y轴
            this.topX = []; //顶部定点X轴，随时间和摆动幅度改变
            this.topY = []; //顶部定点Y轴
            this.swip = 0; //摆动的幅度
            this.maxNum = 50;   //海葵数量

            //创建海葵位置
            for (var i = 0, l = this.maxNum; i < l; i++) {
                var rx = i * 16 + Math.floor(Math.random() * 32);
                for (var j = 0; j <= i; j++) {
                    if (rx == this.botX[j]) {
                        i--;
                        rx = null;
                        break;
                    }
                }
                //if (rx == null) continue;
                this.botX[i] = rx;
                this.midX[i] = this.botX[i];
                this.midY[i] = height - Math.floor(Math.random() * 50) - 80;
                this.topX[i] = this.botX[i];
                this.topY[i] = this.midY[i] * 2 - height;
                //console.log(this.x[i] + "  " + this.h[i]);
            }
        },
        //    绘制海葵
        draw: function () {
            this.swip += 0.001 * delta_time;
            if (this.swip > 2 * Math.PI) this.swip = 0;
            ct_bot.save();
            ct_bot.globalAlpha = "0.6";
            ct_bot.strokeStyle = "#ac20c2";
            ct_bot.lineWidth = 20;
            ct_bot.lineCap = "round";
            for (var i = 0, l = this.maxNum; i < l; i++) {
                ct_bot.beginPath();
                ct_bot.moveTo(this.botX[i], height);
                //ct_bot.lineTo(this.x[i], height - this.h[i]);
                this.topX[i] = this.botX[i] + 20 * Math.sin(this.swip);
                ct_bot.quadraticCurveTo(this.midX[i], this.midY[i], this.topX[i], this.topY[i]);

                //ct_bot.closePath();
                ct_bot.stroke();
            }
            ct_bot.restore();
        }
    }
}()