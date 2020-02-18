import {inject, injectable} from "inversify";
import * as PIXI from "pixi.js";

import { Services } from "../../types";
import  { AbstractView } from "../../interfaces";
import { StageService } from "../../services";

@injectable()
export class LoaderView implements AbstractView {
    private contaner: PIXI.Container;
    private textAnimation = [
        "Loading" ,
        "Loading.",
        "Loading..",
        "Loading..."
    ];

    private textIndex = 0;
    private loadingCounter = 20;
    private loadingIndex = 0;

    private textInstance: PIXI.Text;

    constructor(
        @inject(Services.Stage) private stageService: StageService
    ) {

    }

    onInit(): void {
        this.contaner = new PIXI.Container();

        const bg = this.contaner.addChild(new PIXI.Graphics());
        bg.beginFill(0x000000);
        bg.drawRect(
            0,
            0,
            this.stageService.width,
            this.stageService.height
        );

        this.textInstance = this.contaner.addChild(new PIXI.Text(this.textAnimation[0], {
            fontSize: "20px",
            fill: 0xFFFFFF,
            fontWeight: "bold"
        }));
        this.textInstance.anchor.set(0.5, 0.5);
        this.textInstance.position.set(this.stageService.width / 2, this.stageService.height / 2);

        this.stageService.stage.addChild(this.contaner);
        this.stageService.addTicker(this.loadAnimation, this);
    }

    private loadAnimation(): void {
        if (this.loadingIndex < this.loadingCounter) {
            this.loadingIndex++;
            return;
        }

        this.loadingIndex = 0;

        if (this.textIndex < this.textAnimation.length - 1) {
            this.textIndex++;
        } else {
            this.textIndex = 0;
        }

        this.textInstance.text = this.textAnimation[this.textIndex];
    }

    onDestroy(): void {
        this.stageService.removeTicker(this.loadAnimation, this);
        this.stageService.stage.removeChild(this.contaner);
    }
}
