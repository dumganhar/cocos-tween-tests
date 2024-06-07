import { _decorator, Component, Node, Label, Vec3, UITransform, UIOpacity, Size, v3 } from 'cc';
import { tween } from "../../tween";
const { ccclass, property } = _decorator;

@ccclass('TweenReverse')
export class TweenReverse extends Component {
    @property(Label)
    label: Label | null = null;

    @property(Node)
    sister: Node | null = null;

    @property(Node)
    sister2: Node | null = null;

    @property(Node)
    grossini: Node | null = null;

    private _tweenRunCount = 0;

    start() {
        const sister = this.sister!;
        const sisterUiTrans = sister.getComponent(UITransform)!;
        const sisterUiOpacity = sister.getComponent(UIOpacity)!;

        const sister2 = this.sister2!;
        const sister2UiTrans = sister2.getComponent(UITransform)!;
        const sister2UiOpacity = sister2.getComponent(UIOpacity)!;

        const grossini = this.grossini!;
        const grossiniUitrans = grossini.getComponent(UITransform)!;
        const grossiniUiOpacity = grossini.getComponent(UIOpacity)!;

        const tMoveToRightAndSmaller = tween(grossini).by(2, { position: new Vec3(640, 0, 0), scale: new Vec3(-0.5, -0.5, 1) });
        const tMoveToLeftAndBigger = tMoveToRightAndSmaller.reverse();
        
        const tLargerWidth = tween(grossiniUitrans).by(2, { contentSize: new Size(100, 0) });
        const tSmallerWidth = tLargerWidth.reverse();

        const tSmallerOpacity = tween(grossiniUiOpacity).by(2, { opacity: -150 });
        const tLargerOpacity = tSmallerOpacity.reverse();

        const tAnotherSmallerOpacity1 =tween<UIOpacity>()
            .to(2, { opacity: 200 })
            .by(2, { opacity: -75 }).id(200);

        const tAnotherSmallerOpacity2 =tween<UIOpacity>().by(2, { opacity: -75 });

        tween(grossini)
            .call(()=>{
                ++this._tweenRunCount;
                this.label!.string = `小姐姐1向右移动、图像变宽变大、Alpha变小, 次数: ${this._tweenRunCount}`;
            })
            .parallel(
                tMoveToRightAndSmaller.target(sister),
                tLargerWidth.target(sisterUiTrans),
                tSmallerOpacity.target(sisterUiOpacity),
            )
            .call(()=>{
                this.label!.string = `小姐姐1向左移动、图像恢复正常、Alpha恢复, 次数: ${this._tweenRunCount}`;
            })
            .parallel(
                tMoveToLeftAndBigger.target(sister),
                tSmallerWidth.target(sisterUiTrans),
                tLargerOpacity.target(sisterUiOpacity),
            )
            .call(()=>{
                this.label!.string = `小哥哥向右移动、图像变宽变大、Alpha变小, 次数: ${this._tweenRunCount}`;
            })
            .parallel(
                tMoveToRightAndSmaller.clone(grossini),
                tLargerWidth.clone(grossiniUitrans),
                tSmallerOpacity.clone(grossiniUiOpacity)
            ).id(100)
            .call(()=>{
                this.label!.string = `小哥哥向左移动、图像恢复正常、Alpha恢复, 次数: ${this._tweenRunCount}`;
            })
            .reverse(100)

            .call(()=>{
                this.label!.string = `小姐姐2向右移动、图像变宽变大、Alpha变小, 次数: ${this._tweenRunCount}`;
            })
            .parallel(
                tMoveToRightAndSmaller.clone(sister2),
                tLargerWidth.clone(sister2UiTrans),
                tSmallerOpacity.clone(sister2UiOpacity)
            )
            .call(()=>{
                this.label!.string = `小姐姐2向左移动、图像恢复正常、Alpha不变, 次数: ${this._tweenRunCount}`;
            })
            .parallel(
                tMoveToLeftAndBigger.clone(sister2),
                tSmallerWidth.clone(sister2UiTrans),
            )
            .call(()=>{
                this.label!.string = `小姐姐2 Alpha恢复, 次数: ${this._tweenRunCount}`;
            })
            .reverse(tAnotherSmallerOpacity2.clone(sister2UiOpacity))
            .reverse(tAnotherSmallerOpacity1.clone(sister2UiOpacity), 200)
            .call(()=>{
                this.label!.string = `完成此次: ${this._tweenRunCount}`;
            })
            .delay(2)
            .union()
            .repeatForever()
            .start();
    }
}

