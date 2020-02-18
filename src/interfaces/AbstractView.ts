import {injectable} from "inversify";

@injectable()
export abstract class AbstractView {
    abstract onInit(): void;
    abstract onDestroy(): void;
}
