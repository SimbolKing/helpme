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