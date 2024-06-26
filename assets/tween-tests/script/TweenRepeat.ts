import { _decorator, Component, Node, Vec3 } from "cc";
import { tween, Tween } from "../../tween";
const { ccclass, property, menu } = _decorator;

@ccclass("TweenRepeat")
@menu("tween/TweenRepeat")
export class TweenRepeat extends Component {

    private tweenRepeat!: Tween<Node>;

    onLoad () {
        this.tweenRepeat = tween(this.node)
            .by(1, { scale: new Vec3(2, 2, 2) })
            // 对前一个 by 重复执行 3次
            .repeat(3)
            .call(() => { console.log('All tweens finished.') })
    }

    onEnable () {
        this.tweenRepeat.start();
    }

    onDisable () {
        this.tweenRepeat.stop();
    }
}

