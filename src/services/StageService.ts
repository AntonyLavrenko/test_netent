import {injectable, decorate} from "inversify";
import * as EventEmitter from "eventemitter3";
import {ServiceInterface} from "../interfaces/AbstractService";

import * as PIXI from "pixi.js";

decorate(injectable(), EventEmitter);

@injectable()
export class StageService extends EventEmitter implements ServiceInterface {
	private canvasHtmlID = 'container';
	private canvasHtmlBlock: HTMLElement;

	private renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;

	stage: PIXI.Container;
	controlContainer: PIXI.Container;
	bgContainer: PIXI.Container;
	reelsContainer: PIXI.Container;

	width = 960;
	height = 536;

	constructor() {
		super();
	}

	onInit(): void {
		this.canvasHtmlBlock = document.getElementById(this.canvasHtmlID);

		this.renderer = PIXI.autoDetectRenderer(
			this.width,
			this.height,
			{transparent: true/*, powerPreference: "high-performance"*/}
		);

		this.canvasHtmlBlock.appendChild(this.renderer.view);

		this.stage = new PIXI.Container();
		this.bgContainer = this.stage.addChild(new PIXI.Container());
		this.reelsContainer = this.stage.addChild(new PIXI.Container());
		this.controlContainer = this.stage.addChild(new PIXI.Container());

		this.addTicker(this.render);
	}

	private render() {
		this.renderer.render(this.stage);
	}

	addTicker(fn: () => void, context: any = this): void {
		PIXI.ticker.shared.add(fn, context);
	}

	removeTicker(fn: () => void, context: any = this): void {
		PIXI.ticker.shared.remove(fn, context);
	}

	onDestroy(): void {
		this.removeTicker(this.render);
		PIXI.ticker.shared.destroy();
	}

}
