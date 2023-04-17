// 创建游戏引擎

// 存入全局数组里，每秒调用数组里的对象60次
let AC_GAME_OBJECTS = [];

class AcGameObject {
    constructor(root) {
        // 每次创建对象时，都把这个对象直接加到全局数组中
        AC_GAME_OBJECTS.push(this);

        // 标记一下每一个函数是否执行过start函数
        this.has_called_start = false;

        // 当前帧距离上一帧的时间间隔。单位：ms
        this.timedelta = 0;
    }

    // 只会在第一帧执行
    start() {

    }

    // 每一帧都会执行一次
    update() {

    }

    // 删除之前要恢复现场，因为击杀者要舔包，删除之前执行一次
    on_destroy() {

    }

    // 删掉该物体，js中把它从数组中删除即可
    destroy() {
        for (let i = 0; i < AC_GAME_OBJECTS.length; i ++ ) {
            if (AC_GAME_OBJECTS[i] === this) {
                AC_GAME_OBJECTS.splice(i, 1); // 删除
                break;
            }
        }
    }
}

// 两帧之间的间隔：当前时间 - 上一帧的时间戳。记录上一帧的时间间隔。timestramp是时间戳
let last_timestamp; // 第一帧不需要初始化timedelta
let AC_GAME_ANIMATION = function(timestramp) {
    for (let i = 0; i < AC_GAME_OBJECTS.length; i ++ ) {
        let obj = AC_GAME_OBJECTS[i];
        // 看看是否执行start函数
        if (!obj.has_called_start) {
            obj.start();
            obj.has_called_start = true;
        }
        // 如果不是第一帧，执行update函数
        else {
            obj.timedelta = timestramp - last_timestamp; // 初始化timedelta，告诉对象两帧之间的时间间隔
            obj.update();
        }
    }
    last_timestamp = timestramp; // 更新上一帧的时间戳

    requestAnimationFrame(AC_GAME_ANIMATION);
}

// 实现每一帧循环一遍数组中的对象。1s 等分 60 份，下一次事件触发时执行。
requestAnimationFrame(AC_GAME_ANIMATION);