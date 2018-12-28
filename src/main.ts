import { Overseer, WORKER_TYPES } from "./overseer";

export class DemoApp {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor() {
        const el = document.createElement('canvas');
        el.setAttribute('width', '800');
        el.setAttribute('height', '600');
        document.body.appendChild(el);

        this.canvas = el;
        this.context = <CanvasRenderingContext2D>el.getContext('2d');


        const ov = new Overseer();

        ov.spawnWorker(WORKER_TYPES.THREADED);
    }
}

new DemoApp();