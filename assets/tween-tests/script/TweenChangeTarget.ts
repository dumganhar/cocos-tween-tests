import { _decorator, Component, Node, UITransform, Vec3, Size, Label, UIOpacity } from 'cc';
import { tween } from "../../tween";
const { ccclass, property } = _decorator;

@ccclass('TweenChangeTarget')
export class TweenChangeTarget extends Component {
    @property(Label)
    label: Label | null = null;

    @property(Node)
    sister: Node | null = null;

    @property(Node)
    grossini: Node | null = null;

    private _tweenRunCount = 0;

    start() {
        const sister = this.sister!;
        const sisterUiTrans = sister.getComponent(UITransform)!;
        const sisterUiOpacity = sister.getComponent(UIOpacity)!;

        const grossini = this.grossini!;
        const grossiniUitrans = grossini.getComponent(UITransform)!;
        const grossiniUiOpacity = grossini.getComponent(UIOpacity)!;

        const moveToRight = tween(grossini).by(2, { position: new Vec3(640, 0, 0) });
        const moveToLeft = tween(grossini).by(2, { position: new Vec3(-640, 0, 0) });
        
        const largerWidth = tween(grossiniUitrans).by(2, { contentSize: new Size(100, 0) });
        const smallerWidth = tween(grossiniUitrans).by(2, { contentSize: new Size(-100, 0) });

        const smallerOpacity = tween(grossiniUiOpacity).to(2, { opacity: 80 });
        const largerOpacity = tween(grossiniUiOpacity).to(2, { opacity: 255 });

        tween(grossini)
            .call(()=>{
                ++this._tweenRunCount;
                this.label!.string = `小姐姐向右移动、图像变宽、Alpha变小, 次数: ${this._tweenRunCount}`;
            })
            .parallel(
                moveToRight.target(sister),
                largerWidth.target(sisterUiTrans),
                smallerOpacity.target(sisterUiOpacity),
            )
            .call(()=>{
                this.label!.string = `小姐姐向左移动、图像恢复正常、Alpha恢复, 次数: ${this._tweenRunCount}`;
            })
            .parallel(
                moveToLeft.target(sister),
                smallerWidth.target(sisterUiTrans),
                largerOpacity.target(sisterUiOpacity),
            )

            .call(()=>{
                this.label!.string = `小哥哥向右移动、图像变宽、Alpha变小, 次数: ${this._tweenRunCount}`;
            })
            .parallel(
                moveToRight.clone(grossini),
                largerWidth.clone(grossiniUitrans),
                smallerOpacity.clone(grossiniUiOpacity),
            )
            .call(()=>{
                this.label!.string = `小哥哥向左移动、图像恢复正常、Alpha恢复, 次数: ${this._tweenRunCount}`;
            })
            .parallel(
                moveToLeft.clone(grossini),
                smallerWidth.clone(grossiniUitrans),
                largerOpacity.clone(grossiniUiOpacity),
            )
            .union()
            .repeatForever()
            .start();
    }
}

