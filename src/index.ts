import { bind, init } from "./container";
import './style.css';

(async () => {
    bind();
    await init();
})();
