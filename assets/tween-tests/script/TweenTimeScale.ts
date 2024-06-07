import { _decorator, Component, Node, Slider } from 'cc';
import { Tween } from '../../tween';
import { TweenReverse } from './TweenReverse';
const { ccclass, property } = _decorator;

@ccclass('TweenTimeScale')
export class TweenTimeScale extends Component {

    private _currentTween: Tween<Node> | undefined;

    start() {
        const comp = this.getComponent(TweenReverse);
        this._currentTween = comp?.currentTween;
    }

    onSliderValueChange(silder: Slider) {
        if (!this._currentTween) return;
        
        const scale = 1 + (silder.progress - 0.5) * 2;
        console.log(`change: ${scale.toFixed(2)}`);
        this._currentTween.timeScale(scale);
    }
}

