import {inject, injectable} from "inversify";
import {ControllerTypes, ViewsTypes} from "../types";
import {LoaderController} from "../components/loader";
import {delayAsync} from "../utils/timer";
import {BackgroundView} from "../components/background/BackgroundView";

@injectable()
export class StatesService {
    constructor(
        @inject(ControllerTypes.Loader) private loaderController: LoaderController,
        @inject(ViewsTypes.Background) private bgView: BackgroundView
    ) {
    }

    async onInit(): Promise<void> {
        await this.loading();
        await this.idle();
    }

    async onDestroy(): Promise<void> {
        await this.loaderController.onDestroy();
        this.bgView.onDestroy();
    }

    private async loading(): Promise<void> {
        await this.loaderController.onInit();
        await delayAsync(5000);
        await this.loaderController.onDestroy();
    }

    private async idle(): Promise<void> {
        this.bgView.onInit();
    }

}
