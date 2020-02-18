import {AbstractView} from "../../interfaces";
import {inject, injectable} from "inversify";
import {Services} from "../../types";
import {StageService} from "../../services";

@injectable()
export class BackgroundView extends AbstractView {
	private bgImage: PIXI.Sprite;

	constructor(
		@inject(Services.Stage) private stageService: StageService
	){
		super();
	}

	onInit(): void {
		const texture = PIXI.Texture.from('images/BG.png');
		this.bgImage = this.stageService.bgContainer.addChild(new PIXI.Sprite(texture));
	}

	onDestroy(): void {
		if (this.bgImage && this.bgImage.parent) {
			this.stageService.bgContainer.removeChild(this.bgImage);
		}
	}
}
