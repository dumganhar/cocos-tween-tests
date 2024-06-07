import { _decorator, Component, Node, UITransform, Vec3, Size, Label, UIOpacity } from 'cc';
import { tween, Tween } from "../../tween";
const { ccclass, property } = _decorator;

@ccclass('TweenDifferentTarget')
export class TweenDifferentTarget extends Component {

    @property(Label)
    label: Label | null = null;

    private _tweenRunCount = 0;

    start() {
        const node = this.node;
        const uitrans = node.getComponent(UITransform)!;
        const uiOpacity = node.getComponent(UIOpacity)!;

        
        tween(node)
            .call(()=>{
                ++this._tweenRunCount;
                this.label!.string = `向右移动、图像变宽、Alpha变小, 次数: ${this._tweenRunCount}`;
            })
            .parallel(
                tween(node).by(2, { position: new Vec3(640, 0, 0) }),
                tween(uitrans).by(2, { contentSize: new Size(100, 0) }),
                tween(uiOpacity).to(2, { opacity: 80}),
            )
            .call(()=>{
                this.label!.string = `向左移动、图像恢复正常、Alpha恢复, 次数: ${this._tweenRunCount}`;
            })
            .parallel(
                tween(node).by(2, { position: new Vec3(-640, 0, 0) }),
                tween(uitrans).by(2, { contentSize: new Size(-100, 0) }),
                tween(uiOpacity).to(2, { opacity: 255}),
            )
            .union()
            .repeatForever()
            .start();
    }
}

