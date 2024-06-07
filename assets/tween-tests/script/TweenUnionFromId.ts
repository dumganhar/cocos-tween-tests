import { _decorator, Component, Node, UITransform, Vec3, Size, Label, UIOpacity } from 'cc';
import { tween, Tween } from "../../tween";
const { ccclass, property } = _decorator;

@ccclass('TweenUnionFromId')
export class TweenUnionFromId extends Component {

    @property(Label)
    label: Label | null = null;

    @property(Node)
    grossini: Node | null = null;

    start() {
        const label = this.label!;
        const grossini = this.grossini!;

        tween(grossini)
            .call(()=>{
                label.string = '停顿 2 秒';
            })
            .delay(2)
            .call(()=>{
                label.string = '开始向右移动';
            }).id(99)
            .by(2, { position: new Vec3(640, 0, 0) }).id(100)
            .call(()=>{
                label.string = '开始向左移动'
            })
            .reverse(100)
            .union(99)
            .repeat(Number.MAX_SAFE_INTEGER)
            .start();

    }


}

