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