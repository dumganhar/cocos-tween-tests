import { _decorator, Component, Node, Vec3 } from "cc";
import { tween, Tween } from "../../tween";
const { ccclass, property, menu } = _decorator;

@ccclass("TweenDelay")
@menu("tween/TweenDelay")
export class TweenDelay extends Component {

    private tweenDelay!: Tween<Node>;

    onLoad () {
        this.tweenDelay = tween(this.node)
            // 延迟 1s
            .delay(1)
            .to(1, { scale: new Vec3(2, 2, 2) })
            // 再延迟 1s
            .delay(1)
            .to(1, { scale: new Vec3(3, 3, 3) })
    }

    onEnable () {
        this.tweenDelay.start()
    }

    onDisable () {
        this.tweenDelay.stop()
    }
}
