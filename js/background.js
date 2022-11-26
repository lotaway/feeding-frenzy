//背景绘制
var background = function () {
    //console.log("bg");

    //  wrong
    //cv_bot.style.background = "url(../src/background.jpg) center no-reaper";
    //cv_bot.style.backgroundSize = "cover";

    //  right
    //ct_bot.beginPath();
    ct_bot.drawImage(bg, 0, 0, width, height);
}