+function () {
    window.score = {
        // 显示
        show: function (target, i) {
            for (var i = 0; i < 3; i++) {
                setTimeout(function () {
                    ct_top.save();
                    ct_top.strokeStyle = "#fff";
                    ct_top.strokeText("100", target.x[i], target.y[i]);
                    ct_top.restore();
                }, delta_time);
            }
        }
    }
}()