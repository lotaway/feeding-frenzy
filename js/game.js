var last_time = 0,  //  上次时间
    delta_time, //  时间间隔
    bg = new Image(), //  背景
//ane,   //   海葵
    width = "800",  //  宽度
    height = "600", //  高度
    mx = width * 0.5, //  鼠标横坐标
    my = width * 0.5, //  鼠标纵坐标
    cv_top,  //  顶部画布
    cv_bot,  // 底部画布
    ct_top,  //  顶部画布内容
    ct_bot; //  底部画布内容

var game = function () {
    init();
}

var init = function () {

    cv_top = document.getElementById("cv-top");
    cv_bot = document.getElementById("cv-bottom");

    if (cv_top != undefined && cv_bot != undefined) {

        cv_top.setAttribute("width", width);
        cv_top.setAttribute("height", height);
        cv_bot.setAttribute("width", width);
        cv_bot.setAttribute("height", height);

        cv_top.addEventListener("mousemove", getMouseXY);

        ct_top = cv_top.getContext("2d");
        ct_bot = cv_bot.getContext("2d");

        bg.src = "./src/background.jpg";

        //ane = new anemone();
        anemone.init();
        fruit.init();
        bigFish.init();
        smallFish.init();
        last_time = Date.now();

        //test
        //ct_bot.beginPath();
        //ct_bot.strokeStyle = "#ac20c2";
        //ct_bot.moveTo(0,0);
        //ct_bot.lineTo(300,300);
        //ct_bot.lineWidth = 10;
        //ct_bot.lineCap = "round";
        //ct_bot.stroke();
        gameLoop();
    }
    else alert("画布载入失败");
}

//调用函数绘制画布元素
var gameLoop = function () {

    //  检查时间间隔
    var now_time = Date.now();  //  检查当前时间点
    delta_time = now_time - last_time;
    last_time = now_time;   //  重置上次的时间点
    if (delta_time > 40) delta_time = 40;
    //console.log(delta_time);   //  输出两次调用函数的时间间隔

    // 绘制内容
    ct_top.clearRect(0, 0, width, height);
    ct_bot.clearRect(0, 0, width, height);
    background();
    anemone.draw();
    fruit.draw();
    bigFish.draw();
    smallFish.draw();

    //重复调用自身，用于重绘画布
    requestAnimFrame(gameLoop);
}
//获取鼠标相对于画布层的坐标
var getMouseXY = function (e) {
    if (e.offsetX || e.layerX) {
        mx = e.offsetX == undefined ? e.layerX : e.offsetX;
        my = e.offsetY == undefined ? e.layerY : e.offsetY;
        //console.log(mx);
    }
}