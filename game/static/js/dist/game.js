class AcGameMenu {

    // 除了总对象 AcGame 之外，一般都传入 root 参数，也就是 AcGame 的对象
    constructor(root) {
        this.root = root;

        // html 对象用 $ 表示。普通对象不加 $。主要是给自己进行辨认。
        this.$menu = $(`
<div class="ac-game-menu">
    <div class="ac-game-menu-field">
        <div class="ac-game-menu-field-item ac-game-menu-field-item-single-mode">
            单人模式
        </div>  
        <div class="ac-game-menu-field-item ac-game-menu-field-item-multi-mode">
            多人模式
        </div>
        <div class="ac-game-menu-field-item ac-game-menu-field-item-settings">
            设置
        </div>
    </div>
</div>
`);

        // 把图片加载到 id=ac_game_12345678 的 div 中
        this.root.$ac_game.append(this.$menu);

        // find() 可以在 menu 里找到某一个 class 对应的对象。注意：class 在前面需要加.，id 需要加 #
        this.$single_mode = this.$menu.find('.ac-game-menu-field-item-single-mode');
        this.$multi_mode = this.$menu.find('.ac-game-menu-field-item-multi-mode');
        this.$settings = this.$menu.find('.ac-game-menu-field-item-settings');

        this.start();
    }

        // 定义一些操作函数，在点击按钮时应该执行一些操作
        start() {
            // 调用 add_listening_events 函数
            this.add_listening_events();
        }
        // 给menu绑定监听函数
        add_listening_events() {
            let outer = this; // 想要在里面调用外面的 this 的话，需要在外面定义一个 let outer

            // 给三个按钮绑定函数，分别是single、multi、settings
            this.$single_mode.click(function () {
                // 将菜单界面关闭，打开游戏界面
                outer.hide();
                outer.root.playground.show();
            });

            this.$multi_mode.click(function () {
                console.log("clicked multi_mode");
            });

            this.$settings.click(function () {
                console.log("clicked settings");
            });
        }
        // 展示menu界面
        show() {
            this.$menu.show();
        }
        // 关闭menu界面
        hide() {
            this.$menu.hide();
        }
}// 创建游戏引擎

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
class GameMap extends AcGameObject {
    constructor(playground) {
        super(); // 调用完相当于把自己注册到 AC_GAME_OBJECTS 中
        this.playground = playground; // 把playground存进来
        this.$canvas = $("<canvas></canvas>");
        this.ctx = this.$canvas[0].getContext('2d'); // 2d画布
        this.ctx.canvas.width = this.playground.width; // 设置画布宽度
        this.ctx.canvas.height = this.playground.height; // 设置画布高度
        this.playground.$playground.append(this.$canvas) // 把canvas加到playground里
    }

    start() {

    }

    update() {
        this.render(); // 由于每秒钟都要重画一遍，因此要在update中执行，在start中只能画一次
    }

    // 渲染背景颜色
    render() {
        this.ctx.fillstyle = "rgba(0, 0, 0)";
        this.ctx.fillRect(0, 0, this.ctx.canvas.with, this.ctx.canvas.height);
    }
}
class AcGamePlayground {
    constructor(root) {
        this.root = root;
        this.$playground = $(`<div class="ac-game-playground"></div>`);
        // this.hide();
        this.root.$ac_game.append(this.$playground); // 加入到界面中
        // 把游戏的画布存下来
        this.width = this.$playground.width();
        this.height = this.$playground.height();
        this.game_map = new GameMap(this); // 生成canvas

        this.start();
    }
    start() {

    }

    show() {
        this.$playground.show();
    }

    hide() {
        this.$playground.hide();
    }
}

export class AcGame {
    // 构造函数
    constructor(id) {
        this.id = id; // 把 id 存下来
        this.$ac_game = $('#' + id); // 把 id=ac_game_12345678 的 div 找出来，并赋给 ac_game
        this.menu = new AcGameMenu(this); // 创建菜单，参数this为根对象，是对象自己
        this.playground = new AcGamePlayground(this); // 创建游戏界面

        this.start();
    }

    // 可以放一些初始化等等操作
    start() {

    }
}