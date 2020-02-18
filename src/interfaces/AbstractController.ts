import {injectable} from "inversify";

// @ts-ignore
@injectable()
export abstract class AbstractController {
    abstract onInit(): void | Promise<void>;
    abstract onDestroy(): void | Promise<void>;
}
