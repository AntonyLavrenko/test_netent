import { Container } from 'inversify';
import "reflect-metadata";

import { ControllerTypes, ViewsTypes, Services } from "./types";
import { AbstractController, AbstractView } from "./interfaces";
import { ControlController, ControlView } from './components/control';
import { LoaderController, LoaderView } from "./components/loader";
import {BackgroundView} from "./components/background/BackgroundView";
import { StageService, StatesService } from "./services";

const container = new Container();

export const bind = () => {
    // components
    container.bind<AbstractController>(ControllerTypes.Loader).to(LoaderController).inSingletonScope();
    container.bind<AbstractView>(ViewsTypes.Loader).to(LoaderView).inSingletonScope();

    container.bind<AbstractController>(ControllerTypes.Control).to(ControlController).inSingletonScope();
    container.bind<AbstractView>(ViewsTypes.Control).to(ControlView).inSingletonScope();

    container.bind<AbstractView>(ViewsTypes.Background).to(BackgroundView).inSingletonScope();

    // services
    container.bind<StageService>(Services.Stage).to(StageService).inSingletonScope();

    container.bind<StatesService>(Services.States).to(StatesService).inSingletonScope();
};

export const unbind = () => {
    container.unbind(ControllerTypes.Loader);
    container.unbind(ViewsTypes.Loader);

    container.unbind(ControllerTypes.Control);
    container.unbind(ViewsTypes.Control);

    container.unbind(ViewsTypes.Background);

    container.unbind(Services.Stage);

    container.unbind(Services.States);
};

export const init = async () => {
    container.get<StageService>(Services.Stage).onInit();
    await container.get<StatesService>(Services.States).onInit();
};

export const destroy = async () => {
    await container.get<StatesService>(Services.States).onDestroy();
};

