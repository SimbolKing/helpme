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
}