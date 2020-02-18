import { AbstractController } from "../../interfaces";
import {injectable} from "inversify";

@injectable()
export class ControlController implements AbstractController {
    onInit(): void {
    }

    onChange(): void {
    }

    onDestroy(): void {
    }
}