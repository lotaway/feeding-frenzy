//  检测大鱼与果实的碰撞、食用
var collide = function () {
    for (var i = 0, l = fruit.alive.length; i < l; i++) {
        if (fruit.alive[i] && calLength2(fruit.x[i], fruit.y[i], bigFish.x, bigFish.y) < 300 && fruit._size[i] >= fruit.maxSize) {
            fruit.dead(i);
            //score.show(fruit, i);
        }
    }
}