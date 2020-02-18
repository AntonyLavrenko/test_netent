import { AbstractController } from "../../interfaces";
import {inject, injectable} from "inversify";
import {ViewsTypes} from "../../types";
import {LoaderView} from "./LoaderView";

import * as PIXI from "pixi.js";

@injectable()
export class LoaderController extends AbstractController {

    constructor(
        @inject(ViewsTypes.Loader) private loaderView: LoaderView
    ) {
        super();
    }

    private async loadManifest(): Promise<string[]> {
        const getList = (object: any): string[] => {
            const key = Object.keys(object);
            if (key.length === 0) return [];

            return object[key[0]].data;
        };

        return new Promise((resolve: (value: string[]) => void) => {
            PIXI.loader.add("images/manifest.json")
                .once('complete', (_, object:any) => resolve(getList(object)))
                .load();
        })
    }

    private async loadImages(list: string[]): Promise<void> {
        return new Promise((resolve: (value?: any) => void) => {

            for(const image of list) {
                PIXI.loader.add(`images/${image}`);
            }

            PIXI.loader.once('complete', () => resolve())
                .load();
        });
    }

    async onInit(): Promise<void> {
        this.loaderView.onInit();
        const list = await this.loadManifest();
        await this.loadImages(list);
    }

    onDestroy(): void {
        this.loaderView.onDestroy();
    }
}
